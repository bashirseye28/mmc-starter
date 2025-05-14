"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { donationTiers } from "@/utils/donationTiers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export type Frequency = "one-time" | "weekly" | "monthly";

export type DonationIntentValues = {
  amount: number;
  frequency: Frequency;
  reference: string;
  isCustom: boolean;
};

interface Props {
  onContinue: (values: DonationIntentValues) => void;
}

const frequencies: { value: Frequency; label: string }[] = [
  { value: "one-time", label: "One-Time" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const DonationIntent: React.FC<Props> = ({ onContinue }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [customReference, setCustomReference] = useState("");
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [error, setError] = useState("");

  const isCustom = selectedAmount === null && customAmount.trim() !== "";
  const parsedAmount = parseFloat(customAmount.trim());
  const amount = selectedAmount ?? (isNaN(parsedAmount) ? 0 : parsedAmount);
  const allowRecurring = selectedAmount !== null;

  useEffect(() => {
    setError("");
  }, [selectedAmount, customAmount, customReference, frequency]);

  const sanitizeReference = (ref: string) =>
    ref.trim().replace(/[^a-zA-Z0-9 -]/g, "").substring(0, 64);

  const getReference = (): string => {
    if (isCustom) return sanitizeReference(customReference.trim());
    const tier = donationTiers.find((t) => t.amount === selectedAmount);
    return tier?.reference ?? "";
  };

  const handleContinue = () => {
    const reference = getReference();

    if (!amount || amount < 1) {
      setError("Please enter a valid donation amount.");
      return;
    }

    if (!frequency) {
      setError("Please select a donation frequency.");
      return;
    }

    if (isCustom && reference.length < 3) {
      setError("Please provide a reference (at least 3 characters).");
      return;
    }

    onContinue({
      amount,
      frequency,
      reference,
      isCustom,
    });
  };

  return (
    <section id="choose-amount" className="py-20 bg-lightBg text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          <span className="text-primary">Choose Your</span>{" "}
          <span className="text-gold">Donation</span>
        </h2>

        {/* Suggested Tiers */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12"
          role="radiogroup"
          aria-label="Donation tiers"
        >
          {donationTiers.map((tier, index) => (
            <motion.button
              key={tier.amount}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              type="button"
              onClick={() => {
                setSelectedAmount(tier.amount);
                setCustomAmount("");
                setCustomReference("");
                setFrequency(null);
              }}
              className={clsx(
                "bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition relative cursor-pointer border-2",
                selectedAmount === tier.amount
                  ? "border-gold bg-gold/10"
                  : "border-transparent hover:border-gold hover:shadow-md"
              )}
            >
              <p className="text-xl font-bold text-primary">£{tier.amount}</p>
              <p className="text-sm text-gold mb-3 capitalize">{tier.defaultFrequency}</p>
              <p className="text-sm text-gray-600">{tier.description}</p>

              {selectedAmount === tier.amount && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="absolute top-4 right-4 text-primary text-sm"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-6 max-w-xs mx-auto">
          <label htmlFor="customAmount" className="block font-semibold text-primary mb-2">
            Or enter a custom amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 font-bold text-primary">£</span>
            <input
              id="customAmount"
              type="number"
              step="0.01"
              min={1}
              inputMode="decimal"
              className="pl-7 pr-4 py-2 w-full border rounded-md text-center"
              placeholder="e.g. 20"
              value={customAmount}
              onChange={(e) => {
                setSelectedAmount(null);
                setCustomAmount(e.target.value);
                setFrequency(null);
              }}
            />
          </div>
        </div>

        {/* Custom Reference */}
        {isCustom && (
          <div className="mb-6 max-w-xs mx-auto">
            <label htmlFor="customReference" className="block text-sm font-semibold text-primary mb-2">
              What would you like your donation to support?
              <span className="text-gray-500 block text-xs">(e.g. Zakat, KST, Daahira)</span>
            </label>
            <input
              id="customReference"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Donation purpose"
              value={customReference}
              onChange={(e) => setCustomReference(e.target.value)}
            />
          </div>
        )}

        {/* Frequency Selection */}
        {amount > 0 && (!isCustom || getReference().length >= 3) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Select Frequency</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  onClick={() =>
                    allowRecurring || f.value === "one-time"
                      ? setFrequency(f.value)
                      : null
                  }
                  disabled={!allowRecurring && f.value !== "one-time"}
                  className={clsx(
                    "px-6 py-2 rounded-md border-2 font-medium transition",
                    frequency === f.value
                      ? "bg-gold border-gold text-primary"
                      : "bg-white border-gray-200 hover:border-gold",
                    !allowRecurring && f.value !== "one-time"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {!allowRecurring && (
              <p className="text-sm text-red-600 mt-2">
                Recurring donations are only available for suggested tiers.
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 font-medium mt-6" role="alert">
            {error}
          </p>
        )}

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!amount || !frequency || (isCustom && getReference().length < 3)}
          className={clsx(
            "mt-6 px-8 py-3 rounded-md font-semibold shadow-md transition",
            amount && frequency && (!isCustom || getReference().length >= 3)
              ? "bg-primary text-white hover:bg-darkPrimary"
              : "bg-gray-300 text-white cursor-not-allowed"
          )}
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default DonationIntent;