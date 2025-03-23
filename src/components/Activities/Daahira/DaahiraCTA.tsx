"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart } from "@fortawesome/free-solid-svg-icons";

const DaahiraCTA = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-primary via-[#005a5a] to-primary-dark text-white">
      {/* ✅ Wave Separator (Top) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      {/* ✅ CTA Content */}
      <motion.div
        className="container mx-auto px-6 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ✅ Title */}
        <h2 className="text-4xl font-bold font-heading mb-4">
          Be Part of <span className="text-gold">Our Daahira Gatherings</span>
        </h2>

        {/* ✅ Description */}
        <p className="text-lg text-gray-200 font-body max-w-3xl mx-auto mb-6">
          Join our weekly Daahira sessions, immerse yourself in 
          <span className="text-gold font-semibold"> Xassida recitations</span>, and strengthen your spiritual connection.
        </p>

        {/* ✅ CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* Join Button */}
          <Link href="/activities/daahira#register">
            <motion.button
              className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:bg-[#d4af37] transition flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 14px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faUsers} />
              Join Now
            </motion.button>
          </Link>

          {/* Donate Button */}
          <Link href="/donate">
            <motion.button
              className="px-6 py-3 border-2 border-gold text-white font-semibold rounded-lg hover:bg-primary hover:text-white transition shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 14px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faHeart} />
              Donate & Support
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* ✅ Wave Separator (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default DaahiraCTA;