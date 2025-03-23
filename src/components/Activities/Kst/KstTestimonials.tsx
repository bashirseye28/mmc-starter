"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque, faBookOpen, faHandshake, faHandsHelping } from "@fortawesome/free-solid-svg-icons";

const WhyKstMatters = () => {
  return (
    <section id="why-kst-matters" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-6xl text-center">

        {/* ✅ Section Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">Why</span> <span className="text-primary">KST Matters</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            KST is more than just a building. It is a vision for the Murid community, ensuring that faith, 
            education, and unity continue to thrive in Manchester for generations to come.
          </p>
        </motion.div>

        {/* ✅ Key Problem & Solution Highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* 🕌 Masjid & Prayer Hall */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition border border-gray-200">
            <FontAwesomeIcon icon={faMosque} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary font-heading">A Place of Worship</h3>
            <p className="text-darkText font-body mt-2">
              A dedicated masjid where the Murid community can gather for daily prayers, Jumu’ah, and special religious events.
            </p>
          </div>

          {/* 📖 Education & Daara Classes */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition border border-gray-200">
            <FontAwesomeIcon icon={faBookOpen} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary font-heading">Islamic Education</h3>
            <p className="text-darkText font-body mt-2">
              A Daara for Qur’anic learning, Arabic studies, and Islamic teachings to nurture young and old alike.
            </p>
          </div>

          {/* 🤝 Community Events & Services */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition border border-gray-200">
            <FontAwesomeIcon icon={faHandshake} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary font-heading">Community Engagement</h3>
            <p className="text-darkText font-body mt-2">
              A space for Murid gatherings, interfaith dialogues, and cultural events that bring people together.
            </p>
          </div>

          {/* 👐 Charity & Social Services */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition border border-gray-200">
            <FontAwesomeIcon icon={faHandsHelping} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary font-heading">Social Services</h3>
            <p className="text-darkText font-body mt-2">
              A base for food distribution, welfare programs, and supporting those in need through Murid values of service.
            </p>
          </div>
        </motion.div>

        {/* ✅ Inspirational Quote */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-gold to-primary text-white px-8 py-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-lg font-body italic leading-relaxed">
            &quot;A community without a centre is like a body without a soul. Let us build KST together and strengthen our faith for generations to come.&quot;
          </p>
          <p className="text-lg font-heading font-semibold mt-3">— Manchester Murid Community</p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyKstMatters;
