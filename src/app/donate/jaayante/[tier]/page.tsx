"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import { jaayanteTiers } from "@/data/jaayanteTiers";
import { jaayantePriceIds } from "@/data/priceIds";

const getTierDetails = (slug: string) =>
  jaayanteTiers.find((tier) => tier.slug === slug);

export default function JaayanteDonationPage() {
  const { tier } = useParams(); // e.g. "sindiidi", "fathul-fattah"
  const selectedTier = getTierDetails(tier as string);

  const [loading, setLoading] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleProceed = async () => {
    if (!selectedTier) {
      alert("Invalid donation tier selected.");
      return;
    }

    if (!anonymous && (!donorName.trim() || !email.trim())) {
      alert("Please enter your name and email, or select anonymous.");
      return;
    }

    const safePriceId = jaayantePriceIds[selectedTier.slug];
    if (!safePriceId) {
      console.error("❌ No Stripe Price ID for:", selectedTier.slug);
      alert("Error: This donation tier is not configured.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/jaayante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedTier.slug, // 👈 send slug, not title
          amount: selectedTier.amount,
          priceId: safePriceId,
          donorName: anonymous ? "Anonymous" : donorName.trim(),
          email: anonymous ? "donor@anonymous.com" : email.trim(),
          isAnonymous: anonymous,
        }),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Checkout failed");
      }
    } catch (err) {
      console.error("❌ Stripe checkout failed:", err);
      alert("Donation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedTier) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-600">Invalid Tier</h2>
        <p className="text-gray-600">Please choose a valid donation tier.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-primary font-bold font-heading">
            Support <span className="text-gold">{selectedTier.title}</span>
          </h1>
          <p className="mt-4 text-darkText max-w-2xl mx-auto">
            Your donation of{" "}
            <span className="text-gold font-semibold">£{selectedTier.amount}</span>{" "}
            helps us build the <strong>Keur Serigne Touba</strong> centre.
          </p>
        </motion.div>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-left">
          {!anonymous && (
            <>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 mb-4 border p-3 rounded-lg"
                placeholder="Your Name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />

              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 mb-4 border p-3 rounded-lg"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          <label className="flex items-center text-sm mb-4 gap-2">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
              className="accent-gold"
            />
            Donate Anonymously
          </label>

          <button
            onClick={handleProceed}
            disabled={loading}
            className="w-full bg-gold text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 shadow-md transition"
          >
            {loading ? "Processing..." : `Donate £${selectedTier.amount}`}
          </button>
        </div>
      </div>
    </section>
  );
}