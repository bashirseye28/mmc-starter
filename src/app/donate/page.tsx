"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DonateHero from "@/components/Donate/DonateHero";
import WhyDonate from "@/components/Donate/WhyDonate";
import DonationTier from "@/components/Donate/DonationTier";
import DonationIntent, { DonationIntentValues } from "@/components/Donate/DonationIntent";
import DonationForm from "@/components/Donate/DonationForm";
import DonationReview from "@/components/Donate/DonationReview";

export default function DonatePage() {
  const router = useRouter();

  const [step, setStep] = useState<"intent" | "form" | "review">("intent");
  const [loading, setLoading] = useState(false);

  const [donationData, setDonationData] = useState<DonationIntentValues | null>(null);
  const [donorDetails, setDonorDetails] = useState<{
    name?: string;
    email: string;
    message?: string;
    anonymous: boolean;
  } | null>(null);

  const handleIntentContinue = (values: DonationIntentValues) => {
    setDonationData(values);
    setStep("form");
  };

  const handleFormSubmit = (formValues: {
    name?: string;
    email: string;
    message?: string;
    anonymous: boolean;
  }) => {
    setDonorDetails(formValues);
    setStep("review");
  };

  const handleConfirm = async () => {
    if (!donationData || !donorDetails) return;

    try {
      setLoading(true);

      const response = await fetch("/api/stripe/daahira", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...donationData, ...donorDetails }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Stripe session creation failed.");
      }

      // ✅ Redirect to Stripe hosted checkout page
      window.location.href = data.url;
    } catch (err) {
      console.error("Error redirecting to Stripe:", err);
      alert("Something went wrong while redirecting to Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-lightBg text-darkText">
      {/* 🟢 Hero */}
      <DonateHero />

      {/* 🟡 Why Donate */}
      <WhyDonate />

      {/* 🟣 Donation Tiers */}
      <DonationTier />

      {/* 🟠 Donation Flow */}
      <section className="pt-12 pb-24">
        {step === "intent" && (
          <DonationIntent onContinue={handleIntentContinue} />
        )}

        {step === "form" && donationData && (
          <DonationForm
            onSubmit={handleFormSubmit}
            onBack={() => setStep("intent")}
          />
        )}

        {step === "review" && donationData && donorDetails && (
          <DonationReview
            name={donorDetails.name || "Anonymous Donor"}
            email={donorDetails.email}
            message={donorDetails.message}
            anonymous={donorDetails.anonymous}
            amount={donationData.amount}
            frequency={donationData.frequency}
            reference={donationData.reference}
            onEdit={() => setStep("form")}
            onConfirm={handleConfirm}
          />
        )}

        {/* Optional loading feedback */}
        {loading && (
          <div className="text-center mt-6 text-primary font-medium">
            Redirecting to Stripe...
          </div>
        )}
      </section>
    </main>
  );
}