"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHandsHelping } from "@fortawesome/free-solid-svg-icons";

const KstCTA = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-primary via-[#005a5a] to-primary-dark text-white">
      {/* ✅ Wave Separator (Optional) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="white"
          />
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
          Be Part of <span className="text-gold">KST’s Legacy</span>
        </h2>

        {/* ✅ Description */}
        <p className="text-lg text-gray-200 font-body max-w-3xl mx-auto mb-6">
          Your contribution helps build a spiritual home for future generations. 
          Support <span className="text-gold font-semibold">Keur Serigne Touba</span> today and leave a lasting impact on the Murid community.
        </p>

        {/* ✅ CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* Donate Button */}
          <Link href="/donate">
            <motion.button
              className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:bg-[#d4af37] transition flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 14px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faHeart} />
              Donate Now
            </motion.button>
          </Link>

          {/* Volunteer Button */}
          <Link href="/volunteer">
            <motion.button
              className="px-6 py-3 border-2 border-gold text-white font-semibold rounded-lg hover:bg-primary hover:text-white transition shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 14px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faHandsHelping} />
              Become a Volunteer
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* ✅ Wave Separator (Optional) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default KstCTA;