"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SuccessReceipt, { SuccessReceiptProps } from "@/components/Success/SuccessReceipt";

export default function DaahiraSuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<SuccessReceiptProps | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/stripe/daahira?session_id=${sessionId}`);
        if (!res.ok) {
          console.error("❌ Failed to fetch receipt:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();

        const amount = data.amount_total
          ? Number(data.amount_total) / 100
          : parseFloat(data.donation_amount || "0");

        const formatted: SuccessReceiptProps = {
          receiptId: data.receipt_id || `DON-${sessionId.slice(0, 8).toUpperCase()}`,
          donorName: data.donor_name?.trim() || "Anonymous Donor",
          donorEmail: data.donor_email?.trim() || "Not Provided",
          reference: data.donation_reference?.trim() || "(No reference provided)",
          amount: parseFloat(amount.toFixed(2)),
          frequency: data.donation_frequency || "One-Time",
          method: Array.isArray(data.payment_method_types)
            ? (data.payment_method_types[0]?.toUpperCase() || "CARD")
            : "CARD",
          date:
            data.donation_date ||
            new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
        };

        setReceipt(formatted);
      } catch (err) {
        console.error("❌ Unexpected error fetching receipt:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <p className="text-center py-20">Loading your donation details...</p>;
  if (!receipt) return <p className="text-center py-20 text-red-600">Unable to load your receipt.</p>;

  return <SuccessReceipt {...receipt} />;
}