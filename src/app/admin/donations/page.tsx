"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { FaChartBar } from "react-icons/fa";

import { Donation } from "@/components/admin/donations/types";
import DonationTable from "@/components/admin/donations/DonationTable";
import DonationInsights from "@/components/admin/donations/DonationInsights";
import ManualDonationForm from "@/components/admin/donations/ManualDonationForm";
import ExportButtons from "@/components/admin/donations/ExportButtons";
import DonationDetailsModal from "@/components/admin/donations/DonationDetailsModal";

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Donation | null>(null);

  useEffect(() => {
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

    fetchDonations();
  }, []);

  const totalRaised = donations.reduce((sum, d) => sum + (d.amount_total || 0), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
        <FaChartBar /> Donations Dashboard
      </h1>

      {/* === SUMMARY === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Donations" value={donations.length} />
        <SummaryCard label="Amount Raised" value={`£${(totalRaised / 100).toFixed(2)}`} />
        <SummaryCard label="Currency" value="GBP" />
        <SummaryCard label="Export" value={<ExportButtons data={donations} />} />
      </div>

      {/* === CHARTS === */}
      <DonationInsights />

      {/* === MANUAL ENTRY FORM === */}
      <ManualDonationForm />

      {/* === TABLE === */}
      {loading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : (
        <DonationTable donations={donations} onSelect={setSelected} />
      )}

      {/* === MODAL === */}
      {selected && (
        <DonationDetailsModal donation={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}