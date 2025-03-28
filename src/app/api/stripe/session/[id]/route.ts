import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.id);

    return NextResponse.json({
      metadata: session.metadata || {},
      customer_email: session.customer_email || "",
    });
  } catch (error: any) {
    console.error("❌ Failed to fetch Stripe session:", error.message);
    return NextResponse.json({ error: "Invalid session ID." }, { status: 400 });
  }
}