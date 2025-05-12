"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SuccessReceipt, { SuccessReceiptProps } from "@/components/Success/SuccessReceipt";

export default function KstSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<SuccessReceiptProps | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;

      try {
        const res = await fetch(`/api/stripe/jaayante?session_id=${sessionId}`);
        const data = await res.json();

        if (res.ok) {
          const amount = data.amount_total
            ? Number(data.amount_total) / 100
            : parseFloat(data.donation_amount || "0");

          const receiptData: SuccessReceiptProps = {
            receiptId: data.receipt_id || sessionId.slice(0, 10).toUpperCase(),
            donorName: data.donor_name || "Anonymous Donor",
            donorEmail: data.donor_email || "Not Provided",
            reference: data.donation_reference || "KST Jaayante Support",
            amount: parseFloat(amount.toFixed(2)),
            frequency: data.donation_frequency || "One-time",
            method: Array.isArray(data.payment_method_types)
              ? data.payment_method_types[0]?.toUpperCase() || "Unknown"
              : "Unknown",
            date: data.donation_date || new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            title: "Your KST Jaayante Contribution",
            returnHref: "/kst",
          };

          setReceipt(receiptData);
        } else {
          console.error("❌ Error fetching KST receipt:", data.error);
        }
      } catch (err) {
        console.error("❌ Failed to fetch KST receipt:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <p className="text-center py-20">Loading your KST contribution receipt...</p>;
  if (!receipt) return <p className="text-center py-20 text-red-500">Unable to load receipt.</p>;

  return <SuccessReceipt {...receipt} />;
}