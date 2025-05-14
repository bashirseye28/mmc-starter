// src/components/Donate/DonationFlow.tsx
"use client";

import { useState } from "react";
import DonationIntent, { DonationIntentValues } from "./DonationIntent";
// import DonationForm from "./DonationForm";
// import StripeCheckoutReview from "./StripeCheckoutReview";

const DonationFlow = () => {
  const [intent, setIntent] = useState<DonationIntentValues | null>(null);

  const handleContinue = (values: DonationIntentValues) => {
    console.log("Donation Intent:", values);
    setIntent(values);
    // You could navigate to DonationForm or StripeCheckoutReview
  };

  return (
    <>
      {!intent && <DonationIntent onContinue={handleContinue} />}
      {/* {intent && <DonationForm intent={intent} />} */}
    </>
  );
};

export default DonationFlow;