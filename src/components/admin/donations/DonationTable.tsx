"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FaSearch, FaEye } from "react-icons/fa";
import { Donation } from "./types"; // shared type

interface Props {
  donations: Donation[];
  onSelect: (donation: Donation) => void;
}

export default function DonationTable({ donations, onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filtered = donations.filter((d) =>
    [d.customer_email, d.donorName, d.reference]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {/* 🔍 Search */}
      <div className="flex items-center gap-2 mb-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email, or reference"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md"
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
            {filtered.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{d.donorName || "Anonymous"}</td>
                <td className="p-3">{d.customer_email}</td>
                <td className="p-3">£{(d.amount_total / 100).toFixed(2)}</td>
                <td className="p-3">{d.currency.toUpperCase()}</td>
                <td className="p-3 capitalize">{d.status}</td>
                <td className="p-3">{d.reference || "—"}</td>
                <td className="p-3">
                  {d.created?.toDate ? format(d.created.toDate(), "dd MMM yyyy") : "-"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => onSelect(d)}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center p-6 text-gray-500 italic">No donations found.</div>
        )}
      </div>
    </div>
  );
}