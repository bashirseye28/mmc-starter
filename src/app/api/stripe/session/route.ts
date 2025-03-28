import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      frequency: session.metadata?.donation_frequency || "One-time",
      donor_name: session.metadata?.donor_name || "Anonymous",
      donor_email: session.metadata?.donor_email || "Not Provided",
      payment_method_types: session.payment_method_types?.[0] || "Card" ,
    });
  } catch (error) {
    console.error("❌ Stripe Session Fetch Error:", error);
    return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
  }
}