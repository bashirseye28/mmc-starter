"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CustomerInfo from "@/components/Checkout/CustomerInfo";
import ShippingDetails from "@/components/Checkout/ShippingDetails";
import ReviewOrder from "@/components/Checkout/ReviewOrder";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import ProgressIndicator from "@/components/Checkout/ProgressIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const [step, setStep] = useState(1);

  // ✅ Store user & order details
  const [customerData, setCustomerData] = useState({ name: "", email: "", phone: "" });
  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    shippingCost: 3.99, // ✅ Default shipping cost
  });

  // ✅ Calculate subtotal & total
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingData.shippingCost;

  // ✅ Redirect to /shop if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/shop");
    }
  }, [cart, router]);

  // ✅ Handle Order Confirmation for Payment Methods
  const handleConfirmOrder = async (method: string) => {
    if (method === "whatsapp") {
      const whatsappNumber = "+447541475547"; // ✅ Replace with actual WhatsApp number

      // ✅ Format order details for WhatsApp
      const orderDetails = cart
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

💰 *Total Price*: £${total.toFixed(2)}

✅ Please confirm your order via WhatsApp!
      `);

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
      window.open(whatsappURL, "_blank");
    } else if (method === "stripe") {
      try {
        const res = await fetch("/api/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cart,
            shippingCost: shippingData.shippingCost, // ✅ Ensure shipping cost is included
            customerInfo: customerData,
          }),
        });

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url; // ✅ Redirect to Stripe Checkout
        } else {
          alert("Failed to initiate payment. Please try again.");
        }
      } catch (error) {
        console.error("❌ Stripe Payment Error:", error);
        alert("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* ✅ Checkout Title with Gold Icon */}
        <h1 className="text-2xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faShoppingBag} className="text-gold text-3xl" />
          Checkout
        </h1>

        {/* ✅ Progress Indicator */}
        <ProgressIndicator step={step} />

        {/* ✅ Step 1: Customer Information */}
        {step === 1 && (
          <CustomerInfo
            onNext={(data) => {
              setCustomerData(data);
              setStep(2);
            }}
          />
        )}

        {/* ✅ Step 2: Delivery Information */}
        {step === 2 && (
          <ShippingDetails
            onNext={(data) => {
              setShippingData(data);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
        )}

        {/* ✅ Step 3: Review Order */}
        {step === 3 && (
          <ReviewOrder
            customerData={customerData}
            shippingData={shippingData}
            cartItems={cart}
            subtotal={subtotal}
            total={total}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            updateCustomerData={(data) => setCustomerData(data)}
            updateShippingData={(data) => setShippingData(data)}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {/* ✅ Step 4: Payment Method */}
        {step === 4 && (
          <PaymentMethod
            onBack={() => setStep(3)}
            onConfirm={handleConfirmOrder}
            cartItems={cart}
            customerData={customerData}
            shippingData={shippingData}
            total={total} // ✅ Pass total including shipping
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;