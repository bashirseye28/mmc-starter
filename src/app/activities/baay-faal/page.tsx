"use client";
import React from "react";
import AhluBaayFaalHero from "@/components/Activities/Baay-Faal/AhluBaayFaalHero"; // Import the Hero Section
import Breadcrumbs from "@/components/Breadcrumbs";
import WhoAreBaayFaal from "@/components/Activities/Baay-Faal/WhoAreBaayFaal";
import SpiritOfBaayFaal from "@/components/Activities/Baay-Faal/SpiritOfBaayFaal";
import CommunityService from "@/components/Activities/Baay-Faal/CommunityService";
import WhyJoinBaayFaal from "@/components/Activities/Baay-Faal/WhyJoinBaayFaal"
import BaayFaalSchedule from "@/components/Activities/Baay-Faal/BaayFaalSchedule";
import BaayFaalMedia from "@/components/Activities/Baay-Faal/BaayFaalMedia";
import CallToAction from "@/components/Activities/Baay-Faal/CallToAction";

const AhluBaayFaalPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <AhluBaayFaalHero />

      <Breadcrumbs />

      <WhoAreBaayFaal />

      <SpiritOfBaayFaal />

      <CommunityService />

      <WhyJoinBaayFaal />

      <BaayFaalSchedule />

      <BaayFaalMedia />

      <CallToAction />

      {/* More sections will be added here */}
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold">More Content Coming Soon...</h2>
      </div>
    </main>
  );
};

export default AhluBaayFaalPage;