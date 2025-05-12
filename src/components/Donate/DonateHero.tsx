// src/components/Donate/DonateHero.tsx
"use client";

import Hero from "@/components/Common/Hero";
import { FaHandHoldingHeart } from "react-icons/fa";

const DonateHero = () => {
  return (
    <Hero
       title="Support Our Community"
      highlight="Make an Impact"
      subtitle="Your generosity empowers our efforts in faith, education, and community development."
      image="/images/donate-hero.jpg"
      imageAlt="Members of the Manchester Murid Community joining hands in support"
      ctaText="Start Your Donation"
      ctaLink="#choose-amount"
      ctaPrimaryIcon={<FaHandHoldingHeart className="mr-2" />}
    />
  );
};

export default DonateHero;