import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // ✅ Handle event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await resend.emails.send({
        from: "orders@yourdomain.com", // ✅ Use a verified sender
        to: session.customer_email!,
        subject: "Your Order Confirmation",
        html: `
          <h1>Thank you for your order!</h1>
          <p>Order ID: ${session.metadata?.["Order ID"] ?? "N/A"}</p>
          <p>Total Paid: £${session.metadata?.["Total Paid"] ?? "N/A"}</p>
        `,
      });

      console.log("✅ Confirmation email sent to:", session.customer_email);
    } catch (err) {
      console.error("❌ Failed to send email:", err);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}