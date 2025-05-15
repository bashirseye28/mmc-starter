"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { Donation } from "./types";

interface Props {
  donations: Donation[];
  onSelect: (donation: Donation) => void;
  onDelete: (id: string) => Promise<void>;
}

const ITEMS_PER_PAGE = 20;

export default function DonationTable({ donations, onSelect, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = donations.filter((d) =>
    [d.customer_email, d.donorName, d.reference]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const formatAmount = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currency || "GBP",
        minimumFractionDigits: 2,
      }).format(amount / 100);
    } catch {
      return `£${(amount / 100).toFixed(2)}`;
    }
  };

  const statusStyle = (status: string | undefined) => {
    switch (status) {
      case "succeeded":
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {/* 🔍 Search */}
      <div className="flex items-center gap-2 mb-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email, or reference"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-full max-w-md"
          aria-label="Search donations"
        />
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Currency</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reference</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{d.donorName || "Anonymous"}</td>
                <td className="p-3">{d.customer_email || "—"}</td>
                <td className="p-3">
                  {typeof d.amount_total === "number"
                    ? formatAmount(d.amount_total, d.currency)
                    : "—"}
                </td>
                <td className="p-3">{d.currency?.toUpperCase() || "—"}</td>
                <td className="p-3 capitalize">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusStyle(d.status)}`}>
                    {d.status || "—"}
                  </span>
                </td>
                <td className="p-3">{d.reference?.trim() || "—"}</td>
                <td className="p-3">
                  {d.created?.toDate
                    ? format(d.created.toDate(), "dd MMM yyyy")
                    : "—"}
                </td>
                <td className="p-3 flex gap-3 items-center">
                  <button
                    onClick={() => onSelect(d)}
                    className="text-primary hover:underline flex items-center gap-1"
                    aria-label={`View details of donation from ${d.donorName || "Anonymous"}`}
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => onDelete(d.id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                    aria-label={`Delete donation from ${d.donorName || "Anonymous"}`}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center p-6 text-gray-500 italic">
            No donations found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > ITEMS_PER_PAGE && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <p>
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}