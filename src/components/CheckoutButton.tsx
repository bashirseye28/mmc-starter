"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  amount: number;
  frequency: string;
  method: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount, frequency, method }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency, method }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        setError("Failed to initiate checkout. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-darkPrimary"
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </>
  );
};

export default CheckoutButton;