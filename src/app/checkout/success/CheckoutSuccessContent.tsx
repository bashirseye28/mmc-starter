"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Truck,
  MapPin,
  PackageSearch,
  FileDown,
} from "lucide-react";
// import Confetti from "react-confetti"; // ✅ Optional: enable confetti 🎉

export default function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session ID.");
      setLoading(false);
      return;
    }

    const fetchSessionData = async () => {
      try {
        const res = await fetch(`/api/shop/session/${sessionId}`);
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error || "Failed to retrieve order.");
        } else {
          const data = await res.json();
          setSessionData(data);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const handleDownloadReceipt = async () => {
    if (!sessionId) return;
    setDownloading(true);

    try {
      const res = await fetch(`/api/shop/receipt/${sessionId}`);
      if (!res.ok) throw new Error("Failed to fetch receipt.");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${sessionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download receipt.");
    } finally {
      setDownloading(false);
    }
  };

  const { metadata, customer_email, line_items = [] } = sessionData || {};
  const address = metadata?.["Shipping Address"] ?? "N/A";
  const method = metadata?.["Shipping Method"] ?? "Standard Delivery";
  const total = metadata?.["Total Paid"] ?? "0.00";
  const orderId = metadata?.["Order ID"] ?? sessionId?.slice(-8) ?? "N/A";
  const date = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your order...
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-lightBg flex justify-center items-center px-4 py-16">
      {/* <Confetti numberOfPieces={250} recycle={false} /> */}

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        {/* ✅ Above-the-Fold */}
        <div className="text-center mb-10">
          <CheckCircle className="mx-auto h-16 w-16 text-primary" />
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-4">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mt-2 font-body">
            A confirmation email has been sent to:
          </p>
          <p className="text-darkText font-medium font-body">
            {customer_email}
          </p>
          <div className="text-sm text-gray-500 mt-1 space-y-1">
            <p>Order ID: <span className="font-mono">{orderId}</span></p>
            <p>Date: {date}</p>
          </div>
        </div>

        <hr className="border-gray-200 mb-10" />

        {/* ✅ Middle Section – Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-700 font-body mb-12">
          {/* Delivery Info */}
          <div>
            <h2 className="text-base font-semibold text-primary flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5" /> Delivery Summary
            </h2>
            <p className="flex items-start gap-2 mb-3">
              <Truck className="w-4 h-4 mt-1 text-gray-500" />
              <span><strong>Method:</strong> {method}</span>
            </p>
            <p className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 mt-1 text-gray-500" />
              <span>
                <strong>Address:</strong>
                <br />
                <span className="whitespace-pre-line">{address}</span>
              </span>
            </p>
            <p className="flex items-center gap-2">
              💰 <strong>Total Paid:</strong> £{total}
            </p>
          </div>

          {/* Product List */}
          <div>
            <h2 className="text-base font-semibold text-primary flex items-center gap-2 mb-3">
              <PackageSearch className="w-5 h-5" /> Items Purchased
            </h2>

            {line_items.length > 0 ? (
              <ul className="space-y-2">
                {line_items.map((item: any, index: number) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.description}</span>
                    <span className="text-sm text-gray-500">
                      {item.quantity} × £{(item.price.unit_amount / 100).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Details available in your receipt.</p>
            )}
          </div>
        </div>

        {/* ✅ Bottom Section – Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/shop")}
            className="w-full sm:w-auto bg-gold hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg shadow transition"
            aria-label="Continue shopping"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="w-full sm:w-auto bg-primary hover:bg-[#005f5f] text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
            aria-label="Download order receipt"
          >
            <FileDown className="w-4 h-4" />
            {downloading ? "Preparing..." : "Download Receipt"}
          </button>
        </div>

        {/* Contact Support */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Need help?{" "}
          <a
            href="mailto:contact@manchestermuridcommunity.org"
            className="underline hover:text-primary"
          >
            contact@manchestermuridcommunity.org
          </a>
        </p>
      </div>
    </section>
  );
}