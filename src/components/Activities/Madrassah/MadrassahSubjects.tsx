"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookQuran, faLanguage, faMosque, faFeather } from "@fortawesome/free-solid-svg-icons";

const subjects = [
  {
    title: "Qur’anic Studies",
    description: "Master recitation, Tajweed, and memorization (Hifz) of the Qur’an.",
    icon: faBookQuran,
  },
  {
    title: "Arabic Language",
    description: "Learn to read, write, and speak Arabic fluently for deeper understanding.",
    icon: faLanguage,
  },
  {
    title: "Islamic Studies",
    description: "Covering Fiqh, Hadith, Seerah, and fundamental Islamic teachings.",
    icon: faMosque,
  },
  {
    title: "Muridiyya Teachings",
    description: "Understanding the works and philosophy of Sheikh Ahmadou Bamba.",
    icon: faFeather,
  },
];

const MadrassahSubjects = () => {
  return (
    <section id="subjects" className="py-20 bg-gradient-to-b from-lightBg to-[#EAF4F4]">
      <div className="container mx-auto px-6 text-center">
        
        {/* ✅ Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary font-heading">
            Subjects & <span className="text-gold">Curriculum</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-2xl mx-auto">
            A holistic education covering both spiritual and academic growth.
          </p>
        </motion.div>

        {/* ✅ Subjects Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* ✅ Floating Icon */}
              <div className="absolute -top-8 bg-gold p-4 rounded-full shadow-md">
                <FontAwesomeIcon icon={subject.icon} className="text-white text-3xl" />
              </div>

              {/* ✅ Text Content */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-primary font-heading">{subject.title}</h3>
                <p className="text-darkText font-body mt-3">{subject.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MadrassahSubjects;