"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faUniversity, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPaypal, faGooglePay, faApplePay } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

// ✅ Payment Methods Data
const paymentMethods = [
  { label: "Credit Card", icon: faCreditCard },
  { label: "Bank Transfer", icon: faUniversity },
  { label: "PayPal", icon: faPaypal },
  { label: "Apple Pay", icon: faApplePay },
  { label: "Google Pay", icon: faGooglePay },
];

// ✅ Props Type Definition
interface PaymentMethodsProps {
  amount: number | string;
  selectedMethod: string | null;
  setSelectedMethod: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ amount, selectedMethod, setSelectedMethod }) => {
  return (
    <section className="py-16 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* ✅ Title Section */}
        <h2 className="text-3xl sm:text-4xl font-bold font-heading">
          <span className="text-primary">Select a</span>{" "}
          <span className="text-gold">Payment Method</span>
        </h2>
        <p className="text-lg text-darkText mt-3">
          You are donating <span className="font-bold">£{amount}</span>. Choose a payment method to proceed.
        </p>

        {/* ✅ Payment Options Grid */}
        <div className="flex flex-col items-center text-center mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.label}
                className={`p-4 rounded-lg shadow-md transition cursor-pointer border-2 text-center flex flex-col items-center justify-center w-full h-24 ${
                  selectedMethod === method.label
                    ? "border-gold bg-gold text-primary"
                    : "border-gray-200 bg-white hover:border-gold hover:bg-lightGold hover:text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMethod(method.label)}
              >
                <FontAwesomeIcon icon={method.icon} className="text-2xl mb-2" />
                <p className="text-md font-semibold">{method.label}</p>
              </motion.div>
            ))}
          </div>

          {/* ✅ Centered Proceed to Checkout Button */}
          <div className="w-full flex items-center flex justify-center mt-6">
            <motion.button
              className={`px-8 py-3 rounded-lg text-white font-semibold shadow-md transition flex items-center justify-center gap-2 ${
                selectedMethod ? "bg-primary hover:bg-darkPrimary" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedMethod}
              whileHover={{ scale: selectedMethod ? 1.05 : 1 }}
              whileTap={{ scale: selectedMethod ? 0.95 : 1 }}
            >
              <FontAwesomeIcon icon={faCheck} className="text-white" />
              Proceed to Checkout
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;