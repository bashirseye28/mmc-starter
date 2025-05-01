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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://manchestermuridcommunity.org";

    let session;

    if (jaayanteTier) {
      // ✅ Fixed tier pricing via Stripe price IDs
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
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate/jaayante/${jaayanteTier}?canceled=true`,
      });
    } else {
      // ✅ One-time donation with custom amount
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: frequency ? `Donation (${frequency})` : "Donation",
              },
              unit_amount: Math.round(Number(amount) * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate?canceled=true`,
      });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("❌ Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error?.message || "Stripe session creation failed" },
      { status: 500 }
    );
  }
}