"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Frequency = "one-time" | "monthly" | "weekly";

const suggestedAmounts = [
  { amount: 10, description: "Help sponsor a Madrassah student’s learning materials." },
  { amount: 15, description: "Weekly Iftaar Contribution." },
  { amount: 25, description: "Adiyyah Tuuba – Sacred Offering." },
  { amount: 50, description: "Provide meals for those in need." },
  { amount: 100, description: "Support the KST Centre Project." },
  { amount: 250, description: "Large donor contributions towards major projects." },
];

const frequencies: { value: Frequency; label: string }[] = [
  { value: "one-time", label: "One-Time" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export type DonationIntentValues = {
  amount: number;
  frequency: Frequency;
  reference: string;
  isCustom: boolean;
};

interface Props {
  onContinue: (values: DonationIntentValues) => void;
}

const DonationIntent: React.FC<Props> = ({ onContinue }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [customReference, setCustomReference] = useState("");
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [error, setError] = useState("");

  const isCustom = selectedAmount === null && customAmount.trim() !== "";
  const parsedAmount = parseFloat(customAmount.trim());
  const amount = selectedAmount ?? (isNaN(parsedAmount) ? 0 : parsedAmount);

  const handleContinue = () => {
    if (!amount || amount < 1) {
      return setError("Please enter a valid donation amount.");
    }
    if (!frequency) {
      return setError("Please select a donation frequency.");
    }

    const reference = selectedAmount
      ? suggestedAmounts.find((s) => s.amount === selectedAmount)?.description || "General Donation"
      : customReference.trim();

    if (isCustom && reference.length < 3) {
      return setError("Please provide a reference for your donation.");
    }

    setError("");
    onContinue({ amount, frequency, reference, isCustom });
  };

  return (
    <section id="choose-amount" className="py-20 bg-lightBg text-center">
      <div className="container max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-heading mb-8">
          <span className="text-primary">Choose Your</span>{" "}
          <span className="text-gold">Donation</span>
        </h2>

        {/* Suggested Amounts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {suggestedAmounts.map((tier) => (
            <motion.button
              key={tier.amount}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedAmount(tier.amount);
                setCustomAmount("");
                setCustomReference("");
              }}
              className={`p-4 rounded-lg h-28 text-sm font-semibold transition border-2 ${
                selectedAmount === tier.amount
                  ? "bg-gold border-gold text-primary"
                  : "bg-white border-gray-200 hover:border-gold"
              }`}
            >
              {selectedAmount === tier.amount && (
                <FontAwesomeIcon icon={faCheck} className="mb-1" />
              )}
              <p className="text-lg font-bold text-primary">£{tier.amount}</p>
              <p className="text-xs">{tier.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <label className="block font-semibold text-primary mb-2">
            Or enter a custom amount
          </label>
          <div className="relative max-w-xs mx-auto">
            <span className="absolute left-3 top-3 font-bold text-primary">£</span>
            <input
              type="number"
              inputMode="decimal"
              className="pl-7 pr-4 py-2 w-full border rounded-md text-center"
              placeholder="e.g. 20"
              min={1}
              value={customAmount}
              onChange={(e) => {
                setSelectedAmount(null);
                setCustomAmount(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Custom Reference Input */}
        {isCustom && (
          <div className="mb-6 max-w-xs mx-auto">
            <label className="block text-sm font-semibold text-primary mb-2">
              What would you like your donation to support?{" "}
              <span className="text-gray-500">(This will appear on your receipt)</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="e.g. Zakat, KST Project"
              value={customReference}
              onChange={(e) => setCustomReference(e.target.value)}
            />
          </div>
        )}

        {/* Frequency Selection */}
        {amount > 0 && (!isCustom || customReference.trim().length >= 3) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Select Frequency</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFrequency(f.value)}
                  className={`px-6 py-2 rounded-md border-2 font-medium transition ${
                    frequency === f.value
                      ? "bg-gold border-gold text-primary"
                      : "bg-white border-gray-200 hover:border-gold"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

        {/* Continue Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          disabled={
            !amount ||
            !frequency ||
            (isCustom && customReference.trim().length < 3)
          }
          className={`mt-4 px-8 py-3 rounded-md font-semibold transition shadow-md ${
            amount &&
            frequency &&
            (!isCustom || customReference.trim().length >= 3)
              ? "bg-primary text-white hover:bg-darkPrimary"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          Continue
        </motion.button>
      </div>
    </section>
  );
};

export default DonationIntent;