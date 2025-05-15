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

const GOAL_AMOUNT = 15000 * 100; // £15,000 in pennies
const COLORS = ["#007676", "#f5c907", "#8884d8", "#4caf50", "#ff5722"];

export default function DonationInsights() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const q = query(collection(db, "donations"), orderBy("created", "asc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Donation[];
        setDonations(list);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const totalRaised = donations.reduce((sum, d) => sum + (d.amount_total || 0), 0);

  // Aggregate by month and by source
  const byMonth: { [month: string]: number } = {};
  const bySource: { [source: string]: number } = {};

  donations.forEach((d) => {
    const month = format(d.created.toDate(), "MMM yyyy");
    const source = d.source || "Stripe";
    byMonth[month] = (byMonth[month] || 0) + d.amount_total;
    bySource[source] = (bySource[source] || 0) + d.amount_total;
  });

  const chartData = Object.entries(byMonth).map(([month, amount]) => ({
    month,
    amount: amount / 100,
  }));

  const pieData = Object.entries(bySource).map(([source, amount]) => ({
    name: source,
    value: amount / 100,
  }));

  return (
    <div className="bg-white shadow p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaChartLine /> Donation Analytics
      </h2>

      {/* 🎯 Goal Progress */}
      <div className="mb-6">
        <p className="font-semibold mb-1 flex items-center gap-2">
          <FaBullseye /> Goal Progress
        </p>
        <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
          <div
            className="bg-primary h-4"
            style={{ width: `${(totalRaised / GOAL_AMOUNT) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          £{(totalRaised / 100).toFixed(2)} of £{(GOAL_AMOUNT / 100).toLocaleString()} raised
        </p>
      </div>

      {/* 📈 Line Chart */}
      <div className="w-full h-64 mb-6">
        {chartData.length > 0 ? (
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#007676"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-400 italic pt-12">
            Not enough data for chart.
          </div>
        )}
      </div>

      {/* 🥧 Pie Chart */}
      <div className="w-full h-64">
        {pieData.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-400 italic pt-12">
            No data available.
          </div>
        )}
      </div>
    </div>
  );
}