import Hero from "@/components/Activities/ActivitiesHero";
import MainActivities from "@/components/Activities/MainActivities";
import KSTProject from "@/components/Activities/KSTProject";
import GetInvolved from "@/components/Activities/GetInvolved";
import ActivitiesHero from "@/components/Activities/ActivitiesHero";

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen">
      {/* ✅ Hero Section */}
      <ActivitiesHero />

      {/* ✅ Our Main Activities */}
      <MainActivities />

      {/* ✅ Featured Activity – Keur Serigne Touba (KST) */}
      <KSTProject />

      <GetInvolved />
    </main>
  );
}