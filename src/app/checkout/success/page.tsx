"use client";

export const dynamic = "force-dynamic"; // ✅ force dynamic to skip pre-render

import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

const SuccessContent = () => {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session ID.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unknown error");
        setOrderData(data);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        setError("Could not load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading) {
    return <p className="animate-pulse text-primary">Loading your order...</p>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-green-500 text-5xl mb-4"
      />
      <h1 className="text-2xl font-bold text-primary mb-2">
        Thank you for your order!
      </h1>
      <p className="text-gray-700 mb-4">
        We’ve received your payment and will process your order shortly.
      </p>

      {orderData && (
        <div className="bg-gray-50 rounded-lg p-4 text-left text-sm mb-4">
          <p>
            <strong>Order ID:</strong>{" "}
            {orderData.metadata?.["Order ID"] ?? "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {orderData.customer_email ?? "N/A"}
          </p>
          <p>
            <strong>Total Paid:</strong> £
            {orderData.metadata?.["Total Paid"]
              ? parseFloat(orderData.metadata["Total Paid"]).toFixed(2)
              : "0.00"}
          </p>
        </div>
      )}

      <Link
        href="/shop"
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
      >
        Continue Shopping
      </Link>
    </>
  );
};

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <Suspense fallback={<p className="animate-pulse text-primary">Loading...</p>}>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
};

export default SuccessPage;