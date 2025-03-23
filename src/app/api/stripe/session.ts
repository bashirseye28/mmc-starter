import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      frequency: session.metadata?.donation_frequency || "One-time",
      payment_method_types: session.payment_method_types,
      donor_name: session.metadata?.donor_name || "Anonymous",
      donor_email: session.metadata?.donor_email || "Not Provided",
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
  }
}