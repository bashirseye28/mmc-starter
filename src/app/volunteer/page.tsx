import VolunteerHero from "@/components/Volunteer/VolunteerHero";
import VolunteerImpact from "@/components/Volunteer/VolunteerImpact";
import VolunteerForm from "@/components/Volunteer/VolunteerForm";
import VolunteerFAQ from "@/components/Volunteer/VolunteerFAQ";

const VolunteerPage = () => {
  return (
    <main>
      <VolunteerHero />
      <VolunteerImpact />
      <section id="volunteer-form">
        <VolunteerForm />
      </section>
      <VolunteerFAQ />
    </main>
  );
};

export default VolunteerPage;