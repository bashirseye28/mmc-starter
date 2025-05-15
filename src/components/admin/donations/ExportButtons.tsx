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
          ? (d.amount_total / 100).toFixed(2)
          : "0.00",
      Currency: d.currency?.toUpperCase() || "—",
      Status: d.status || "—",
      Reference: d.reference || "—",
      Date: d.created?.toDate
        ? format(d.created.toDate(), "dd MMM yyyy")
        : "—",
    }));

    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","), // Header row
      ...rows.map((row) =>
        headers.map((key) => `"${(row as any)[key]}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `donations_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
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