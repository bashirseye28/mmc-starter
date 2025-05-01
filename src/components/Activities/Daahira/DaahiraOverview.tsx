"use client";
import { motion } from "framer-motion";
import { BookOpen, Users, Heart } from "lucide-react";

const DaahiraOverview = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* 🔥 Heading with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#007676]">What Is Weekly Daahira?</h2>
          <p className="mt-4 text-lg text-gray-600">
            A spiritual gathering dedicated to the recitation of Qasida, reflection, and community bonding through faith and devotion.
          </p>
        </motion.div>

        {/* 🔗 Objectives Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* ✅ Objective Cards */}
          {[
            {
              icon: <BookOpen size={40} className="text-gold" />,
              title: "Qasida Recitation",
              description: "Engage in rhythmic and collective recitation of Qasida poems."
            },
            {
              icon: <Users size={40} className="text-gold" />,
              title: "Community Bonding",
              description: "Strengthen ties through shared devotion and social engagement."
            },
            {
              icon: <Heart size={40} className="text-gold" />,
              title: "Spiritual Reflection",
              description: "Participate in reflections, dua, and dhikr to deepen spiritual connection."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#007676]">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DaahiraOverview;