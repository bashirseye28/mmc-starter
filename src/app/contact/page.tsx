import ContactHero from "@/components/Contact/ContactHero";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import ContactDetails from "@/components/Contact/ContactDetails";
import SocialMediaSection from "@/components/Contact/SocialMediaSection";
import CTASection from "@/components/Contact/CTASection";

export default function ContactPage() {
  return (
    <main>
      {/* ✅ Hero Section */}
      <ContactHero />

      {/* ✅ Quick Contact Info Section */}
      <ContactInfo />

      {/* ✅ Contact Form */}
      <ContactForm />

      <ContactDetails />

      <SocialMediaSection />

      <CTASection />
    </main>
  );
}