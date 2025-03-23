import Hero from "@/components/About/Hero";
import MissionVision from "@/components/About/MissionVision";
import OurStory from "@/components/About/OurStory";
import Leadership from "@/components/About/Leadership";
import Values from "@/components/About/Values";
import CommunityImpact from "@/components/About/CommunityImpact";
// import Stats from "@/components/About/Stats";
import Testimonials from "@/components/About/Testimonials";
import GetInvolved from "@/components/About/GetInvolved";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Our Story */}
      <OurStory />

      {/* Leadership Team */}
      <Leadership />

      {/* Core Values */}
      <Values />

      {/* Impact Statistics */}
      {/* <Stats /> */}

      {/* Testimonials */}
      <Testimonials />

      <CommunityImpact />

      {/* Call-To-Action */}
      <GetInvolved />
    </main>
  );
}