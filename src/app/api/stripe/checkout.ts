import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, frequency, jaayanteTier } = await req.json();

    if (!amount && !jaayanteTier) {
      return NextResponse.json({ error: "Invalid donation details" }, { status: 400 });
    }

    let session;

    if (jaayanteTier) {
      // ✅ Jaayante Tier Donation (Fixed Price ID from Stripe)
      const jaayantePriceMap: Record<string, string | undefined> = {
        sindiidi: process.env.PRICE_SINDIIDI,
        wakaana: process.env.PRICE_WAKAANA,
        jaalibatu: process.env.PRICE_JAALIBATU,
        mawaahibu: process.env.PRICE_MAWAAHIBU,
        midaadi: process.env.PRICE_MIDAADI,
        fathul_fattah: process.env.PRICE_FATHUL_FATTAH,
      };

      const priceId = jaayantePriceMap[jaayanteTier.toLowerCase()];
      if (!priceId) {
        return NextResponse.json({ error: "Invalid Jaayante tier selected" }, { status: 400 });
      }

      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/jaayante/${jaayanteTier}?canceled=true`,
      });
    } else {
      // ✅ Handle One-Time or Recurring Donations
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: { name: "One-Time Donation" },
              unit_amount: Number(amount) * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate?canceled=true`,
      });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Stripe session creation failed" }, { status: 500 });
  }
}