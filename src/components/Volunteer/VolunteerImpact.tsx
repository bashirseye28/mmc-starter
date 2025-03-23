"use client";
import { Users, Briefcase, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const impactStats = [
  { icon: <Users size={50} className="text-gold" />, label: "Active Volunteers", value: "120+" },
  { icon: <Briefcase size={50} className="text-gold" />, label: "Projects Completed", value: "30+" },
  { icon: <HeartHandshake size={50} className="text-gold" />, label: "Lives Touched", value: "5000+" },
];

const VolunteerImpact = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center px-6">
        
        {/* Section Title */}
        <motion.h2 
          className="text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Volunteer with MMC?
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 mt-4 text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Your time and effort make a real difference in the community.
        </motion.p>

        {/* Impact Stats with Animations */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {impactStats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center p-8 bg-white shadow-xl rounded-lg transition duration-300 hover:shadow-2xl hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="">{stat.icon}</div>
              <p className="text-4xl font-extrabold mt-3 text-primary">{stat.value}</p>
              <p className="text-gray-700 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerImpact;