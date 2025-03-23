"use client";
import React from "react";
import { BookOpen, Globe, Users, Handshake, Heart, Star } from "lucide-react"; // Gold Icons
import { motion } from "framer-motion";

const values = [
  {
    title: "Knowledge (Ilm)",
    description:
      "Seeking and applying both religious and worldly knowledge to achieve wisdom and spiritual growth.",
    icon: <BookOpen size={40} className="text-[#f5c907]" />, // Gold Color
  },
  {
    title: "Worship (Ibadah)",
    description:
      "Engaging in prayers, dhikr, and acts of sincerity, making every action a form of worship.",
    icon: <Globe size={40} className="text-[#f5c907]" />,
  },
  {
    title: "Good Conduct (Akhlaq)",
    description:
      "Living with honesty, humility, patience, and respect, following the moral example of Cheikh Ahmadou Bamba.",
    icon: <Users size={40} className="text-[#f5c907]" />,
  },
  {
    title: "Service (Khidma)",
    description:
      "Helping those in need through selfless service, charity projects, and community support.",
    icon: <Handshake size={40} className="text-[#f5c907]" />,
  },
  {
    title: "Unity & Brotherhood",
    description:
      "Creating a supportive and united Murid community that works together in faith and action.",
    icon: <Heart size={40} className="text-[#f5c907]" />,
  },
  {
    title: "Respect & Inclusion",
    description:
      "Ensuring every member feels valued, regardless of background, ethnicity, or status.",
    icon: <Star size={40} className="text-[#f5c907]" />,
  },
];

const ValuesSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      {/* Heading */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-[#007676]">
          Our Values & Philosophy
        </h2>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          MMC is guided by the teachings of Cheikh Ahmadou Bamba and the Murid
          Sufi tradition, fostering faith, knowledge, and unity.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {values.map((value, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Icon */}
            <div className="mb-4">{value.icon}</div>
            {/* Title */}
            <h3 className="text-xl font-semibold text-[#007676]">
              {value.title}
            </h3>
            {/* Description */}
            <p className="text-gray-600 mt-2 text-sm">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;