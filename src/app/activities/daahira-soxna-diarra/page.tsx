import SoxnaHero from "@/components/Activities/Soxna-Diarra/SoxnaHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SoxnaAbout from "@/components/Activities/Soxna-Diarra/SoxnaAbout";
import SoxnaLegacy from "@/components/Activities/Soxna-Diarra/SoxnaLegacy";
import SoxnaDiarraProjects from "@/components/Activities/Soxna-Diarra/SoxnaDiarraProjects";
import SoxnaSchedule from "@/components/Activities/Soxna-Diarra/SoxnaSchedule";
import SoxnaMedia from "@/components/Activities/Soxna-Diarra/SoxnaMedia";
// import SoxnaDiarraCharity from "@/components/Activities/Soxna-Diarra/SoxnaDiarraCharity";
import SoxnaDiarraCTA from "@/components/Activities/Soxna-Diarra/SoxnaDiarraCTA";


const SoxnaDiarraPage = () => {
  return (
    <main className="min-h-screen">
      {/* ✅ Hero Section */}
      <SoxnaHero />

      <Breadcrumbs />

      <SoxnaAbout />

      <SoxnaLegacy />

      {/* <SoxnaDiarraCharity /> */}

      <SoxnaDiarraProjects />

      <SoxnaSchedule />
      
      
      <SoxnaMedia />


      <SoxnaDiarraCTA />


    </main>
  );
};

export default SoxnaDiarraPage;