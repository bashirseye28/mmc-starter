"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faUser,
  faEnvelope,
  faMoneyBillWave,
  faCalendarAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface DonationSummaryProps {
  amount: number | string;
  frequency: string;
  paymentMethod: string; // ✅ Added payment method
}

const DonationSummary: React.FC<DonationSummaryProps> = ({ amount, frequency, paymentMethod }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const router = useRouter();

  const handleProceedToPayment = async () => {
    if (!isAnonymous && (!name.trim() || !email.trim())) {
      setError("Please provide your name and email.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isAnonymous ? "Anonymous Donor" : name.trim(),
          email: isAnonymous ? "anonymous@donation.com" : email.trim(),
          amount,
          frequency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl p-8 rounded-lg border text-center max-w-lg mx-auto">
      {/* ✅ Title Section */}
      <h2 className="text-3xl font-semibold text-primary">
        Confirm Your <span className="text-gold">Donation</span>
      </h2>
      <p className="text-md text-gray-600 mb-5">
        You are donating <strong className="text-primary">£{amount}</strong> as a{" "}
        <strong className="text-primary">{frequency}</strong> contribution via{" "}
        <strong className="text-primary">{paymentMethod}</strong>.
      </p>

      {/* ✅ Donation Details Box */}
      <div className="bg-gray-50 p-5 rounded-lg border shadow-sm">
        <p className="text-lg font-semibold text-primary flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faMoneyBillWave} className="text-gold" />
          Amount: <span className="text-primary font-bold">£{amount}</span>
        </p>
        <p className="text-lg font-semibold text-primary flex items-center justify-center gap-2 mt-2">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gold" />
          Frequency: <span className="text-darkText font-medium">{frequency}</span>
        </p>
        <p className="text-lg font-semibold text-primary flex items-center justify-center gap-2 mt-2">
          <FontAwesomeIcon icon={faCreditCard} className="text-gold" />
          Payment Method: <span className="text-darkText font-medium">{paymentMethod}</span>
        </p>
      </div>

      {/* ✅ Donor Name & Email (Hidden when Anonymous) */}
      {!isAnonymous && (
        <div className="mt-6 space-y-4">
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-gold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Enter your name"
              required
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Your Email (Required for receipt)"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Enter your email"
              required
            />
          </div>
        </div>
      )}

      {/* ✅ Anonymous Donation Checkbox */}
      <div className="flex items-center justify-start mt-4">
        <input
          type="checkbox"
          id="anonymous"
          className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
          checked={isAnonymous}
          onChange={() => {
            setIsAnonymous(!isAnonymous);
            if (!isAnonymous) {
              setName("");
              setEmail("");
            }
          }}
          aria-label="Donate anonymously"
        />
        <label htmlFor="anonymous" className="ml-2 text-gray-700 font-medium">
          Donate Anonymously
        </label>
      </div>

      {/* ✅ Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* ✅ Proceed to Payment Button */}
      <div className="mt-6 flex justify-center">
        <motion.button
          onClick={handleProceedToPayment}
          className={`px-8 py-3 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center ${
            isLoading ? "bg-gray-500" : "bg-primary hover:bg-darkPrimary"
          }`}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          aria-label="Proceed to payment"
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Processing...
            </>
          ) : (
            <>Proceed to Payment</>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default DonationSummary;