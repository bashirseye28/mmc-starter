// src/components/Donate/WhyDonate.tsx
"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque, faBookOpen, faUtensils } from "@fortawesome/free-solid-svg-icons";

const impactAreas = [
  {
    icon: faMosque,
    title: "Keur Serigne Touba (KST) Centre Project",
    description: "Supporting the development of a dedicated space for worship, education, and community programs.",
  },
  {
    icon: faBookOpen,
    title: "Education & Madrassah",
    description: "Helping students receive Qur'anic education, Arabic studies, and Murid teachings.",
  },
  {
    icon: faUtensils,
    title: "Charity & Welfare Programs",
    description: "Providing meals and essential support to those in need through our social welfare initiatives.",
  },
];

const WhyDonate = () => {
  return (
    <section id="why-donate" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        
        {/* Section Heading */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold font-heading text-primary">
            Why <span className="text-gold">Your Donation Matters</span>
          </h2>
          <p className="text-lg text-gray-700 font-body mt-3 max-w-3xl mx-auto">
            Your generosity fuels education, charity, and community development.
          </p>
        </motion.header>

        {/* Impact Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactAreas.map((area, index) => (
            <motion.article
              key={index}
              className="p-8 bg-lightBg rounded-lg shadow-lg hover:shadow-xl transition text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <FontAwesomeIcon
                icon={area.icon}
                className="text-gold text-4xl mb-4"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">{area.title}</h3>
              <p className="text-gray-700 text-sm">{area.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;