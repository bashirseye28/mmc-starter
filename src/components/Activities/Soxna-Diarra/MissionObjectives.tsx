"use client";
import { motion } from "framer-motion";
import { HeartHandshake, BookOpenCheck, HelpingHand, Users } from "lucide-react";

const MissionObjectives = () => {
  const objectives = [
    {
      icon: <HeartHandshake size={32} className="text-gold" />,
      title: "Faith-Driven Support",
      description: "Promote Islamic values through sisterhood, prayer, and community support."
    },
    {
      icon: <HelpingHand size={32} className="text-gold" />,
      title: "Charitable Projects",
      description: "Organise fundraising activities, donations, and charity events to support the less fortunate."
    },
    {
      icon: <BookOpenCheck size={32} className="text-gold" />,
      title: "Religious Education",
      description: "Offer classes, lectures, and workshops on Islamic teachings and the life of Cheikh Ahmadou Bamba."
    },
    {
      icon: <Users size={32} className="text-gold" />,
      title: "Empowering Women",
      description: "Foster a supportive environment for women to grow spiritually, socially, and intellectually."
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          className="text-3xl font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Mission & Objectives
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4">
          Daahira Soxna Diarra strives to empower women through faith, charity, and education.
        </p>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
          {objectives.map((obj, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-left"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#007676] rounded-full">{obj.icon}</div>
                <h3 className="text-xl font-semibold text-[#007676]">{obj.title}</h3>
              </div>
              <p className="text-gray-700 mt-3">{obj.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionObjectives;