"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentRequestButtonElement, Elements } from "@stripe/react-stripe-js";

interface GoogleApplePayProps {
  amount: number;
  currency?: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const GoogleApplePayButton: React.FC<GoogleApplePayProps> = ({ amount, currency = "GBP" }) => {
  const [stripe, setStripe] = useState<any>(null);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initStripe = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);

      if (stripeInstance) {
        const pr = stripeInstance.paymentRequest({
          country: "GB",
          currency: currency.toLowerCase(),
          total: {
            label: "Your Donation",
            amount: amount * 100, // Convert to cents
          },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        // ✅ Set Supported Payment Methods
        pr.canMakePayment().then((result) => {
          if (result) {
            setPaymentRequest(pr);
          } else {
            setError("Google Pay & Apple Pay are not available on this device.");
          }
        });
      }
    };

    initStripe();
  }, [amount, currency]);

  const handlePayment = async () => {
    if (!stripe || !paymentRequest) return;

    try {
      // Create a payment intent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: stripe.elements(),
        clientSecret,
        confirmParams: {
          return_url: window.location.origin + "/success",
        },
      });

      if (error) {
        setError("Payment failed. Try again.");
      } else {
        alert("Payment Successful!");
      }
    } catch (err) {
      console.error("Payment Request Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      {error && <p className="text-red-500">{error}</p>}
      {paymentRequest ? (
        <Elements stripe={stripe}>
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: { paymentRequestButton: { type: "buy", theme: "dark" } },
            }}
          />
        </Elements>
      ) : (
        <button
          className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800"
          onClick={handlePayment}
        >
          Pay with Google Pay / Apple Pay
        </button>
      )}
    </div>
  );
};

export default GoogleApplePayButton;