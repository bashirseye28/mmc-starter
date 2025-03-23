"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle, faCreditCard, faWhatsapp } from "@fortawesome/free-solid-svg-icons";

interface StepFourProps {
  totalAmount: number;
  onBack: () => void;
  onPayment: (method: "stripe" | "whatsapp") => void;
}

const StepFour: React.FC<StepFourProps> = ({ totalAmount, onBack, onPayment }) => {
  const [selectedPayment, setSelectedPayment] = useState<"stripe" | "whatsapp" | null>(null);
  const [error, setError] = useState("");

  // ✅ Handle Payment Selection
  const handlePayment = () => {
    if (!selectedPayment) {
      setError("Please select a payment method.");
      return;
    }
    setError("");
    onPayment(selectedPayment);
  };

  return (
    <div className="w-full">
      {/* ✅ Title */}
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Complete Your Payment</h2>

      {/* ✅ Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
        <div className="flex gap-4">
          {/* ✅ Stripe Payment */}
          <button
            className={`w-1/2 p-4 flex flex-col items-center border-2 rounded-lg transition-all ${
              selectedPayment === "stripe"
                ? "border-primary bg-primary text-white shadow-md"
                : "border-gray-300 text-gray-700 hover:border-primary"
            }`}
            onClick={() => setSelectedPayment("stripe")}
          >
            <FontAwesomeIcon icon={faCreditCard} className="text-2xl mb-2" />
            <p>Stripe</p>
          </button>

          {/* ✅ WhatsApp Checkout */}
          <button
            className={`w-1/2 p-4 flex flex-col items-center border-2 rounded-lg transition-all ${
              selectedPayment === "whatsapp"
                ? "border-green-500 bg-green-500 text-white shadow-md"
                : "border-gray-300 text-gray-700 hover:border-green-500"
            }`}
            onClick={() => setSelectedPayment("whatsapp")}
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-2xl mb-2" />
            <p>WhatsApp</p>
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* ✅ Order Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-lg font-semibold text-gray-800">Total Amount:</p>
        <p className="text-2xl font-bold text-primary">£{totalAmount.toFixed(2)}</p>
        <p className="text-sm text-gray-600 mt-1">Includes shipping & taxes</p>
      </div>

      {/* ✅ Payment Icons */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <Image src="/images/visa.png" alt="Visa" width={40} height={25} />
        <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={25} />
        <Image src="/images/paypal.png" alt="PayPal" width={40} height={25} />
        <Image src="/images/apple.png" alt="Apple Pay" width={40} height={25} />
        <Image src="/images/google.png" alt="Google Pay" width={40} height={25} />
      </div>

      {/* ✅ Secure Transaction Info */}
      <p className="text-center text-gray-500 text-sm mb-4">
        Secure transactions powered by <strong>Stripe</strong>
      </p>

      {/* ✅ Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
        {/* Back to Review Order */}
        <button
          onClick={onBack}
          className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Review Order
        </button>

        {/* Complete Order Button */}
        <button
          onClick={handlePayment}
          className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          Complete Order
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>
      </div>
    </div>
  );
};

export default StepFour;