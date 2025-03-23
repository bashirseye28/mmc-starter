"use client";

import ScheduleComponent from "@/components/ScheduleComponent";

const BaayFaalSchedule = () => {
  const schedules = [
    {
      day: "Every Monday",
      time: "8:15 PM - 8:45 PM",
      ageGroup: "Everyone",
      location: "Sunni Muslim Hall",
      address: "20 Brideoak Street, Manchester, M8 0PN, United Kingdom",
      mapLink: "https://maps.google.com/?q=20+Brideoak+Street,+Manchester,+M8+0PN",
    },
  ];

  return (
    <ScheduleComponent
      title="Baay Faal Weekly Gathering"
      description="Join the Baay Faal community every Monday for spiritual devotion, unity, and reflection on the teachings of Sheikh Ahmadou Bamba."
      schedules={schedules}
    />
  );
};

export default BaayFaalSchedule;