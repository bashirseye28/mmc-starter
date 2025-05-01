"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMosque,
  faBookOpen,
  faHandsHelping,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const focusAreas = [
  {
    title: "Spiritual Growth",
    description:
      "Strengthening faith through weekly Daahira gatherings, Qasida recitations, and Islamic discussions.",
    icon: faMosque,
  },
  {
    title: "Education",
    description:
      "Providing structured Daara (Madrassah) classes for all ages, focusing on Qur’anic studies, Arabic, and Islamic teachings.",
    icon: faBookOpen,
  },
  {
    title: "Community",
    description:
      "Fostering a strong, connected community through cultural engagement and charitable initiatives.",
    icon: faHandsHelping,
  },
  {
    title: "Cultural Preservation",
    description:
      "Honoring Murid heritage through Kureel chanting sessions, special events, and interfaith engagement.",
    icon: faUsers,
  },
];

const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary leading-tight">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            The Manchester Murid Community (MMC) is a registered charity in England and Wales (Charity No: 1194666). Dedicated to preserving Murid traditions, fostering spiritual growth, and serving the community through faith, education, and charity.
          </p>
        </motion.div>

        {/* Focus Areas - Four Columns on Desktop, Two on Tablets, One on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 shadow-md rounded-xl p-8 text-center border border-gray-200 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary text-white shadow-md">
                <FontAwesomeIcon icon={area.icon} size="2x" />
              </div>
              <h3 className="text-xl font-semibold text-primary mt-4">
                {area.title}
              </h3>
              <p className="text-gray-600 mt-3">{area.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/about"
            className="px-6 py-3 text-white font-semibold bg-primary rounded-lg shadow-lg hover:bg-gold transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;