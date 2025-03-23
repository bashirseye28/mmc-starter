import KureelHero from "@/components/Activities/Kureel/KureelHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import KureelIntro from "@/components/Activities/Kureel/KureelIntro";
import KureelSchedule from "@/components/Activities/Kureel/KureelSchedule";
// import KureelSchedule from "@/components/Activities/Kureel/KureelSchedule";
import KureelMedia from "@/components/Activities/Kureel/KureelMedia";
import XassidaImportance from "@/components/Activities/Kureel/XassidaImportance";
import KureelImportance from "@/components/Activities/Kureel/KureelImportance";
import KureelCTA from "@/components/Activities/Kureel/KureelCTA";

export default function KureelPage() {
  return (
    <main>
      {/* ✅ Hero Section */}
      <KureelHero />

      <Breadcrumbs />

      {/* ✅ What is Kureel Xassida? */}
      <KureelIntro />

      {/* ✅ The Importance of Xassida */}
      <KureelImportance />

      <XassidaImportance />

      {/* ✅ Media Section */}
      <KureelMedia />

      {/* ✅ Weekly Schedule */}
      <KureelSchedule />

      <KureelCTA />

    </main>
  );
}