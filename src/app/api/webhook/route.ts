import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

// ✅ Required for dynamic API route (disable static caching in Next.js)
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});
const resend = new Resend(process.env.RESEND_API_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig!, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    let metadata = session.metadata ?? {}; // fallback if empty

    // ✅ Retrieve metadata from PaymentIntent if payment
    if (session.payment_intent) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string
      );
      metadata = paymentIntent.metadata ?? {};
    }

    // ✅ Retrieve metadata from Subscription if subscription
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      metadata = subscription.metadata ?? {};
    }

    console.log("✅ Retrieved metadata:", metadata);

    // 🔍 Check if donation (has donation_amount)
    if (metadata.donation_amount) {
      const donorName = metadata.donor_name ?? "Anonymous";
      const donorEmail = metadata.donor_email ?? "Not Provided";
      const donationAmount = metadata.donation_amount ?? "N/A";
      const donationFrequency = metadata.donation_frequency ?? "N/A";

      try {
        await resend.emails.send({
          from: "donations@manchestermuridcommunity.org",
          to: session.customer_email!,
          subject: "Thank You for Your Donation!",
          html: `
            <h2>Thank You for Your Generous Donation!</h2>
            <p>Dear <strong>${donorName}</strong>,</p>
            <p>Your donation of <strong>£${donationAmount}</strong> (${donationFrequency}) has been received.</p>
            <p>We truly appreciate your support!</p>
          `,
        });
        console.log("✅ Donation email sent to:", session.customer_email);
      } catch (err) {
        console.error("❌ Failed to send donation email:", err);
      }
    }

    // ✅ Check if shop order (has Order ID metadata)
    else if (metadata["Order ID"]) {
      const orderId = metadata["Order ID"];
      const totalPaid = metadata["Total Paid"];

      try {
        await resend.emails.send({
          from: "orders@manchestermuridcommunity.org",
          to: session.customer_email!,
          subject: `Your Order Confirmation (${orderId})`,
          html: `
            <h1>Thank you for your order!</h1>
            <p>Order ID: ${orderId}</p>
            <p>Total Paid: £${totalPaid}</p>
          `,
        });
        console.log("✅ Shop order email sent to:", session.customer_email);
      } catch (err) {
        console.error("❌ Failed to send shop order email:", err);
      }
    }

    else {
      console.log("⚠️ checkout.session.completed but no known metadata keys found:", metadata);
    }
  }

  return NextResponse.json({ received: true });
}