"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheckCircle,
  faCreditCard,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
}

interface Step4Props {
  prevStep: () => void;
  onConfirmOrder: () => Promise<void>;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  customerInfo: CustomerInfo;
  cartItems: CartItem[];
  shippingCost: number;
}

const Step4_PaymentMethod: React.FC<Step4Props> = ({
  prevStep,
  onConfirmOrder,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  customerInfo,
  cartItems,
  shippingCost,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Ensure cart items are correctly formatted
  const sanitizedCartItems = cartItems.map((item) => ({
    ...item,
    id: Number(item.id),
  }));

  // ✅ Calculate Order Total
  const totalPrice = sanitizedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const grandTotal = totalPrice + shippingCost;

  // ✅ Handle error messages
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  // ✅ Payment Handling
  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      showError("Please select a payment method before proceeding.");
      return;
    }

    selectedPaymentMethod === "whatsapp" ? handleWhatsAppCheckout() : handleStripeCheckout();
  };

  // ✅ Stripe Checkout Function
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: sanitizedCartItems,
          shippingCost,
          customerInfo,
          selectedPaymentMethod,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Stripe API Error: ${errorData.message || "Unknown error"}`);
      }

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        showError("Error processing payment. Please try again.");
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      showError("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ WhatsApp Checkout Function
  const handleWhatsAppCheckout = () => {
    if (!customerInfo.phone || !customerInfo.address || !customerInfo.city || !customerInfo.postcode) {
      showError("Please provide complete address and contact details before proceeding.");
      return;
    }

    try {
      const orderDetails = sanitizedCartItems
        .map((item) => `📦 ${item.name} x ${item.quantity} - £${(item.price * item.quantity).toFixed(2)}`)
        .join("\n");

      const formattedMessage = encodeURIComponent(`
Hello, I would like to place an order.

👤 Name: ${customerInfo.name || "N/A"}
📞 Phone: ${customerInfo.phone || "N/A"}
🏠 Address: ${customerInfo.address || "N/A"}, ${customerInfo.city || "N/A"}, ${customerInfo.postcode || "N/A"}

🛒 Order Details:
${orderDetails}

🚚 Shipping Cost: £${shippingCost.toFixed(2)}
💰 Total: £${grandTotal.toFixed(2)}

💳 Payment: WhatsApp Checkout
Please send me a payment link.

Thanks!
      `);

      const whatsappNumber = "+447541475547"; // ✅ Replace with actual WhatsApp number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
      window.open(whatsappURL, "_blank");
    } catch (error) {
      console.error("WhatsApp Checkout Error:", error);
      showError("Failed to initiate WhatsApp checkout. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-2xl font-bold text-primary mb-6 text-center sm:text-left">
        Secure Checkout
      </h3>

      {/* ✅ Payment Method Icons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Image src="/images/visa.png" alt="Visa" width={50} height={30} />
        <Image src="/images/mastercard.png" alt="Mastercard" width={50} height={30} />
        <Image src="/images/paypal.png" alt="PayPal" width={50} height={30} />
        <Image src="/images/apple.png" alt="Apple Pay" width={50} height={30} />
        <Image src="/images/google.png" alt="Google Pay" width={50} height={30} />
      </div>

      <p className="text-center text-gray-500 text-sm mb-4">
        Secure transactions powered by <strong>Stripe</strong>
      </p>

      {/* ✅ Display Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mr-2" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* ✅ Payment Selection */}
      <div className="space-y-4">
        <button onClick={() => setSelectedPaymentMethod("stripe")} className={`flex items-center justify-between w-full p-4 border rounded-lg ${selectedPaymentMethod === "stripe" ? "border-primary bg-blue-50 shadow-md" : "border-gray-300 bg-white"} hover:border-primary hover:bg-blue-100`}>
          <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-primary" />
          <p className="font-semibold">Pay Securely</p>
          {selectedPaymentMethod === "stripe" && <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-lg" />}
        </button>

        <button onClick={() => setSelectedPaymentMethod("whatsapp")} className={`flex items-center justify-between w-full p-4 border rounded-lg ${selectedPaymentMethod === "whatsapp" ? "border-green-500 bg-green-50 shadow-md" : "border-gray-300 bg-white"} hover:border-green-500 hover:bg-green-100`}>
          <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-green-500" />
          <p className="font-semibold">WhatsApp Checkout</p>
          {selectedPaymentMethod === "whatsapp" && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-lg" />}
        </button>
      </div>
    </div>
  );
};

export default Step4_PaymentMethod;