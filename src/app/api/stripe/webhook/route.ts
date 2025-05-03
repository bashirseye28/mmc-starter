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
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const metadata = paymentIntent?.metadata ?? {};

    try {
      await resend.emails.send({
        from: "info@manchestermuridcommunity.org",
        to: session.customer_email!,
        subject: "Your Order Confirmation",
        html: `
          <h1>Thank you for your order!</h1>
          <p>Order ID: ${metadata["Order ID"] ?? "N/A"}</p>
          <p>Total Paid: £${metadata["Total Paid"] ?? "N/A"}</p>
        `,
      });
      console.log("✅ Confirmation email sent to:", session.customer_email);
    } catch (err) {
      console.error("❌ Failed to send email via Resend:", err);
    }
  }

  return NextResponse.json({ received: true });
}