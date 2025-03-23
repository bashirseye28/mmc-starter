"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const FeaturedQuote = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#EAF4F4] to-[#F8F8F8]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        
        {/* ✅ Section Header */}
        <motion.h2
          className="text-4xl font-bold text-primary font-heading mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          A Gathering of <span className="text-gold">Light & Blessings</span>
        </motion.h2>

        {/* ✅ Quote Box */}
        <motion.div
          className="relative bg-white border-2 border-gold shadow-lg rounded-lg p-8 text-xl text-darkText font-body italic leading-relaxed"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FontAwesomeIcon icon={faQuoteLeft} className="absolute top-5 left-5 text-gold text-3xl" />
          <p className="px-6">
            "When believers gather in remembrance of Allah, the angels surround them, 
            divine mercy descends upon them, and Allah mentions them among His noble assembly."
          </p>
          <FontAwesomeIcon icon={faQuoteRight} className="absolute bottom-5 right-5 text-gold text-3xl" />
        </motion.div>

        {/* ✅ Attribution */}
        <motion.p
          className="text-lg text-gray-700 font-body mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          — Hadith of the Prophet Muhammad (SAW)
        </motion.p>
      </div>
    </section>
  );
};

export default FeaturedQuote;