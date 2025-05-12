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

// ✅ Optional: Convert "Fathul_Fattah" → "Fathul Fattah"
const formatTierName = (slug: string) => slug.replace(/_/g, " ");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, priceId, donorName, email, isAnonymous, amount } = body;

    // 🔒 Validate required fields
    if (!tier || !priceId || !priceIds[tier]) {
      return NextResponse.json({ error: "Invalid tier or priceId" }, { status: 400 });
    }

    const cleanAmount = parseInt(amount || "0", 10);
    const name = isAnonymous ? "Anonymous" : donorName?.trim();
    const donorEmail = isAnonymous ? "donor@anonymous.com" : email?.trim();

    if (!name || !donorEmail) {
      return NextResponse.json({ error: "Missing donor info" }, { status: 400 });
    }

    const receiptId = `KST-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://manchestermuridcommunity.org";
    const displayTier = formatTierName(tier);

    const metadata = {
      receipt_id: receiptId,
      donor_name: name,
      donor_email: donorEmail,
      donation_amount: cleanAmount.toString(),
      donation_reference: displayTier,
      donation_tier: displayTier,
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
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Jaayante Checkout Error:", err.message || err);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}