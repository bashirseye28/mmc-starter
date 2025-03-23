"use client";
import ScheduleTimings from "@/components/ui/ScheduleTimings";

const DaahiraSoxnaDiarraSchedule = () => {
  // Schedule Data
  const schedule = [
    {
      day: "First Monday of Every Month",
      time: "7:00 PM - 10:00 PM",
      openTo: "All Women Members",
    }
  ];

  // Location Info
  const location = "Manchester Murid Community Centre";
  const address = "20 Brideoak Street, Manchester, M8 0PN";
  const phone = "+44 7541 475 547";

  return (
    <ScheduleTimings
      scheduleTitle="Monthly Gathering Schedule"
      schedule={schedule}
      location={location}
      address={address}
      phone={phone}
    />
  );
};

export default DaahiraSoxnaDiarraSchedule;