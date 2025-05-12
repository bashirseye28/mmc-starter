"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const suggestedAmounts = [
  { amount: 10, description: "Help sponsor a Madrassah student’s learning materials." },
  { amount: 15, description: "Weekly Iftaar Contribution." },
  { amount: 25, description: "Adiyyah Tuuba – Sacred Offering." },
  { amount: 50, description: "Provide meals for those in need." },
  { amount: 100, description: "Support the KST Centre Project." },
  { amount: 250, description: "Large donor contributions towards major projects." },
];

interface CustomAmountProps {
  onProceed: (amount: number, reference: string) => void;
  onSelectAmount: (amount: number) => void;
  onCustomAmountChange: (amount: string) => void;
  selectedAmount: number | null;
  customAmount: string;
}

const CustomAmount: React.FC<CustomAmountProps> = ({
  onProceed,
  onSelectAmount,
  onCustomAmountChange,
  selectedAmount,
  customAmount,
}) => {
  const [localSelectedAmount, setLocalSelectedAmount] = useState<number | null>(null);
  const [localCustomAmount, setLocalCustomAmount] = useState<string>("");
  const [localCustomReference, setLocalCustomReference] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSelectAmount = (amount: number) => {
    setLocalSelectedAmount(amount);
    setLocalCustomAmount("");
    setLocalCustomReference("");
    setError(null);
    onSelectAmount(amount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSelectedAmount(null);
    setLocalCustomAmount(e.target.value);
    onCustomAmountChange(e.target.value);
  };

  const handleProceed = () => {
    const finalAmount = localSelectedAmount || parseFloat(localCustomAmount) || 0;

    let reference = "";
    if (localSelectedAmount) {
      const match = suggestedAmounts.find((tier) => tier.amount === localSelectedAmount);
      reference = match?.description || "General Donation";
    } else {
      reference = localCustomReference.trim();
      if (!reference || reference.length < 3) {
        setError("Please provide a valid donation reference.");
        return;
      }
    }

    setError(null);
    if (finalAmount > 0) {
      onProceed(finalAmount, reference);
    }
  };

  const isValidAmount = localSelectedAmount || (localCustomAmount && parseFloat(localCustomAmount) > 0);

  return (
    <section className="py-16 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading">
          <span className="text-primary">Choose Your</span>{" "}
          <span className="text-gold">Donation Amount</span>
        </h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {suggestedAmounts.map((tier) => (
            <motion.div
              key={tier.amount}
              className={`p-4 rounded-lg border-2 h-28 flex flex-col justify-center cursor-pointer ${
                localSelectedAmount === tier.amount
                  ? "border-gold bg-gold text-primary"
                  : "border-gray-200 bg-white hover:border-gold"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectAmount(tier.amount)}
            >
              {localSelectedAmount === tier.amount && <FontAwesomeIcon icon={faCheck} className="text-primary mb-1" />}
              <p className="text-lg font-semibold">£{tier.amount}</p>
              <p className="text-xs">{tier.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <label className="block text-lg font-semibold mb-2">Enter a Custom Amount:</label>
          <div className="relative max-w-xs mx-auto">
            <span className="absolute left-4 top-3 text-primary font-semibold">£</span>
            <input
              type="number"
              min="1"
              placeholder="Custom Amount"
              className="pl-8 pr-4 py-3 w-full border rounded-lg text-center"
              value={localCustomAmount}
              onChange={handleCustomAmountChange}
            />
          </div>
        </div>

        {!localSelectedAmount && (
          <div className="mt-6 max-w-xs mx-auto">
            <label className="block text-sm font-semibold mb-2">
              Donation Reference <span className="text-gray-500">(required)</span>
            </label>
            <input
              type="text"
              value={localCustomReference}
              placeholder="e.g. Zakat, KST Project, etc."
              className="w-full px-4 py-2 border rounded-md"
              onChange={(e) => setLocalCustomReference(e.target.value)}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
        )}

        <div className="mt-6">
          <motion.button
            disabled={!isValidAmount}
            onClick={handleProceed}
            className={`px-8 py-3 rounded-lg font-semibold shadow-md transition ${
              isValidAmount ? "bg-primary text-white hover:bg-darkPrimary" : "bg-gray-400 text-white"
            }`}
          >
            Continue to Payment
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CustomAmount;