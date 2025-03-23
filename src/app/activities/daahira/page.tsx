"use client";
import DaahiraHero from "@/components/Activities/Daahira/DaahiraHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import DaahiraIntro from "@/components/Activities/Daahira/DaahiraIntro";
import DaahiraSchedule from "@/components/Activities/Daahira/DaahiraSchedule";
import WhyJoinDaahira from "@/components/Activities/Daahira/WhyJoinDaahira";
import FeaturedQuote from "@/components/Activities/Daahira/FeaturedQuote";
import DaahiraMedia from "@/components/Activities/Daahira/DaahiraMedia";
import DaahiraRegistration from "@/components/Activities/Daahira/DaahiraRegister";

const DaahiraPage = () => {
  return (
    <>
      <DaahiraHero />

      <Breadcrumbs />

      <DaahiraIntro />

      <DaahiraSchedule />

      <WhyJoinDaahira />

      <FeaturedQuote />

      <DaahiraMedia />

      <DaahiraRegistration />

    </>
  );
};

export default DaahiraPage;