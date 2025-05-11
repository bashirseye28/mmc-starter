import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function GET(req: NextRequest, context: { params: { session_id: string } }) {
  const { session_id } = context.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product", "payment_intent"],
    });

    const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {
      expand: ["data.price.product"],
    });

    const metadata =
      session.payment_intent && typeof session.payment_intent !== "string"
        ? session.payment_intent.metadata
        : {};

    return NextResponse.json({
      customer_email: session.customer_email,
      metadata,
      line_items: lineItems.data,
    });
  } catch (err: any) {
    console.error("❌ Failed to fetch session:", err.message);
    return NextResponse.json({ error: "Could not retrieve session." }, { status: 500 });
  }
}