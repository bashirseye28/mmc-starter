"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

interface PaymentMethodProps {
  onBack: () => void;
  onConfirm: (method: "stripe" | "whatsapp") => void;
  cartItems: { id: string; name: string; price: number; quantity: number }[];
  customerData: { name: string; email: string; phone: string };
  shippingData: {
    address: string;
    city: string;
    postcode: string;
    country: string;
    shippingCost: number;
    shippingType: string;
  };
  total?: number;
}

const PaymentMethod = ({
  onBack,
  onConfirm,
  cartItems,
  customerData,
  shippingData,
  total = 0,
}: PaymentMethodProps) => {
  const [selectedMethod, setSelectedMethod] = useState<"stripe" | "whatsapp" | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP ?? "+447541475547";

  const handleConfirmOrder = () => {
    if (!selectedMethod) return;

    if (selectedMethod === "whatsapp") {
      const orderLines = cartItems
        .map(
          (item) =>
            `• ${item.name} x${item.quantity} — £${(item.price * item.quantity).toFixed(2)}`
        )
        .join("\n");

      const message = `
🛍️ *New Order - Manchester Murid Community Shop*

📦 *Items:*
${orderLines}

🚚 *Delivery Method:* ${shippingData.shippingType}
📍 *Address:* ${shippingData.address}, ${shippingData.city}, ${shippingData.postcode}, ${shippingData.country}

👤 *Customer Info:*
• Name: ${customerData.name}
• Email: ${customerData.email}
• Phone: ${customerData.phone}

💰 *Total (incl. delivery):* £${total.toFixed(2)}

I would like to place this order. Please confirm availability.`;

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    } else {
      onConfirm(selectedMethod);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center sm:text-left">
        Secure Checkout
      </h3>

      {/* Payment Icons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Image src="/images/visa.png" alt="Visa" width={50} height={30} />
        <Image src="/images/mastercard.png" alt="Mastercard" width={50} height={30} />
        <Image src="/images/paypal.png" alt="PayPal" width={50} height={30} />
        <Image src="/images/apple.png" alt="Apple Pay" width={50} height={30} />
        <Image src="/images/google.png" alt="Google Pay" width={50} height={30} />
      </div>

      <p className="text-center text-gray-500 text-sm mb-6">
        Secure transactions powered by <strong>Stripe</strong>
      </p>

      {/* Payment Options */}
      <div className="flex flex-col gap-4">
        <button
          aria-label="Select Stripe Payment"
          className={`border-2 p-5 rounded-lg flex items-center justify-between transition ${
            selectedMethod === "stripe"
              ? "border-gold bg-gray-50 shadow-sm"
              : "border-gray-300 hover:border-gray-500"
          }`}
          onClick={() => setSelectedMethod("stripe")}
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCreditCard} className="text-primary text-2xl" />
            <span className="font-semibold">
              Pay Securely (Card, PayPal, Apple, Google)
            </span>
          </div>
          {selectedMethod === "stripe" && (
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
          )}
        </button>

        <button
          aria-label="Select WhatsApp Checkout"
          className={`border-2 p-5 rounded-lg flex items-center justify-between transition ${
            selectedMethod === "whatsapp"
              ? "border-gold bg-gray-50 shadow-sm"
              : "border-gray-300 hover:border-gray-500"
          }`}
          onClick={() => setSelectedMethod("whatsapp")}
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-2xl" />
            <span className="font-semibold">Checkout via WhatsApp</span>
          </div>
          {selectedMethod === "whatsapp" && (
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
          )}
        </button>
      </div>

      {/* Totals */}
      <div className="mt-6 border-t pt-4 text-lg font-semibold text-gray-800">
        <p className="flex justify-between">
          <span>Total (incl. delivery):</span>
          <span className="text-primary">£{total.toFixed(2)}</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8 gap-4">
        <button
          onClick={onBack}
          className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <button
          onClick={handleConfirmOrder}
          disabled={!selectedMethod}
          className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition ${
            selectedMethod
              ? "bg-gold text-black font-semibold hover:bg-yellow-500 shadow-sm"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Confirm Order <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;