"use client";

import { useState } from "react";
import DonateHero from "@/components/Donate/DonateHero";
import WhyDonate from "@/components/Donate/WhyDonate";
import DonationTiers from "@/components/Donate/DonationTiers";
import DonationIntent, { DonationIntentValues } from "@/components/Donate/DonationIntent";
import DonorForm, { DonorFormValues } from "@/components/Donate/DonationForm";
import StripeCheckoutReview from "@/components/Donate/StripeCheckoutReview";

const DonatePage = () => {
  const [donation, setDonation] = useState<DonationIntentValues | null>(null);
  const [donor, setDonor] = useState<DonorFormValues | null>(null);

  return (
    <main className="bg-lightBg text-darkText">
      {/* ✅ Hero + Impact + Tiers */}
      <DonateHero />
      <WhyDonate />
      <DonationTiers />

      {/* ✅ Step 1: Choose donation amount + frequency + reference */}
      {!donation && (
        <DonationIntent onContinue={(values) => setDonation(values)} />
      )}

      {/* ✅ Step 2: Donor details form */}
      {donation && !donor && (
        <DonorForm
          onSubmit={(values) => setDonor(values)}
          onBack={() => setDonation(null)}
          defaultValues={{
            name: "",
            email: "",
            anonymous: false,
          }}
        />
      )}

      {/* ✅ Step 3: Stripe checkout review and launch */}
      {donation && donor && (
        <StripeCheckoutReview
          amount={donation.amount}
          frequency={donation.frequency}
          reference={donation.reference}
          isCustom={donation.isCustom} // ✅ This was missing
          name={donor.name}
          email={donor.email}
          anonymous={donor.anonymous}
          onReturn={() => {
            setDonor(null);
            setDonation(null);
          }}
        />
      )}
    </main>
  );
};

export default DonatePage;