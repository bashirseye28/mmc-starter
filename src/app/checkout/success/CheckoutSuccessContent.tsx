"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, FileDown } from "lucide-react";

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

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/shop/session/${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch session");
        const data = await res.json();
        setSessionData(data);
      } catch (err) {
        console.error(err);
        setError("Could not load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
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

  const { metadata, customer_email } = sessionData || {};
  const orderId = metadata?.["Order ID"] ?? sessionId?.slice(-8) ?? "N/A";
  const total = metadata?.["Total Paid"] ?? "0.00";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
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
    <section className="min-h-screen bg-lightBg flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md text-center px-8 py-10">
        <CheckCircle className="mx-auto w-14 h-14 text-green-600 mb-4" />
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mb-6 font-body">
          We’ve received your payment and will process your order shortly.
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 text-left text-sm text-gray-800 font-body mb-6 space-y-2">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Email:</strong> {customer_email}</p>
          <p><strong>Total Paid:</strong> £{total}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/shop")}
            className="bg-primary hover:bg-[#005f5f] text-white font-medium px-6 py-2 rounded-md transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="bg-gold hover:bg-yellow-400 text-black font-medium px-6 py-2 rounded-md transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FileDown className="w-4 h-4" />
            {downloading ? "Preparing..." : "Download Receipt"}
          </button>
        </div>
      </div>
    </section>
  );
}