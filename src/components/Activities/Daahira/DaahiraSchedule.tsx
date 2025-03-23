"use client";

import ScheduleComponent from "@/components/ScheduleComponent";

const WeeklyDaahiraSchedule = () => {
  const schedules = [
    {
      day: "Every Monday",
      time: "7:00 PM - 9:00 PM",
      ageGroup: "Everyone",
      location: "Sunni Muslim Hall",
      address: "20 Brideoak Street, Manchester, M8 0PN, United Kingdom",
      mapLink: "https://maps.google.com/?q=20+Brideoak+Street,+Manchester,+M8+0PN",
    },
  ];

  return (
    <ScheduleComponent
      title="Weekly Daahira Schedule & Timings"
      description="Join our Weekly Daahira every Monday for an evening of Xassida recitations, Islamic teachings, and community bonding."
      schedules={schedules}
    />
  );
};

export default WeeklyDaahiraSchedule;