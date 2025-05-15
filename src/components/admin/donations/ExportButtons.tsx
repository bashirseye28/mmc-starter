"use client";

import { FaFileCsv } from "react-icons/fa";
import { format } from "date-fns";
import { Donation } from "./types";

interface Props {
  data: Donation[];
}

export default function ExportButtons({ data }: Props) {
  const downloadCSV = () => {
    if (!data.length) {
      alert("No donation data to export.");
      return;
    }

    const rows = data.map((d) => ({
      Name: d.donorName || "Anonymous",
      Email: d.customer_email || "—",
      Amount:
        typeof d.amount_total === "number"
          ? formatCurrency(d.amount_total, d.currency)
          : "—",
      Currency: d.currency?.toUpperCase() || "—",
      Status: d.status || "—",
      Reference: d.reference?.replace(/"/g, '""') || "—",
      Frequency: d.frequency || "—",
      ReceiptID: d.receipt_id || "—",
      Message: d.message?.replace(/"/g, '""') || "—",
      Source: d.source || "—",
      Date: d.created?.toDate
        ? format(d.created.toDate(), "dd MMM yyyy")
        : "—",
    }));

    const headers = Object.keys(rows[0]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((key) =>
            `"${String(row[key as keyof typeof row] ?? "")
              .trim()
              .replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `donations_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount: number, currency = "GBP") => {
    try {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(amount / 100);
    } catch {
      return `£${(amount / 100).toFixed(2)}`;
    }
  };

  return (
    <button
      onClick={downloadCSV}
      className="bg-gold px-3 py-1 rounded text-black hover:bg-yellow-400 text-sm"
    >
      <FaFileCsv className="inline mr-1" />
      Download CSV
    </button>
  );
}