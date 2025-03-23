"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faMapMarkerAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ScheduleProps {
  title: string;
  description: string;
  schedules: {
    day: string;
    time: string;
    ageGroup?: string;
    location: string;
    address: string;
    mapLink: string;
  }[];
}

// ✅ Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const ScheduleComponent: React.FC<ScheduleProps> = ({ title, description, schedules }) => {
  return (
    <section id="schedule" className="py-20 bg-lightBg">
      <motion.div
        className="container mx-auto px-6 max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* ✅ Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-heading">
            <span className="border-b-4 border-gold pb-1">{title}</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* ✅ Schedule List */}
        <div className="space-y-8">
          {schedules.map((schedule, index) => (
            <motion.div
              key={index}
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 text-center mx-auto max-w-2xl"
            >
              <h3 className="text-xl font-semibold text-primary font-heading flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gold" />
                <strong>{schedule.day}</strong>
              </h3>

              <p className="text-lg text-darkText font-body flex items-center justify-center gap-2 mt-2">
                <FontAwesomeIcon icon={faClock} className="text-gold" />
                {schedule.time}
              </p>

              {/* ✅ Age Group (Optional) */}
              {schedule.ageGroup && (
                <p className="text-lg text-darkText font-body flex items-center justify-center gap-2 mt-2">
                  <FontAwesomeIcon icon={faUsers} className="text-gold" />
                  <span className="font-medium">{schedule.ageGroup}</span>
                </p>
              )}

              <p className="text-lg text-darkText font-body flex items-center justify-center gap-2 mt-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />
                {schedule.location}
              </p>
              <p className="text-gray-600 text-sm font-body mt-1">{schedule.address}</p>

              {/* ✅ Google Maps Button */}
              <div className="text-center mt-5">
                <Link href={schedule.mapLink} target="_blank">
                  <motion.button 
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-[#005A5A] transition shadow-md text-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 118, 118, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View on Google Maps
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ScheduleComponent;