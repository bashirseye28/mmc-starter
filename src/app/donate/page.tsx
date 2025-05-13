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

  const handleReset = () => {
    setDonor(null);
    setDonation(null);
  };

  return (
    <main className="bg-lightBg text-darkText">
      {/* ✅ Hero section + Motivation + Tier Cards */}
      <DonateHero />
      <WhyDonate />
      <DonationTiers />

      {/* ✅ Step 1: Donation amount + frequency + purpose */}
      {!donation && (
        <DonationIntent onContinue={(values) => setDonation(values)} />
      )}

      {/* ✅ Step 2: Donor information */}
      {donation && !donor && (
        <DonorForm
          onSubmit={(values) => setDonor(values)}
          onBack={() => setDonation(null)}
          defaultValues={{ name: "", email: "", anonymous: false }}
        />
      )}

      {/* ✅ Step 3: Final Review and Stripe Redirect */}
      {donation && donor && (
        <StripeCheckoutReview
          amount={donation.amount}
          frequency={donation.frequency}
          reference={donation.reference}
          isCustom={donation.isCustom}
          name={donor.name}
          email={donor.email}
          anonymous={donor.anonymous}
          onReturn={handleReset}
        />
      )}
    </main>
  );
};

export default DonatePage;