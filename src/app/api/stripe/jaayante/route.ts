import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// ✅ Mapping of tiers to Stripe Price IDs
const priceIds: Record<string, string> = {
  Sindiidi: "price_1R1ALk2M54cogX5dRpLwsrSl",
  Wakaana: "price_1R1ANE2M54cogX5dh5OVBIJu",
  Jaalibatu: "price_1R1AO82M54cogX5dGKIbvsPV",
  Mawaahibu: "price_1R1AP92M54cogX5dKKEjJOxW",
  Midaadi: "price_1R1APi2M54cogX5djRcZ8BXj",
  Fathul_Fattah: "price_1R1AQQ2M54cogX5deCkcEJxm",
};

// ✅ Clean display format: Fathul_Fattah → Fathul Fattah
const formatTierName = (slug: string) => slug.replace(/_/g, " ");

/**
 * POST: Create Stripe session for KST Jaayante one-time donation
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, priceId, donorName, email, isAnonymous, amount } = body;

    // 🔐 Validation
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
      donation_date: new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      }),
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
      success_url: `${baseUrl}/donate/jaayante/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Jaayante Checkout Error:", err.message || err);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

/**
 * GET: Retrieve Stripe session metadata for KST Jaayante success page
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;
    const metadata = paymentIntent?.metadata || session.metadata || {};

    const amount_total =
      session.amount_total ||
      paymentIntent?.amount ||
      0;

    return NextResponse.json({
      amount_total,
      donor_name: metadata.donor_name,
      donor_email: metadata.donor_email,
      donation_reference: metadata.donation_reference || metadata.donation_tier || "KST Jaayante",
      donation_amount: metadata.donation_amount,
      donation_frequency: metadata.donation_frequency,
      donation_date: metadata.donation_date,
      payment_method_types: session.payment_method_types,
      receipt_id: metadata.receipt_id,
    });
  } catch (err: any) {
    console.error("❌ Failed to retrieve KST session:", err.message || err);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}