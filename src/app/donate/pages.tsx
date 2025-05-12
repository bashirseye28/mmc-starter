"use client";

import { useState } from "react";
import DonateHero from "./components/DonateHero";
import WhyDonate from "./components/WhyDonate";
import DonationTiers from "./components/DonationTiers";
import CustomAmount from "./components/CustomDonation";
import DonationFrequency from "./components/DonationFrequency";
import PaymentMethods from "./components/PaymentMethods";
import DonationSummary from "./components/DonationSummary";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // ✅ Handle amount selection
  const handleAmountSelection = (amount: number | string) => {
    if (typeof amount === "string") {
      setCustomAmount(amount);
      setSelectedAmount(null);
    } else {
      setSelectedAmount(amount);
      setCustomAmount("");
    }
    setCurrentStep(2); // Move to next step (frequency)
  };

  // ✅ Handle frequency selection
  const handleFrequencySelection = (frequency: string) => {
    setSelectedFrequency(frequency);
    setCurrentStep(3); // Move to next step (payment method)
  };

  // ✅ Handle payment selection
  const handlePaymentSelection = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
    setCurrentStep(4); // Move to final step (review & payment)
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <DonateHero />
      <WhyDonate />
      <DonationTiers />

      <div className="container mx-auto px-6 max-w-4xl py-12 space-y-10">
        
        {/* ✅ Step 1: Select Amount */}
        {currentStep === 1 && (
          <CustomAmount
            onProceed={() => setCurrentStep(2)}
            onSelectAmount={handleAmountSelection}
            onCustomAmountChange={setCustomAmount}
            selectedAmount={selectedAmount}
            customAmount={customAmount}
          />
        )}

        {/* ✅ Step 2: Select Frequency */}
        {currentStep === 2 && (
          <div className="bg-white shadow-lg p-6 rounded-lg border">
            <DonationFrequency onSelectFrequency={handleFrequencySelection} />
          </div>
        )}

        {/* ✅ Step 3: Choose Payment Method */}
        {currentStep === 3 && (
          <div className="bg-white shadow-lg p-6 rounded-lg border">
            <PaymentMethods
              amount={selectedAmount ?? customAmount ?? "0"}
              frequency={selectedFrequency ?? "One-time"}  // ✅ Ensured default string value
              onSelectMethod={handlePaymentSelection}
            />
          </div>
        )}

        {/* ✅ Step 4: Show Donation Summary & Proceed */}
        {currentStep === 4 && selectedPayment ? (
          <DonationSummary
            amount={selectedAmount ?? customAmount ?? "0"}
            frequency={selectedFrequency ?? "One-time"}  // ✅ Ensured default string value
            paymentMethod={selectedPayment ?? "Unknown"} // ✅ Ensured default string value
          />
        ) : null}
      </div>
    </main>
  );
}