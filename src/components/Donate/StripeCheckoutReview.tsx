"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface StripeCheckoutReviewProps {
  amount: number;
  frequency: "one-time" | "monthly" | "weekly";
  reference: string;
  name: string;
  email: string;
  anonymous: boolean;
  isCustom: boolean;
  onReturn: () => void;
}

const StripeCheckoutReview: React.FC<StripeCheckoutReviewProps> = ({
  amount,
  frequency,
  reference,
  name,
  email,
  anonymous,
  isCustom,
  onReturn,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/daahira", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          frequency,
          reference,
          name,
          email,
          isCustom,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Failed to create Stripe session");
      }

      router.push(data.url);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white text-center px-6">
      <div className="max-w-xl mx-auto bg-lightBg rounded-2xl shadow-lg border p-8">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Confirm <span className="text-gold">Your Donation</span>
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          You are donating <strong className="text-primary">£{amount}</strong>{" "}
          <span className="text-darkText">({frequency})</span> toward{" "}
          <strong className="text-primary">{reference}</strong>.
        </p>

        <div className="text-left mb-6 space-y-2 text-sm sm:text-base">
          <p>
            <span className="font-semibold text-primary">Donor:</span>{" "}
            {anonymous ? "Anonymous Donor" : name}
          </p>
          <p>
            <span className="font-semibold text-primary">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold text-primary">Frequency:</span> {frequency}
          </p>
          <p>
            <span className="font-semibold text-primary">Reference:</span> {reference}
          </p>
        </div>

        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReturn}
            className="px-6 py-3 rounded-md border-2 border-primary text-primary font-medium hover:bg-lightBg transition"
          >
            ← Return
          </button>

          <motion.button
            onClick={handleCheckout}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            disabled={isLoading}
            className={`px-6 py-3 rounded-md font-semibold shadow-md text-white transition ${
              isLoading ? "bg-gray-400" : "bg-primary hover:bg-darkPrimary"
            }`}
          >
            {isLoading ? "Processing..." : `Donate £${amount} Now`}
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Payments are securely processed via Stripe.
        </p>
      </div>
    </section>
  );
};

export default StripeCheckoutReview;