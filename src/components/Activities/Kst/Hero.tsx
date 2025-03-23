import Hero from "@/components/Common/Hero";
import { Users, Heart } from "lucide-react";

const KstHero = () => {
  return (
    <Hero
      title="Building the Future"
      highlight="A Home for Our Community"
      subtitle="The Keur Serigne Touba (KST) project will create a lasting legacy – a dedicated Islamic Centre for worship, education, and community growth."
      image="/images/jaayante.png" // ✅ Updated image
      ctaText="Learn About KST"
      ctaLink="#about"
      ctaSecondaryText="Support the Project"
      ctaSecondaryLink="#donation-tiers"
      ctaPrimaryIcon={<Users className="w-5 h-5" />}
      ctaSecondaryIcon={<Heart className="w-5 h-5" />}
    />
  );
};

export default KstHero;