import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, frequency } = await req.json();

    if (!amount || !frequency || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const donorName = name?.trim() || "Anonymous Donor";
    const donorEmail = email?.trim() || "Not Provided";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://manchestermuridcommunity.org";

    const metadata = {
      donor_name: donorName,
      donor_email: donorEmail,
      donation_amount: amount.toString(),
      donation_frequency: frequency,
    };

    let session;

    if (frequency === "one-time") {
      // ✅ One-Time Donation
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        metadata,
        payment_intent_data: { metadata },
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: "One-Time Donation",
                description: `Donation from ${donorName}`,
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
      // ✅ Recurring Subscription
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
        customer_email: email,
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