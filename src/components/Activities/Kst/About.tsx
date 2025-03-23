"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque, faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";

const AboutKst = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        
        {/* ✅ Section Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">About</span> <span className="text-primary">Keur Serigne Touba</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            The Keur Serigne Touba (KST) Islamic Centre is a long-term vision of the Manchester Murid Community (MMC) 
            to establish a dedicated space for worship, education, and community engagement.
          </p>
        </motion.div>

        {/* ✅ Key Highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* 🕌 Place of Worship */}
          <div className="bg-lightBg p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <FontAwesomeIcon icon={faMosque} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary font-heading">A Place of Worship</h3>
            <p className="text-darkText font-body mt-2">
              A permanent prayer hall to accommodate our growing community for daily and Jumu'ah prayers.
            </p>
          </div>

          {/* 📖 Learning Centre */}
          <div className="bg-lightBg p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <FontAwesomeIcon icon={faBookOpen} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary font-heading">Islamic Learning Centre</h3>
            <p className="text-darkText font-body mt-2">
              A Daara & Madrassah for Qur’anic studies, Arabic learning, and Murid teachings for all ages.
            </p>
          </div>

          {/* 🤝 Community Hub */}
          <div className="bg-lightBg p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <FontAwesomeIcon icon={faUsers} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary font-heading">A Community Hub</h3>
            <p className="text-darkText font-body mt-2">
              A venue for social services, interfaith dialogues, and Murid cultural events to unite the community.
            </p>
          </div>
        </motion.div>

        {/* ✅ Featured Quote */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-gold to-primary text-white px-8 py-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-lg font-body italic leading-relaxed">
            "Strive to serve both your faith and your community with sincerity, for in unity and devotion lies true success."
          </p>
          <p className="text-lg font-heading font-semibold mt-3">— Sheikh Ahmadou Bamba</p>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutKst;