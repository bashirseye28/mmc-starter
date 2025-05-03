import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const metadata = paymentIntent?.metadata ?? {};

    return NextResponse.json({
      customer_email: session.customer_email,
      metadata,
    });
  } catch (err: any) {
    console.error("❌ Failed to retrieve session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}