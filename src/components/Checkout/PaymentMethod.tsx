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
  onConfirm: (method: string) => void;
  cartItems: { id: string; name: string; price: number; quantity: number }[];
  customerData: { name: string; email: string; phone: string };
  shippingData: { address: string; city: string; postcode: string; country: string; shippingCost: number };
  total?: number; // ✅ Ensure `total` is optional to prevent crashes
}

const PaymentMethod = ({
  onBack,
  onConfirm,
  cartItems,
  customerData,
  shippingData,
  total = 0, // ✅ Default value to prevent errors
}: PaymentMethodProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const whatsappNumber = "+447541475547"; // ✅ Replace with actual WhatsApp number

  const handleConfirmOrder = () => {
    if (!selectedMethod) return;

    if (selectedMethod === "whatsapp") {
      // ✅ Format order details for WhatsApp
      const orderDetails = cartItems
        .map(item => `${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}`)
        .join("\n");

      const formattedMessage = encodeURIComponent(`
📦 *Order Summary*:
${orderDetails}

📍 *Delivery Address*:
${shippingData.address}, ${shippingData.city}, ${shippingData.postcode}, ${shippingData.country}

👤 *Customer Info*:
Name: ${customerData.name}
Email: ${customerData.email}
Phone: ${customerData.phone}

💰 *Total Price (Incl. Delivery)*: £${total.toFixed(2)}

✅ Please confirm your order via WhatsApp!
      `);

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
      window.open(whatsappURL, "_blank");
    } else {
      onConfirm(selectedMethod);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      {/* ✅ Secure Checkout Header */}
      <h3 className="text-2xl font-bold text-primary mb-6 text-center sm:text-left">
        Secure Checkout
      </h3>

      {/* ✅ Payment Method Icons (Always Colored) */}
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

      {/* ✅ Two Payment Options - More Professional UI */}
      <div className="flex flex-col gap-4">
        {/* Pay with Stripe */}
        <button
          className={`border-2 p-5 rounded-lg flex items-center justify-between transition ${
            selectedMethod === "stripe"
              ? "border-gold bg-gray-50 shadow-sm"
              : "border-gray-300 hover:border-gray-500"
          }`}
          onClick={() => setSelectedMethod("stripe")}
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCreditCard} className="text-primary text-2xl" />
            <span className="font-semibold">Pay Securely (Card, PayPal, Apple, Google)</span>
          </div>
          {selectedMethod === "stripe" && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
        </button>

        {/* WhatsApp Checkout */}
        <button
          className={`border-2 p-5 rounded-lg flex items-center justify-between transition ${
            selectedMethod === "whatsapp"
              ? "border-gold bg-gray-50 shadow-sm"
              : "border-gray-300 hover:border-gray-500"
          }`}
          onClick={() => setSelectedMethod("whatsapp")}
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-2xl" />
            <span className="font-semibold">WhatsApp Checkout</span>
          </div>
          {selectedMethod === "whatsapp" && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
        </button>
      </div>

      {/* ✅ Total Amount */}
      <div className="mt-6 border-t pt-4 text-lg font-semibold text-gray-800">
        <p className="flex justify-between">
          <span>Total (incl. delivery):</span>
          <span className="text-primary">£{(total || 0).toFixed(2)}</span> {/* ✅ Fixed */}
        </p>
      </div>

      {/* ✅ Buttons */}
      <div className="flex justify-between mt-8 gap-4">
        {/* Back Button */}
        <button onClick={onBack} className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        {/* Confirm Order Button (Only Active When a Payment Method is Selected) */}
        <button
          onClick={handleConfirmOrder}
          className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition ${
            selectedMethod
              ? "bg-gold text-black font-semibold hover:bg-yellow-500 shadow-sm"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedMethod}
        >
          Confirm Order <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;