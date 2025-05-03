// /src/app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});
const resend = new Resend(process.env.RESEND_API_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    let metadata = session.metadata || {};

    // ✅ fallback: fetch metadata from PaymentIntent or Subscription if missing
    if (!metadata.donation_amount) {
      if (session.payment_intent) {
        const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);
        metadata = pi.metadata;
      } else if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        metadata = subscription.metadata;
      }
    }

    const donorName = metadata.donor_name ?? "Anonymous Donor";
    const donorEmail = metadata.donor_email ?? session.customer_email ?? "Not Provided";
    const donationAmount = metadata.donation_amount ?? "0";
    const donationFrequency = metadata.donation_frequency ?? "one-time";

    try {
      await resend.emails.send({
        from: "donations@yourdomain.com", // ✅ your verified sender in Resend
        to: donorEmail,
        subject: "Thank You for Your Donation!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #2E7D32;">Thank You for Your Generous Donation!</h2>
            <p>Dear <strong>${donorName}</strong>,</p>
            <p>Your donation of <strong>£${donationAmount}</strong> (${donationFrequency}) is greatly appreciated.</p>
            <p>Your contribution helps support the mission of Manchester Murid Community.</p>
            <hr/>
            <p><strong>Donation Summary:</strong></p>
            <ul>
              <li><strong>Donor Name:</strong> ${donorName}</li>
              <li><strong>Email:</strong> ${donorEmail}</li>
              <li><strong>Amount:</strong> £${donationAmount}</li>
              <li><strong>Frequency:</strong> ${donationFrequency}</li>
            </ul>
            <p style="margin-top: 20px;">Warm regards,<br/>Manchester Murid Community</p>
          </div>
        `,
      });
      console.log("📧 Donation confirmation email sent to:", donorEmail);
    } catch (err: any) {
      console.error("❌ Failed to send email via Resend:", err.message || err);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}