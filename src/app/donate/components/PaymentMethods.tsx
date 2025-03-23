"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PaymentMethodsProps {
  amount: number | string;
  frequency: string;
  onSelectMethod: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ amount, frequency, onSelectMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentOptions = [
    { key: "card", label: "Credit / Debit Card" },
    { key: "paypal", label: "PayPal" },
    { key: "apple_pay", label: "Apple Pay" },
    { key: "google_pay", label: "Google Pay" },
  ];

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
    onSelectMethod(method);
  };

  return (
    <section className="text-center py-8 px-6 bg-white shadow-lg rounded-lg border max-w-lg mx-auto">
      {/* ✅ Title */}
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Select <span className="text-gold">Payment Method</span>
      </h2>
      <p className="text-md text-gray-600 mb-6">
        You are donating <strong className="text-primary">£{amount}</strong> as a{" "}
        <strong className="text-primary">{frequency}</strong> contribution.
      </p>

      {/* ✅ Payment Options */}
      <div className="grid grid-cols-2 gap-4">
        {paymentOptions.map((option) => (
          <motion.button
            key={option.key}
            className={`p-4 border rounded-lg shadow-md transition-all text-sm sm:text-lg font-semibold ${
              selectedMethod === option.key
                ? "bg-gold text-black border-gold"
                : "bg-white hover:bg-gray-200 border-gray-300"
            }`}
            onClick={() => handleSelect(option.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Select ${option.label} payment`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* ✅ Selected Method Confirmation */}
      {selectedMethod && (
        <p className="mt-4 text-lg text-gray-700 font-medium">
          Selected: <span className="text-primary font-semibold">{selectedMethod.replace("_", " ")}</span>
        </p>
      )}
    </section>
  );
};

export default PaymentMethods;