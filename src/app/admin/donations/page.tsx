"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import {
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { Donation } from "@/components/admin/donations/types";
import DonationTable from "@/components/admin/donations/DonationTable";
import DonationInsights from "@/components/admin/donations/DonationInsights";
import ManualDonationForm from "@/components/admin/donations/ManualDonationForm";
import ExportButtons from "@/components/admin/donations/ExportButtons";
import DonationDetailsModal from "@/components/admin/donations/DonationDetailsModal";
import DonationExportFilters from "@/components/admin/donations/DonationExportFilters"; // 👈 NEW

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Donation | null>(null);

  // 👇 Filter state
  const [filters, setFilters] = useState({
    reference: "",
    status: "",
    frequency: "",
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const q = query(collection(db, "donations"), orderBy("created", "desc"));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];
    setDonations(docs);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this donation?")) {
      try {
        await deleteDoc(doc(db, "donations", id));
        setDonations((prev) => prev.filter((d) => d.id !== id));
      } catch (err) {
        console.error("Failed to delete donation:", err);
        alert("Error deleting donation.");
      }
    }
  };

  // 👇 Apply filters to donations
  const filteredDonations = donations.filter((d) => {
    return (
      (!filters.reference || d.reference?.toLowerCase() === filters.reference.toLowerCase()) &&
      (!filters.status || d.status === filters.status) &&
      (!filters.frequency || d.frequency === filters.frequency)
    );
  });

  const totalRaised = filteredDonations.reduce(
    (sum, d) => sum + (d.amount_total || 0),
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center">
        <Link href="/admin/dashboard" className="hover:text-primary flex items-center">
          <FaChevronLeft className="mr-1" /> Dashboard
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        Donations
      </nav>

      <h1 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
        <FaChartBar /> Donations Dashboard
      </h1>

      {/* ✅ Filters + Export Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <DonationExportFilters filters={filters} setFilters={setFilters} />
        <ExportButtons data={filteredDonations} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Filtered Donations" value={filteredDonations.length} />
        <SummaryCard
          label="Amount Raised"
          value={`£${(totalRaised / 100).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
        />
        <SummaryCard label="Currency" value="GBP" />
      </div>

      <DonationInsights />
      <ManualDonationForm onAdd={fetchDonations} />

      {loading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : (
        <DonationTable
          donations={filteredDonations}
          onSelect={setSelected}
          onDelete={handleDelete}
        />
      )}

      {selected && (
        <DonationDetailsModal
          donation={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}