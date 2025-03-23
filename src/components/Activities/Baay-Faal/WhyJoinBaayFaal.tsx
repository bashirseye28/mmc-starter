"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsPraying, faUsers, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const WhyJoinBaayFaal = () => {
  return (
    <section id="why-join" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        
        {/* ✅ Heading */}
        <motion.h2
          className="text-4xl font-heading font-bold text-primary"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Why Join <span className="text-gold">Ahlu Baay Faal?</span>
        </motion.h2>
        <p className="text-lg text-darkText font-body mt-4 max-w-2xl mx-auto">
          Become part of a movement that nurtures <strong>spirituality, unity, and service.</strong>
        </p>

        {/* ✅ Three Benefit Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 🕌 Spiritual Growth */}
          <motion.div
            className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center text-center border-t-4 border-gold hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faHandsPraying} size="3x" className="text-primary" />
            <h3 className="text-xl font-semibold text-primary font-heading mt-4">Spiritual Growth</h3>
            <p className="text-darkText font-body mt-2">
              Strengthen your <strong>faith</strong> through devotion, prayer, and the teachings of Sheikh Ahmadou Bamba.
            </p>
          </motion.div>

          {/* 🤝 Brotherhood & Community */}
          <motion.div
            className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center text-center border-t-4 border-gold hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faUsers} size="3x" className="text-primary" />
            <h3 className="text-xl font-semibold text-primary font-heading mt-4">Brotherhood & Community</h3>
            <p className="text-darkText font-body mt-2">
              Be part of a <strong>strong, supportive</strong> family that shares your values and beliefs.
            </p>
          </motion.div>

          {/* ❤️ Service & Purpose */}
          <motion.div
            className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center text-center border-t-4 border-gold hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} size="3x" className="text-primary" />
            <h3 className="text-xl font-semibold text-primary font-heading mt-4">Service & Purpose</h3>
            <p className="text-darkText font-body mt-2">
              Make a difference by serving your <strong>community</strong> through selfless work and charity.
            </p>
          </motion.div>
        </div>

        {/* ✅ Call-to-Action Button */}
        <div className="mt-10">
          <Link href="/volunteer">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-[#e6b800] transition shadow-lg text-lg"
            >
              Join Us Today
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyJoinBaayFaal;