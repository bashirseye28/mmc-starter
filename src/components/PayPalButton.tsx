"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (orderID: string) => void; // ✅ Add this line
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency = "GBP", onSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
      <div className="mt-6 flex flex-col items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full max-w-xs">
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              try {
                const order = await actions.order?.capture();
                console.log("Order captured:", order);
                if (order && order.id) {
                  onSuccess(order.id); // ✅ Pass the orderID to onSuccess
                }
              } catch (err) {
                console.error("PayPal error:", err);
                setError("Payment could not be processed.");
              }
            }}
            onError={(err) => {
              console.error("PayPal Checkout error:", err);
              setError("Something went wrong. Please try again.");
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;