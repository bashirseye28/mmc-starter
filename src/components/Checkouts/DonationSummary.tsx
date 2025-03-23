"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface DonationSummaryProps {
  amount: number | string;
  frequency: string;
  method: string;
}

const DonationSummary: React.FC<DonationSummaryProps> = ({ amount, frequency, method }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency, method }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Stripe checkout session
      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* ✅ Title Section */}
        <h2 className="text-3xl sm:text-4xl font-bold font-heading">
          <span className="text-primary">Review Your</span> <span className="text-gold">Donation</span>
        </h2>
        <p className="text-lg text-darkText mt-3">
          Please confirm your donation details before proceeding to payment.
        </p>

        {/* ✅ Summary Box */}
        <div className="mt-6 p-6 border border-gray-300 rounded-lg shadow-lg text-left max-w-md mx-auto">
          <p className="text-lg font-semibold text-primary">
            Donation Amount: <span className="text-green-600">£{amount}</span>
          </p>
          <p className="text-lg font-semibold text-primary mt-2">
            Frequency: <span className="text-darkText">{frequency}</span>
          </p>
          <p className="text-lg font-semibold text-primary mt-2">
            Payment Method: <span className="text-darkText capitalize">{method}</span>
          </p>
        </div>

        {/* ✅ Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* ✅ Proceed to Checkout Button */}
        <div className="mt-6 flex justify-center">
          <motion.button
            className={`px-8 py-3 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center gap-2 ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-primary hover:bg-darkPrimary"
            }`}
            disabled={loading}
            onClick={handleCheckout}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Processing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} className="text-white" />
                Proceed to Checkout
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DonationSummary;