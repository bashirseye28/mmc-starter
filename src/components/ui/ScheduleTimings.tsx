"use client";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";

interface ScheduleItem {
  day: string;
  time: string;
  openTo: string;
}

interface ScheduleTimingsProps {
  scheduleTitle: string;
  schedule: ScheduleItem[];
  location: string;
  address: string;
  phone: string;
}

const ScheduleTimings: React.FC<ScheduleTimingsProps> = ({
  scheduleTitle,
  schedule,
  location,
  address,
  phone,
}) => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      {/* ✅ Title with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-[#007676] flex items-center gap-3 mb-8">
          <Clock size={32} /> {scheduleTitle}
        </h2>

        {/* ✅ Stylish Schedule Table */}
        <div className="overflow-hidden rounded-2xl shadow-xl border-2 border-[#007676]">
          <table className="w-full text-center text-lg bg-white">
            <thead className="bg-gradient-to-r from-[#007676] to-[#005a5a] text-white">
              <tr>
                <th className="p-5">Day</th>
                <th className="p-5">Time</th>
                <th className="p-5">Open To</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 transition duration-300 ${
                    index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"
                  }`}
                >
                  <td className="py-4 font-medium text-[#333]">{item.day}</td>
                  <td className="py-4 text-[#007676] font-semibold">{item.time}</td>
                  <td className="py-4 text-gray-600">{item.openTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

{/* ✅ Location & Contact Info - Enhanced Styling */}
<motion.div
  className="mt-10 bg-white border border-[#007676] p-8 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
>
  {/* Icon Section */}
  <div className="flex items-center justify-center bg-gradient-to-br from-[#007676] to-[#005a5a] text-white rounded-full h-20 w-20 shadow-md">
    <MapPin size={40} />
  </div>

  {/* Info Section */}
  <div>
    <h3 className="text-2xl font-bold text-[#007676] mb-2">Location & Contact</h3>
    <p className="text-lg font-medium text-gray-800">{location}</p>
    <p className="mt-1 text-lg text-gray-700">{address}</p>
    <p className="mt-2 flex items-center gap-2 text-lg text-[#007676] font-semibold">
      <Phone size={20} /> {phone}
    </p>
  </div>
</motion.div>
      </motion.div>
    </section>
  );
};

export default ScheduleTimings;