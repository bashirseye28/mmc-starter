"use client";

import React from "react";
import { donationTiers } from "@/utils/donationTiers"; // ✅ Import

type Props = {
  filters: {
    reference: string;
    status: string;
    frequency: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    reference: string;
    status: string;
    frequency: string;
  }>>;
};

export default function DonationExportFilters({ filters, setFilters }: Props) {
  const uniqueReferences = Array.from(
    new Set(donationTiers.map((tier) => tier.reference))
  );

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Reference Filter */}
      <select
        value={filters.reference}
        onChange={(e) => setFilters((f) => ({ ...f, reference: e.target.value }))}
        className="border rounded px-3 py-1"
      >
        <option value="">All References</option>
        {uniqueReferences.map((ref) => (
          <option key={ref} value={ref}>
            {ref}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        className="border rounded px-3 py-1"
      >
        <option value="">All Statuses</option>
        <option value="paid">Paid</option>
        <option value="failed">Failed</option>
        <option value="pending">Pending</option>
        <option value="succeeded">Succeeded</option>
      </select>

      {/* Frequency Filter */}
      <select
        value={filters.frequency}
        onChange={(e) => setFilters((f) => ({ ...f, frequency: e.target.value }))}
        className="border rounded px-3 py-1"
      >
        <option value="">All Frequencies</option>
        <option value="one-time">One-Time</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
}