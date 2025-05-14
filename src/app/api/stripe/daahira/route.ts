import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { priceMap } from "@/utils/stripePriceMap";
import { Frequency } from "@/components/Donate/DonationIntent";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

const generateDonationId = () => {
  return `DON-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      message,
      anonymous,
      amount,
      frequency,
      reference,
      isCustom,
    } = await req.json();

    if (!amount || !frequency || !reference || !email) {
      return NextResponse.json(
        { error: "Missing required donation fields." },
        { status: 400 }
      );
    }

    const donationId = generateDonationId();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const metadata = {
      donation_id: donationId,
      donor_name: anonymous ? "Anonymous" : name || "Anonymous",
      donor_email: email,
      amount: amount.toString(), // ✅ Include donation amount
      frequency,
      reference,
      message: message || "",
      donation_date: new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      }),
    };

    const isRecurring = frequency !== "one-time";
    const isKnownAmount = typeof amount === "number" && amount in priceMap;
    const isValidFrequency =
      frequency === "one-time" || frequency === "weekly" || frequency === "monthly";

    if (!isCustom && isKnownAmount && isValidFrequency) {
      const priceId = priceMap[amount as keyof typeof priceMap][
        frequency as Frequency
      ];

      if (!priceId) {
        return NextResponse.json(
          { error: "No Stripe price ID found for selected tier." },
          { status: 400 }
        );
      }

      const session = await stripe.checkout.sessions.create({
        mode: isRecurring ? "subscription" : "payment",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        subscription_data: isRecurring ? { metadata } : undefined,
        payment_intent_data: !isRecurring ? { metadata } : undefined,
        success_url: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate/cancel`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Fallback for custom amount
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: reference,
              description: message || undefined,
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata,
      },
      success_url: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ Stripe error:", err.message || err);
    return NextResponse.json(
      { error: "An error occurred while creating the checkout session." },
      { status: 500 }
    );
  }
}