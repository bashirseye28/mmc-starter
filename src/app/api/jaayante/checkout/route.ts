import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const priceIds: Record<string, string> = {
  Sindiidi: "price_1R1ALk2M54cogX5dRpLwsrSl",
  Wakaana: "price_1R1ANE2M54cogX5dh5OVBIJu",
  Jaalibatu: "price_1R1AO82M54cogX5dGKIbvsPV",
  Mawaahibu: "price_1R1AP92M54cogX5dKKEjJOxW",
  Midaadi: "price_1R1APi2M54cogX5djRcZ8BXj",
  Fathul_Fattah: "price_1R1AQQ2M54cogX5deCkcEJxm",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, priceId, donorName, email, isAnonymous } = body;

    // ✅ Validate required input
    if (!tier || !priceId || !priceIds[tier]) {
      return NextResponse.json({ error: "Invalid tier or priceId" }, { status: 400 });
    }

    const amount = parseInt(body.amount || "0", 10);
    const name = isAnonymous ? "Anonymous" : donorName?.trim();
    const donorEmail = isAnonymous ? "donor@anonymous.com" : email?.trim();

    if (!name || !donorEmail) {
      return NextResponse.json({ error: "Missing donor info" }, { status: 400 });
    }

    const receiptId = `KST-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://manchestermuridcommunity.org";

    const metadata = {
      receipt_id: receiptId,
      donor_name: name,
      donor_email: donorEmail,
      donation_amount: amount.toString(),
      donation_reference: tier,
      donation_tier: tier,
      donation_frequency: "One-time",
      donation_date: new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }),
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: donorEmail,
      metadata,
      payment_intent_data: { metadata },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success/jaayante?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `${baseUrl}/donate/jaayante?canceled=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,

    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Jaayante Checkout Error:", err.message || err);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}