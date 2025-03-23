import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia", // ✅ Ensure you use the correct Stripe API version
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { amount, frequency, method } = req.body;

    if (!amount || !method) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // ✅ Mapping Stripe payment methods
    const paymentMethodMapping: Record<string, Stripe.Checkout.SessionCreateParams.PaymentMethodType[]> = {
      creditCard: ["card"],
      googlePay: ["card"],
      applePay: ["card"],
      paypal: ["paypal"],
    };

    // ✅ Convert frequency to Stripe-recognized intervals
    const intervalMapping: Record<string, "day" | "week" | "month" | "year"> = {
      daily: "day",
      weekly: "week",
      monthly: "month",
      yearly: "year",
    };

    const recurringInterval = intervalMapping[frequency] || undefined;

    // ✅ Creating a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodMapping[method] || ["card"], // ✅ Use only supported methods
      mode: frequency === "one-time" ? "payment" : "subscription",
      line_items: [
        {
          price_data: {
            currency: "gbp", // ✅ Ensure GBP is used
            product_data: {
              name: `Donation (${frequency})`,
            },
            unit_amount: Number(amount) * 100, // ✅ Convert to pence
            recurring: recurringInterval ? { interval: recurringInterval } : undefined,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message || "Failed to create Stripe session" });
  }
}