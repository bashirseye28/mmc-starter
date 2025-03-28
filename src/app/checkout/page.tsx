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
import { db } from "@/app/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// =========================
// ✅ Types
// =========================

interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

interface ShippingData {
  address: string;
  city: string;
  postcode: string;
  country: string;
  shippingCost: number;
  shippingType: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
  });

  const [shippingData, setShippingData] = useState<ShippingData>({
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    shippingCost: 3.99,
    shippingType: "Standard Delivery",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingData.shippingCost;

  // ✅ Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/shop");
    }
  }, [cart, router]);

  const handleConfirmOrder = async (method: string) => {
    setError("");
    setLoading(true);

    try {
      if (!customerData.name || !customerData.email || cart.length === 0) {
        setError("Please fill in your customer details and ensure your cart is not empty.");
        setLoading(false);
        return;
      }

      const orderId = `MMC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const orderData = {
        orderId,
        ...customerData,
        ...shippingData,
        total: parseFloat(total.toFixed(2)),
        status: "Pending",
        cartItems: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price.toFixed(2)),
        })),
        createdAt: serverTimestamp(),
      };

      // ✅ Save to Firestore
      await addDoc(collection(db, "orders"), orderData);
      console.log("✅ Order saved:", orderId);

      // ✅ Send WhatsApp message
      await fetch("/api/notify/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          name: customerData.name,
          total: total.toFixed(2),
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price.toFixed(2),
          })),
        }),
      });

      // ✅ Stripe Checkout
      if (method === "stripe") {
        const res = await fetch("/api/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cart,
            customerInfo: customerData,
            shippingData,
            orderId,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error("Failed to initiate Stripe checkout.");
        }

        sessionStorage.setItem("customerEmail", customerData.email);
        clearCart();
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error("❌ Order Error:", err);
      setError("There was a problem processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faShoppingBag} className="text-gold text-3xl" />
          Checkout
        </h1>

        <ProgressIndicator step={step} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 border border-red-300 text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <CustomerInfo onNext={(data) => { setCustomerData(data); setStep(2); }} />
        )}

        {step === 2 && (
          <ShippingDetails onNext={(data) => { setShippingData(data); setStep(3); }} onBack={() => setStep(1)} />
        )}

        {step === 3 && (
          <ReviewOrder
            customerData={customerData}
            shippingData={shippingData}
            cartItems={cart}
            subtotal={subtotal}
            total={total}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            updateCustomerData={setCustomerData}
            updateShippingData={setShippingData}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <PaymentMethod
            onBack={() => setStep(3)}
            onConfirm={handleConfirmOrder}
            cartItems={cart}
            customerData={customerData}
            shippingData={shippingData}
            total={total}
          />
        )}

        {/* Loader */}
        {loading && (
          <div className="mt-4 text-center text-sm text-primary animate-pulse">
            Processing your order...
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;