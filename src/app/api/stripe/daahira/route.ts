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

    if (!amount || !frequency || !reference?.trim() || !email) {
      return NextResponse.json(
        { error: "Missing required donation fields." },
        { status: 400 }
      );
    }

    const donationId = generateDonationId();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const metadata = {
      receipt_id: donationId,
      donor_name: anonymous ? "Anonymous" : name || "Anonymous",
      donor_email: email,
      donation_amount: amount.toString(),
      donation_frequency: frequency,
      donation_reference: reference.trim(),
      donation_date: new Date().toISOString(),
      message: message || "",
    };

    const isRecurring = frequency !== "one-time";
    const isKnownAmount = typeof amount === "number" && amount in priceMap;
    const isValidFrequency =
      frequency === "one-time" || frequency === "weekly" || frequency === "monthly";

    // ✅ Suggested Tier Flow
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
        metadata, // ✅ Ensure top-level metadata
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        subscription_data: isRecurring ? { metadata } : undefined,
        payment_intent_data: !isRecurring ? { metadata } : undefined,
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate/canceled?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    }

    // ✅ Custom Donation Flow
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata, // ✅ Ensure top-level metadata
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: reference.trim(),
              description: message || undefined,
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate/canceled?canceled=true`,
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

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        "payment_intent",
        "subscription",
        "subscription.latest_invoice.payment_intent",
      ],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;
    const subscription = session.subscription as Stripe.Subscription | null;
    const invoiceIntent = (subscription?.latest_invoice as any)?.payment_intent as
      | Stripe.PaymentIntent
      | null;

    const metadata = {
      ...session.metadata,
      ...subscription?.metadata,
      ...invoiceIntent?.metadata,
      ...paymentIntent?.metadata,
    };

    const amount_total =
      session.amount_total ||
      paymentIntent?.amount ||
      invoiceIntent?.amount ||
      (subscription?.items.data[0]?.price.unit_amount ?? 0) *
        (subscription?.items.data[0]?.quantity ?? 1);

    return NextResponse.json({
      amount_total,
      receipt_id: metadata.receipt_id,
      donor_name: metadata.donor_name,
      donor_email: metadata.donor_email,
      donation_reference:
        metadata.donation_reference || metadata.reference || "(No reference provided)",
      donation_amount: metadata.donation_amount,
      donation_frequency: metadata.donation_frequency,
      donation_date: metadata.donation_date,
      payment_method_types: session.payment_method_types,
      message: metadata.message,
    });
  } catch (err: any) {
    console.error("❌ Failed to retrieve session:", err.message || err);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}