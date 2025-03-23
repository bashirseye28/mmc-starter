"use client";

import Hero from "@/components/Activities/Kst/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import About from "@/components/Activities/Kst/About"
import WhyKstMatters from "@/components/Activities/Kst/WhyKstMatters";
import KstFacilities from "@/components/Activities/Kst/KstFacilities";
import KstFundraising from "@/components/Activities/Kst/KstFundraising";
import KstDonationTiers from "@/components/Activities/Kst/KstDonationTiers";
import KstTestimonials from "@/components/Activities/Kst/KstTestimonials";
import KstCTA from "@/components/Activities/Kst/CallToAction";

export default function KSTPage() {
  return (
    <div>
      {/* ✅ Hero Section */}
      <Hero />

      <Breadcrumbs />

      <About />

      <WhyKstMatters />

      <KstFacilities />

      <KstFundraising />

      <KstDonationTiers />

      <KstTestimonials />

      <KstCTA />

      {/* ✅ Other sections will be added below */}
    </div>
  );
}