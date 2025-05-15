"use client";

import { FaFileCsv } from "react-icons/fa";
import { format } from "date-fns";
import { Donation } from "./types";

interface Props {
  data: Donation[];
}

export default function ExportButtons({ data }: Props) {
  const downloadCSV = () => {
    if (data.length === 0) return alert("No donation data to export.");

    const rows = data.map((d) => ({
      Name: d.donorName || "Anonymous",
      Email: d.customer_email,
      Amount: (d.amount_total / 100).toFixed(2),
      Currency: d.currency.toUpperCase(),
      Status: d.status,
      Reference: d.reference || "-",
      Date: format(d.created.toDate(), "dd MMM yyyy"),
    }));

    const header = Object.keys(rows[0]);
    const csv = [
      header.join(","), // header row
      ...rows.map((row) =>
        header.map((key) => `"${(row as any)[key]}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
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