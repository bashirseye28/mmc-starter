"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

interface StripeButtonProps {
  amount: number;
  currency: string;
  method?: string; // ✅ Accepts method (optional)
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function StripeButton({ amount, currency, method }: StripeButtonProps) {
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, method }),
      });

      const session = await response.json();
      if (session.url) {
        stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        throw new Error("Invalid session response");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-4">
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        onClick={handleCheckout}
      >
        Pay with Stripe
      </button>
    </div>
  );
}