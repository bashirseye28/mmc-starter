import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, frequency, method } = body;

    if (!amount || !method) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400 }
      );
    }

    const paymentMethodMapping: Record<
      string,
      Stripe.Checkout.SessionCreateParams.PaymentMethodType[]
    > = {
      creditCard: ["card"],
      googlePay: ["card"],
      applePay: ["card"],
      paypal: ["paypal"],
    };

    const intervalMapping: Record<
      string,
      "day" | "week" | "month" | "year"
    > = {
      daily: "day",
      weekly: "week",
      monthly: "month",
      yearly: "year",
    };

    const recurringInterval = intervalMapping[frequency] ?? undefined;
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://manchestermuridcommunity.org";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodMapping[method] || ["card"],
      mode: frequency === "one-time" ? "payment" : "subscription",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Donation (${frequency})`,
            },
            unit_amount: Number(amount) * 100,
            recurring: recurringInterval
              ? { interval: recurringInterval }
              : undefined,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("❌ Stripe error:", error);
    return new Response(
      JSON.stringify({
        error: error?.message || "Failed to create Stripe session",
      }),
      { status: 500 }
    );
  }
}