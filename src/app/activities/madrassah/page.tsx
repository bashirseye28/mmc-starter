import MadrassahHero from "@/components/Activities/Madrassah/MadrassahHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import MadrassahIntro from "@/components/Activities/Madrassah/MadrassahAbout";
import MadrassahSubjects from "@/components/Activities/Madrassah/MadrassahSubjects";
import MadrassahSchedule from "@/components/Activities/Madrassah/MadrassahSchedule";
import MadrassahEnroll from "@/components/Activities/Madrassah/MadrassahEnroll";
import SupportMadrassah from "@/components/Activities/Madrassah/SupportMadrassah";
import MadrassahRegister from "@/components/Activities/Madrassah/MadrassahRegister";


export default function MadrassahPage() {
  return (
    <main className="min-h-screen">
      {/* ✅ Hero Section */}
      <MadrassahHero />

      <Breadcrumbs />

      <MadrassahIntro />

      <MadrassahSubjects />

      <MadrassahSchedule />

      <MadrassahEnroll />

      <SupportMadrassah />

      <MadrassahRegister />

    </main>
  );
}