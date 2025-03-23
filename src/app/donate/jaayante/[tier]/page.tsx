"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jaayanteTiers } from "@/data/jaayanteTiers";
import { useParams } from "next/navigation";
import { useState } from "react";

const priceIds: Record<string, string> = {
  Sindiidi: "price_1R1ALk2M54cogX5dRpLwsrSl",
  Wakaana: "price_1R1ANE2M54cogX5dh5OVBIJu",
  Jaalibatu: "price_1R1AO82M54cogX5dGKIbvsPV",
  Mawaahibu: "price_1R1AP92M54cogX5dKKEjJOxW",
  Midaadi: "price_1R1APi2M54cogX5djRcZ8BXj",
  Fathul_Fattah: "price_1R1AQQ2M54cogX5deCkcEJxm",
};

// ✅ Function to get tier details
const getTierDetails = (tierSlug: string) => {
  return jaayanteTiers.find((tier) => tier.slug === tierSlug);
};

const JaayanteDonationPage = () => {
  const { tier } = useParams();
  const selectedTier = getTierDetails(tier as string);
  const [loading, setLoading] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  // ✅ Handle Proceed to Payment
  const handleProceedToPayment = async () => {
    if (!selectedTier) return;

    // Ensure non-anonymous users provide details
    if (!anonymous && (!donorName || !email)) {
      alert("Please fill in all required fields or select 'Donate Anonymously'.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/stripe/jaayante-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedTier.title,
          priceId: priceIds[selectedTier.title],
          donorName: anonymous ? "Anonymous" : donorName,
          email: anonymous ? "anonymous@donation.com" : email,
          isAnonymous: anonymous,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // ✅ Redirect to Stripe Checkout
      } else {
        console.error("Stripe session error:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  if (!selectedTier) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-600">Invalid Jaayante Tier</h2>
        <p className="text-lg text-gray-600 mt-2">Please select a valid Jaayante donation tier.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl text-primary font-bold font-heading">
            Support <span className="text-gold">{selectedTier.title}</span>
          </h1>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            Your generous contribution of{" "}
            <span className="text-gold font-semibold">£{selectedTier.amount}</span> will play a vital role in building{" "}
            <span className="text-primary font-semibold">Keur Serigne Touba (KST)</span>—a permanent center for faith,
            education, and community service.
          </p>
        </motion.div>

        {/* ✅ Donor Info Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          {/* ✅ Name & Email Fields (Hidden if Anonymous) */}
          {!anonymous && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full p-3 border rounded-lg mb-3"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg mb-3"
                required
              />
            </>
          )}

          {/* ✅ Anonymous Donation Checkbox */}
          <label className="flex items-center gap-2 mb-4 text-gray-700">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
            Donate Anonymously
          </label>

          <button
            className="mt-4 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition shadow-md w-full"
            onClick={handleProceedToPayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default JaayanteDonationPage;