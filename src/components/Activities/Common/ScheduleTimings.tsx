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
    <section className="max-w-6xl mx-auto py-20 px-6">
      {/* ✅ Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-primary flex items-center justify-center gap-3">
          <Clock size={32} className="text-gold" /> {scheduleTitle}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Join us for these sacred sessions, fostering spiritual growth and unity.
        </p>
      </motion.div>

      {/* ✅ Schedule Grid - Luxury Design */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {schedule.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white/80 backdrop-blur-md border border-gray-300 shadow-md rounded-xl transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-primary">{item.day}</h3>
            <p className="text-lg text-gray-700 mt-2">
              <span className="font-bold text-gold">Time:</span> {item.time}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-bold text-gold">Open To:</span> {item.openTo}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ✅ Beautiful Location & Contact Section */}
      <motion.div
        className="mt-16 flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-primary to-[#005a5a] text-white p-12 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {/* ✅ Location Icon */}
        <div className="flex items-center justify-center bg-gold text-black rounded-full h-24 w-24 shadow-lg">
          <MapPin size={44} />
        </div>

        {/* ✅ Contact Details */}
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-bold mb-2">Location & Contact</h3>
          <p className="text-lg font-medium">{location}</p>
          <p className="mt-1 text-lg">{address}</p>
          <p className="mt-3 flex items-center justify-center md:justify-start gap-2 text-lg font-semibold">
            <Phone size={24} /> {phone}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ScheduleTimings;