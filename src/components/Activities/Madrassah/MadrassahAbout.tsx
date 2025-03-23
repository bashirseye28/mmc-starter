"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookQuran, faLanguage, faGlobe, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const MadrassahAbout = () => {
  return (
    <section id="about" className="bg-lightBg py-20">
      <div className="container mx-auto px-6">
        {/* ✅ Title & Intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary font-heading">
            About Our <span className="text-gold">Madrassah</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-4 max-w-3xl mx-auto">
            The MMC Madrassah provides a strong foundation in Islamic education, covering Qur’anic recitation, Arabic, and key Islamic teachings.
          </p>
        </motion.div>

        {/* ✅ Grid Layout for Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FontAwesomeIcon icon={feature.icon} className="text-gold text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-primary font-heading">{feature.title}</h3>
              <p className="text-darkText font-body mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ✅ Feature Data Array
const features = [
  {
    icon: faBookQuran,
    title: "Qur’anic Studies",
    description: "Mastering recitation, memorisation, and understanding of the Holy Qur’an.",
  },
  {
    icon: faLanguage,
    title: "Arabic Language",
    description: "Building fluency in Arabic for a deeper connection to Islamic teachings.",
  },
  {
    icon: faGlobe,
    title: "Islamic Studies",
    description: "Comprehensive lessons covering Hadith, Fiqh, and Muridiyya teachings.",
  },
  {
    icon: faGraduationCap,
    title: "Faith-Based Education",
    description: "Developing strong Islamic values in a nurturing learning environment.",
  },
];

export default MadrassahAbout;