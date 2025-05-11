import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const sanitizeReference = (reference: string): string => {
  if (typeof reference === "string" && reference.trim().length >= 3) {
    return reference.trim();
  }
  return "General Donation";
};

// -------------------
// POST: Create Stripe Session
// -------------------
export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, frequency, reference } = await req.json();

    if (!amount || !frequency || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const donorName = name?.trim() || "Anonymous Donor";
    const donorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? email.trim()
      : "not_provided@mmc.org";

    const donationReference = sanitizeReference(reference);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://manchestermuridcommunity.org";
    const receiptId = `DON-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const metadata = {
      receipt_id: receiptId,
      donor_name: donorName,
      donor_email: donorEmail,
      donation_amount: amount.toString(),
      donation_frequency: frequency,
      donation_reference: donationReference,
      donation_date: new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      }),
    };

    let session;

    if (frequency === "one-time") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: donorEmail,
        mode: "payment",
        metadata,
        payment_intent_data: { metadata },
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: "One-Time Donation",
                description: `Ref: ${donationReference}`,
              },
              unit_amount: Math.round(Number(amount) * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate?canceled=true`,
      });
    } else {
      const priceMap: Record<string, Record<string, string>> = {
        "10": {
          weekly: process.env.PRICE_10_WEEKLY!,
          monthly: process.env.PRICE_10_MONTHLY!,
          yearly: process.env.PRICE_10_YEARLY!,
        },
        "15": {
          weekly: process.env.PRICE_15_WEEKLY!,
          monthly: process.env.PRICE_15_MONTHLY!,
          yearly: process.env.PRICE_15_YEARLY!,
        },
        "25": {
          weekly: process.env.PRICE_25_WEEKLY!,
          monthly: process.env.PRICE_25_MONTHLY!,
          yearly: process.env.PRICE_25_YEARLY!,
        },
        "50": {
          weekly: process.env.PRICE_50_WEEKLY!,
          monthly: process.env.PRICE_50_MONTHLY!,
          yearly: process.env.PRICE_50_YEARLY!,
        },
        "100": {
          weekly: process.env.PRICE_100_WEEKLY!,
          monthly: process.env.PRICE_100_MONTHLY!,
          yearly: process.env.PRICE_100_YEARLY!,
        },
        "250": {
          weekly: process.env.PRICE_250_WEEKLY!,
          monthly: process.env.PRICE_250_MONTHLY!,
          yearly: process.env.PRICE_250_YEARLY!,
        },
      };

      const priceId = priceMap[amount]?.[frequency];
      if (!priceId) {
        return NextResponse.json({ error: "Invalid donation frequency or amount" }, { status: 400 });
      }

      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: donorEmail,
        mode: "subscription",
        metadata,
        subscription_data: { metadata },
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate?canceled=true`,
      });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("❌ Stripe Checkout Error:", error.message || error);
    return NextResponse.json({ error: "Stripe session creation failed" }, { status: 500 });
  }
}

// -------------------
// GET: Retrieve Donation Receipt Data
// -------------------
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "subscription"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;
    const subscription = session.subscription as Stripe.Subscription | null;

    const metadata = {
      ...session.metadata,
      ...(paymentIntent?.metadata || {}),
      ...(subscription?.metadata || {}),
    };

    const amount_total =
      session.amount_total ||
      paymentIntent?.amount ||
      (subscription?.items.data[0]?.price.unit_amount ?? 0) *
        (subscription?.items.data[0]?.quantity ?? 1);

    return NextResponse.json({
      amount_total,
      donor_name: metadata.donor_name,
      donor_email: metadata.donor_email,
      donation_reference: sanitizeReference(metadata.donation_reference),
      donation_amount: metadata.donation_amount,
      donation_frequency: metadata.donation_frequency,
      donation_date: metadata.donation_date,
      payment_method_types: session.payment_method_types,
      receipt_id: metadata.receipt_id,
    });
  } catch (err: any) {
    console.error("❌ Failed to retrieve session:", err.message || err);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}