"use client";

import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface Props {
  onAdd?: () => void; // ✅ Add this
}

const ManualDonationForm = ({ onAdd }: Props) => {
  const [form, setForm] = useState({
    donorName: "",
    customer_email: "",
    amount_total: "",
    currency: "GBP",
    status: "completed",
    source: "manual",
    reference: "",
    date: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    const {
      donorName,
      customer_email,
      amount_total,
      currency,
      reference,
      status,
      source,
      date,
    } = form;

    const parsedAmount = parseFloat(amount_total);
    if (!customer_email || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid email and donation amount.");
      return;
    }

    try {
      await addDoc(collection(db, "donations"), {
        donorName,
        customer_email,
        amount_total: Math.round(parsedAmount * 100),
        currency,
        reference,
        status,
        source,
        created: Timestamp.fromDate(new Date(date)),
      });

      toast.success("Manual donation added successfully.");
      if (onAdd) onAdd(); // ✅ Refresh parent
      setForm({
        donorName: "",
        customer_email: "",
        amount_total: "",
        currency: "GBP",
        status: "completed",
        source: "manual",
        reference: "",
        date: new Date(),
      });
    } catch (error) {
      console.error("Failed to save donation:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4 text-primary">Add Manual Donation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="donorName"
          placeholder="Name (optional)"
          value={form.donorName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="customer_email"
          placeholder="Email"
          value={form.customer_email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="amount_total"
          placeholder="Amount (£)"
          value={form.amount_total}
          onChange={handleChange}
          type="number"
          min="0"
          step="0.01"
          className="border p-2 rounded"
          required
        />
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
        </select>
        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="manual">Manual</option>
          <option value="bank">Bank</option>
          <option value="cash">Cash</option>
        </select>
        <input
          name="reference"
          placeholder="Reference / Purpose"
          value={form.reference}
          onChange={handleChange}
          className="border p-2 rounded col-span-1 sm:col-span-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-opacity-90"
      >
        Save Donation
      </button>
    </div>
  );
};

export default ManualDonationForm;