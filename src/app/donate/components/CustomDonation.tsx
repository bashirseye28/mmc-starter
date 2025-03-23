"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// Suggested donation amounts
const suggestedAmounts = [
  { amount: 10, description: "Help sponsor a Madrassah student’s learning materials." },
  { amount: 15, description: "Weekly Iftaar Contribution." },
  { amount: 25, description: "Adiyyah Tuuba – Sacred Offering." },
  { amount: 50, description: "Provide meals for those in need." },
  { amount: 100, description: "Support the KST Centre Project." },
  { amount: 250, description: "Large donor contributions towards major projects." },
];

interface CustomAmountProps {
  onProceed: (amount: number) => void; // ✅ Ensures it receives the correct amount
  onSelectAmount: (amount: number) => void; // ✅ Handles only numbers
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

  // ✅ Handle predefined donation amount selection
  const handleSelectAmount = (amount: number) => {
    setLocalSelectedAmount(amount);
    setLocalCustomAmount(""); // Reset custom input when selecting a suggested amount
    onSelectAmount(amount);
  };

  // ✅ Handle custom donation amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSelectedAmount(null); // Deselect predefined tiers when typing a custom amount
    setLocalCustomAmount(e.target.value);
    onCustomAmountChange(e.target.value);
  };

  // ✅ Handle clicking "Continue to Payment" (Proceeding to next step)
  const handleProceed = () => {
    const finalAmount = localSelectedAmount || parseFloat(localCustomAmount) || 0;
    if (finalAmount > 0) {
      onProceed(finalAmount); // 🔄 Sends the selected amount to the next step
    }
  };

  // ✅ Condition to enable/disable the button
  const isValidAmount = localSelectedAmount || (localCustomAmount && parseFloat(localCustomAmount) > 0);

  return (
    <section id="choose-amount" className="py-16 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* ✅ Title Section */}
        <h2 className="text-3xl sm:text-4xl font-bold font-heading">
          <span className="text-primary">Choose Your</span>{" "}
          <span className="text-gold">Donation Amount</span>
        </h2>
        <p className="text-lg text-darkText mt-3 max-w-xl mx-auto">
          Support our community with a one-time donation or a custom amount that suits you.
        </p>

        {/* ✅ Suggested Donation Amounts */}
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
              {/* ✅ Checkmark Icon for Selected Amount */}
              {localSelectedAmount === tier.amount && (
                <FontAwesomeIcon icon={faCheck} className="text-lg text-primary mb-1" />
              )}
              <p className="text-lg font-semibold text-primary">£{tier.amount}</p>
              <p className="text-xs text-darkText mt-1">{tier.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ✅ Custom Donation Amount */}
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

        {/* ✅ Proceed to Payment Button (Will Redirect to Next Step) */}
        <div className="mt-6 flex justify-center">
          <motion.button
            className={`px-8 py-3 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center gap-2 ${
              isValidAmount ? "bg-primary hover:bg-darkPrimary" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValidAmount} // Prevents proceeding if no valid amount is entered
            onClick={handleProceed}
            whileHover={{ scale: isValidAmount ? 1.05 : 1 }}
            whileTap={{ scale: isValidAmount ? 0.95 : 1 }}
          >
            {/* ✅ faCheck icon only when a valid amount is selected */}
            {isValidAmount && <FontAwesomeIcon icon={faCheck} className="text-white" />}
            Continue to Payment
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CustomAmount;