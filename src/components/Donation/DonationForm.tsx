"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faBuildingColumns, faMoneyBillWave, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faPaypal, faApplePay, faGooglePay } from "@fortawesome/free-brands-svg-icons";

// ✅ Define Accepted Payment Methods
const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", icon: faCreditCard },
  { id: "bank", label: "Bank Transfer", icon: faBuildingColumns },
  { id: "paypal", label: "PayPal", icon: faPaypal },
  { id: "apple", label: "Apple Pay", icon: faApplePay },
  { id: "google", label: "Google Pay", icon: faGooglePay },
];

const DonationForm = ({ preselectedAmount, tierName }: { preselectedAmount: number; tierName: string }) => {
  const [amount, setAmount] = useState(preselectedAmount);
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6">
      {/* ✅ Heading */}
      <h2 className="text-2xl font-bold text-primary text-center">
        Support <span className="text-gold">{tierName}</span>
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Your generous donation of <span className="text-gold font-semibold">£{amount}</span> will help build Keur Serigne Touba.
      </p>

      {/* ✅ Donation Amount Input */}
      <div className="mt-4">
        <label className="block text-lg font-semibold text-gray-700">Donation Amount (£)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* ✅ Payment Method Selection */}
      <div className="mt-6">
        <label className="block text-lg font-semibold text-gray-700">Select Payment Method</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`p-3 border rounded-md flex items-center justify-center gap-2 ${
                paymentMethod === method.id ? "border-primary bg-lightBg" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <FontAwesomeIcon icon={method.icon} className="text-primary" />
              {method.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Donate Button */}
      <motion.button
        className="w-full mt-6 px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Donate Now
      </motion.button>

      {/* ✅ Success Message (Hidden Until Payment Processed) */}
      <div className="hidden mt-4 text-center text-green-600 font-semibold">
        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
        Donation Successful! Thank you for your support.
      </div>
    </div>
  );
};

export default DonationForm;