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

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [step, setStep] = useState<number>(1);

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

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/shop");
    }
  }, [cart, router]);

  const handleConfirmOrder = async (method: string) => {
    try {
      if (!customerData.name || !customerData.email || cart.length === 0) {
        alert("Missing customer details or empty cart.");
        return;
      }

      const orderId = Math.random().toString(36).substring(2, 10);

      const orderData = {
        orderId,
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: shippingData.address,
        city: shippingData.city,
        postcode: shippingData.postcode,
        country: shippingData.country,
        shippingType: shippingData.shippingType,
        shippingCost: shippingData.shippingCost,
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

      // ✅ Save Order to Firestore
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      console.log("✅ Order saved with ID:", orderRef.id);

      // ✅ Trigger WhatsApp Notification
      try {
        await fetch("/api/notify/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderId,
            name: customerData.name,
            total: total.toFixed(2),
            items: cart.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price.toFixed(2),
            })),
          }),
        });
        console.log("✅ WhatsApp alert sent.");
      } catch (whatsErr) {
        console.error("❌ WhatsApp alert failed:", whatsErr);
      }

      // ✅ Stripe payment redirect
      if (method === "stripe") {
        const res = await fetch("/api/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cart,
            shippingCost: shippingData.shippingCost,
            shippingType: shippingData.shippingType,
            customerInfo: customerData,
          }),
        });

        if (!res.ok) throw new Error("Stripe API failed. Please try again.");
        const data = await res.json();

        if (data.url) {
          sessionStorage.setItem("customerEmail", customerData.email);
          clearCart();
          window.location.href = data.url;
        } else {
          alert("Failed to initiate payment. Please try again.");
        }
      }
    } catch (error) {
      console.error("❌ Order Processing Error:", error);
      alert("Order processing failed.");
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

        {step === 1 && (
          <CustomerInfo
            onNext={(data: CustomerData) => {
              setCustomerData(data);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <ShippingDetails
            onNext={(data: ShippingData) => {
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
            updateCustomerData={(data: CustomerData) => setCustomerData(data)}
            updateShippingData={(data: ShippingData) => setShippingData(data)}
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
      </div>
    </div>
  );
};

export default CheckoutPage;