import dynamic from "next/dynamic";
import Hero from "@/components/Home/Hero";
import WhoWeAre from "@/components/Home/WhoWeAre";
import HomeActivities from "@/components/Home/HomeActivities";
import KSTProject from "@/components/Home/KSTProject";
import FeaturedEvent from "@/components/Home/FeaturedEvent";
import GetInvolved from "@/components/About/GetInvolved";
import Testimonials from "@/components/Home/Testimonials";


export default function Home() {

  return (
    <main>
      
      <Hero />

      <WhoWeAre />

      <HomeActivities />

      <KSTProject />

      <FeaturedEvent />

      <Testimonials />

      <GetInvolved />


    </main>
  );
}