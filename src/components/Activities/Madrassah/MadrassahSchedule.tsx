"use client";
import ScheduleComponent from "@/components/ScheduleComponent";
const MadrassahSchedule = () => {
  const schedules = [
    {
      day: "Saturday",
      time: "1:00 PM - 4:00 PM",
      ageGroup: "Children Only",
      location: "Longsight Community Art Space",
      address: "89 Northmoor Road, Longsight, Manchester",
      mapLink: "https://maps.google.com/?q=89+Northmoor+Road,+Longsight,+Manchester",
    },
    {
      day: "Sunday",
      time: "12:00 PM - 3:00 PM",
      ageGroup: "Children Only",
      location: "Longsight Community Art Space",
      address: "89 Northmoor Road, Longsight, Manchester",
      mapLink: "https://maps.google.com/?q=89+Northmoor+Road,+Longsight,+Manchester",
    },
    {
      day: "Monday",
      time: "5:00 PM - 7:00 PM",
      ageGroup: "All Ages",
      location: "Sunni Muslim Hall",
      address: "20 Brideoak Street, Manchester, M8 0PN",
      mapLink: "https://maps.google.com/?q=20+Brideoak+Street,+Manchester",
    },
  ];

  return (
    <ScheduleComponent
      title="Madrassah Class Schedule"
      description="Our Madrassah provides structured learning opportunities for different age groups, ensuring accessible Islamic education for all."
      schedules={schedules}
    />
  );
};

export default MadrassahSchedule;