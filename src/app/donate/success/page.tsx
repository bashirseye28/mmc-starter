// /src/app/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await res.json();
        setMetadata(data.metadata);
      } catch (err) {
        console.error("❌ Failed to load session:", err);
      } finally {
        setLoading(false);
      }
    }

    if (sessionId) fetchSession();
  }, [sessionId]);

  if (loading) return <p>Loading donation details...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Thank You for Your Generosity!
      </h1>
      <p className="text-center mb-6">Your donation is making a real difference.</p>

      <div className="bg-gray-50 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3 text-green-800">Donation Summary</h2>
        <ul className="space-y-1 text-sm">
          <li><strong>Donor:</strong> {metadata?.donor_name ?? "Anonymous"}</li>
          <li><strong>Email:</strong> {metadata?.donor_email ?? "Not Provided"}</li>
          <li><strong>Amount:</strong> £{metadata?.donation_amount ?? "N/A"}</li>
          <li><strong>Frequency:</strong> {metadata?.donation_frequency ?? "N/A"}</li>
        </ul>
      </div>
    </div>
  );
}