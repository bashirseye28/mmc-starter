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
    <section id="choose-amount" className="py-16 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading">
          <span className="text-primary">Choose Your</span>{" "}
          <span className="text-gold">Donation Amount</span>
        </h2>
        <p className="text-lg text-darkText mt-3 max-w-xl mx-auto">
          Support our community with a one-time donation or a custom amount that suits you.
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {suggestedAmounts.map((tier) => (
            <motion.div
              key={tier.amount}
              className={`p-4 sm:p-5 rounded-lg shadow-lg transition-all cursor-pointer text-center border-2 h-28 flex flex-col justify-center ${
                localSelectedAmount === tier.amount
                  ? "border-gold bg-gold text-primary"
                  : "border-gray-200 bg-white hover:border-gold hover:bg-lightGold hover:text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectAmount(tier.amount)}
            >
              {localSelectedAmount === tier.amount && (
                <FontAwesomeIcon icon={faCheck} className="text-lg text-primary mb-1" />
              )}
              <p className="text-lg font-semibold text-primary">£{tier.amount}</p>
              <p className="text-xs text-darkText mt-1">{tier.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mt-8">
          <label className="text-lg font-semibold text-darkText block mb-3">
            Enter a Custom Amount:
          </label>
          <div className="relative max-w-xs mx-auto">
            <span className="absolute left-4 top-3 text-primary font-semibold">£</span>
            <input
              type="number"
              placeholder="Enter Amount"
              className="pl-8 pr-4 py-3 w-full border border-gray-300 rounded-lg text-center text-primary focus:outline-none focus:ring-2 focus:ring-gold"
              value={localCustomAmount}
              onChange={handleCustomAmountChange}
              min="1"
            />
          </div>
        </div>

        {/* Reference input (only when custom amount selected) */}
        {!localSelectedAmount && (
          <div className="mt-6 max-w-xs mx-auto">
            <label className="block text-sm font-semibold text-darkText mb-2">
              What would you like this donation to go toward?{" "}
              <span className="text-gray-500 font-normal">(Required – used as reference)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Zakat, KST Project, In memory of..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-gold focus:border-gold"
              value={localCustomReference}
              onChange={(e) => setLocalCustomReference(e.target.value)}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <motion.button
            className={`px-8 py-3 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center gap-2 ${
              isValidAmount ? "bg-primary hover:bg-darkPrimary" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValidAmount}
            onClick={handleProceed}
            whileHover={{ scale: isValidAmount ? 1.05 : 1 }}
            whileTap={{ scale: isValidAmount ? 0.95 : 1 }}
          >
            {isValidAmount && <FontAwesomeIcon icon={faCheck} className="text-white" />}
            Continue to Payment
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CustomAmount;