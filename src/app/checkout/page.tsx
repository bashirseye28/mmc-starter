"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CustomerInfo from "@/components/Checkout/CustomerInfo";
import ShippingDetails from "@/components/Checkout/ShippingDetails";
import ReviewOrder from "@/components/Checkout/ReviewOrder";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import ProgressIndicator from "@/components/Checkout/ProgressIndicator";
import { db } from "@/app/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    shippingCost: 3.99,
    shippingType: "Standard Delivery",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingData.shippingCost;

  useEffect(() => {
    if (cart.length === 0) router.push("/shop");
  }, [cart, router]);

  const handleConfirmOrder = async (method: "stripe" | "whatsapp") => {
    setLoading(true);
    setError("");

    try {
      if (!customerData.name || !customerData.email) {
        setError("Please complete customer info.");
        setLoading(false);
        return;
      }

      if (cart.length === 0) {
        setError("Your cart is empty.");
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

      await addDoc(collection(db, "orders"), orderData);

      if (method === "whatsapp") {
        const whatsappMsg = encodeURIComponent(
          `New Order: ${orderId}\nName: ${customerData.name}\nTotal: £${total.toFixed(2)}\n\nItems:\n${cart
            .map((item) => `• ${item.name} x${item.quantity}`)
            .join("\n")}`
        );
        const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP}?text=${whatsappMsg}`;
        clearCart();
        window.location.href = whatsappUrl;
        return;
      }

      if (method === "stripe") {
        const res = await fetch("/api/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cart,          // ✅ FIX: must send as cartItems
            customerInfo: customerData, // ✅ FIX: must send as customerInfo
            shippingData,
            orderId,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error(`Stripe checkout failed: ${data.error}`);

        clearCart();
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error("❌ Order Error:", err);
      setError(err.message || "There was a problem processing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faShoppingBag} className="text-gold text-3xl" />
          Checkout
        </h1>

        <ProgressIndicator step={step} />

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 border border-red-300 text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <CustomerInfo
            onNext={(data) => {
              setCustomerData(data);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <ShippingDetails
            onNext={(data) => {
              setShippingData(data);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
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
            onConfirm={handleConfirmOrder}
            onBack={() => setStep(3)}
            cartItems={cart}
            customerData={customerData}
            shippingData={shippingData}
            total={total}
          />
        )}

        {loading && (
          <div className="mt-4 text-center text-primary text-sm animate-pulse">
            Processing your order...
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;