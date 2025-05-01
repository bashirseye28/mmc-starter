"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faUsers, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const KureelCTA = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-primary via-[#005a5a] to-primary-dark text-white">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      <motion.div
        className="container mx-auto px-6 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold font-heading mb-4">
          Elevate Your Faith with <span className="text-gold">Kureel Qasida</span>
        </h2>
        <p className="text-lg text-gray-200 font-body max-w-3xl mx-auto mb-6">
          Discover the power of <strong>Qasida recitations</strong> and connect with the Murid spiritual tradition.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/library/xassida">
            <motion.button
              className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:bg-[#d4af37] transition flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faBookOpen} />
              Explore Qasidas
            </motion.button>
          </Link>

          <Link href="/activities/kureel#schedule">
            <motion.button
              className="px-6 py-3 border-2 border-gold text-white font-semibold rounded-lg hover:bg-primary hover:text-white transition shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              View Schedule
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-gold hover:text-black transition shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faUsers} />
              Join the Community
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default KureelCTA;