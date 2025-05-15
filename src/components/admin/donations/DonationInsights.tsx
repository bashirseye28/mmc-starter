"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaChartLine, FaBullseye } from "react-icons/fa";
import { format } from "date-fns";
import { Donation } from "./types";

const GOAL_AMOUNT = 15000 * 100; // Target in pennies
const COLORS = ["#007676", "#f5c907", "#8884d8", "#82ca9d"];

export default function DonationInsights() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "donations"), orderBy("created", "asc"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Donation[];

      setDonations(list);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-8 text-center text-gray-500">
        Loading analytics...
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-8 text-center text-gray-400 italic">
        No donation data available yet for analytics.
      </div>
    );
  }

  const total = donations.reduce((sum, d) => sum + (d.amount_total || 0), 0);
  const byDate: { [month: string]: number } = {};
  const bySource: { [source: string]: number } = {};

  donations.forEach((d) => {
    const month = format(d.created.toDate(), "MMM yyyy");
    byDate[month] = (byDate[month] || 0) + d.amount_total;

    const source = d.source || "Stripe";
    bySource[source] = (bySource[source] || 0) + d.amount_total;
  });

  const lineChartData = Object.entries(byDate).map(([month, amount]) => ({
    month,
    amount: amount / 100,
  }));

  const pieChartData = Object.entries(bySource).map(([source, amount]) => ({
    name: source,
    value: amount / 100,
  }));

  const progress = Math.min((total / GOAL_AMOUNT) * 100, 100);

  return (
    <div className="bg-white shadow p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaChartLine /> Donation Insights
      </h2>

      {/* 🎯 Goal Progress */}
      <div className="mb-6">
        <p className="font-semibold mb-1 flex items-center gap-2">
          <FaBullseye /> Goal Progress
        </p>
        <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
          <div
            className="bg-primary h-4 transition-all duration-500"
            style={{ width: `${progress.toFixed(1)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          £{(total / 100).toLocaleString()} of £{(GOAL_AMOUNT / 100).toLocaleString()} raised ({progress.toFixed(1)}%)
        </p>
      </div>

      {/* 📈 Line Chart: Monthly Totals */}
      <div className="w-full h-64 mb-8">
        <ResponsiveContainer>
          <LineChart data={lineChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(val: any) => `£${val.toFixed(2)}`} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#007676"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Pie Chart: Source Breakdown */}
      <div className="w-full h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieChartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(val: any) => `£${val.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}