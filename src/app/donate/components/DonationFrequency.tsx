"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ✅ Donation Frequency Options
const frequencies = [
  { value: "one-time", label: "One-Time Donation" },
  { value: "weekly", label: "Weekly Donation" },
  { value: "monthly", label: "Monthly Donation" },
  { value: "yearly", label: "Yearly Donation" },
];

interface DonationFrequencyProps {
  onSelectFrequency: (value: string) => void;
}

const DonationFrequency: React.FC<DonationFrequencyProps> = ({ onSelectFrequency }) => {
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    setSelectedFrequency(value);
    onSelectFrequency(value);
  };

  return (
    <section className="py-12 text-center bg-lightBg">
      <div className="container mx-auto px-6 max-w-lg">
        {/* ✅ Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            Choose <span className="text-gold">Your Donation Frequency</span>
          </h2>
          <p className="text-lg text-darkText mt-3">
            Do you want to make a <strong>one-time</strong> donation or set up <strong>recurring</strong> contributions?
          </p>
        </motion.div>

        {/* ✅ Donation Frequency Options */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {frequencies.map((freq) => (
            <motion.div
              key={freq.value}
              className={`p-4 rounded-lg shadow-lg cursor-pointer text-center border-2 transition-all ${
                selectedFrequency === freq.value
                  ? "border-gold bg-gold text-primary scale-105 shadow-xl"
                  : "border-gray-200 bg-white hover:border-gold hover:bg-lightGold hover:text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelection(freq.value)}
            >
              <p className="text-lg font-semibold">{freq.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationFrequency;