"use client";

import Hero from "@/components/Common/Hero";
import { FaHandHoldingHeart } from "react-icons/fa";

const DonateHero = () => {
  return (
    <Hero
      title="Support Our Community"
      highlight="Make an Impact"
      subtitle="Your generosity helps sustain and grow our spiritual, educational, and social initiatives."
      image="/images/donate-hero.jpg" // Ensure this path is correct
      ctaText="Start Your Donation"
      ctaLink="#choose-amount"
      ctaPrimaryIcon={<FaHandHoldingHeart />} // Donation Icon
    />
  );
};

export default DonateHero;