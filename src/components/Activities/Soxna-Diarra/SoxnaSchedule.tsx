"use client";

import ScheduleComponent from "@/components/ScheduleComponent";

const SoxnaDiarraSchedule = () => {
  const schedules = [
    {
      day: "Every Other Monday",
      time: "7:00 PM - 9:00 PM",
      ageGroup: "Women Only",
      location: "Sunni Muslim Hall",
      address: "20 Brideoak Street, Manchester, M8 0PN, United Kingdom",
      mapLink: "https://maps.google.com/?q=20+Brideoak+Street,+Manchester,+M8+0PN",
    },
  ];

  return (
    <ScheduleComponent
      title="Soxna Diarra Schedule & Timings"
      description="Join Daahira Soxna Diarra every other Monday for an evening of faith, unity, and community support, dedicated to empowering Murid women."
      schedules={schedules}
    />
  );
};

export default SoxnaDiarraSchedule;