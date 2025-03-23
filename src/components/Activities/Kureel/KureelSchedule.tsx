"use client";

import ScheduleComponent from "@/components/ScheduleComponent";

const KureelSchedule = () => {
  const schedules = [
    {
      day: "Every Sunday",
      time: "4:00 PM - 7:30 PM",
      ageGroup: "Everyone",
      location: "Keur Baay Xassida",
      address: "5 Rebecca Street, Manchester, M8 5AF, United Kingdom",
      mapLink: "https://maps.google.com/?q=5+Rebecca+Street,+Manchester,+M8+5AF",
    },
  ];

  return (
    <ScheduleComponent
      title="Kureel Meeting Schedule"
      description="Join Kureel every Sunday to celebrate the teachings of Sheikh Ahmadou Bamba and engage in spiritual discussions."
      schedules={schedules}
    />
  );
};

export default KureelSchedule;