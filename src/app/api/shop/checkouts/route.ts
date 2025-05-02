import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// ✅ Use valid API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // 🔥 fixed version
});

export async function POST(req: NextRequest) {
  try {
    const { cart } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    console.log("✅ Received cart:", cart);

    const successUrl = `${process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=true`;

    console.log("✅ Success URL:", successUrl);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // 🔥 ensure integer
        },
        quantity: item.quantity,
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        // optional: add metadata if needed
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Stripe session creation failed" },
      { status: 500 }
    );
  }
}