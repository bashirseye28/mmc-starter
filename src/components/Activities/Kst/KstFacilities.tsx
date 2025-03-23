"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMosque,
  faBookOpen,
  faUtensils,
  faUsers,
  faBuildingColumns,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const facilities = [
  {
    icon: faMosque,
    title: "Prayer Hall",
    description: "A dedicated space for daily prayers, Jumu’ah, and special religious gatherings.",
  },
  {
    icon: faBookOpen,
    title: "Islamic School (Madrassah)",
    description: "Qur’anic education, Arabic language classes, and Murid teachings for all ages.",
  },
  {
    icon: faBuildingColumns,
    title: "Library & Research Centre",
    description: "A resource hub for Murid literature, Islamic teachings, and scholarly research.",
  },
  {
    icon: faUtensils,
    title: "Community Kitchen & Welfare",
    description: "Providing meals and support programs for those in need.",
  },
  {
    icon: faUsers,
    title: "Event & Conference Hall",
    description: "A space for Murid cultural events, interfaith dialogues, and community engagement.",
  },
  {
    icon: faDumbbell,
    title: "Youth & Sports Facilities",
    description: "Engaging the youth through fitness programs, mentorship, and leadership development.",
  },
];

const KstFacilities = () => {
  return (
    <section id="kst-facilities" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl text-center">

        {/* ✅ Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">KST</span> <span className="text-primary">Facilities & Services</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            KST will offer a range of essential services and facilities to serve the Murid community in Manchester and beyond.
          </p>
        </motion.div>

        {/* ✅ Facilities Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              className="bg-lightBg p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition border border-gray-200"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <FontAwesomeIcon icon={facility.icon} className="text-gold text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-primary font-heading">{facility.title}</h3>
              <p className="text-darkText font-body mt-2">{facility.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default KstFacilities;