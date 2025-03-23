"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const ViewJaayanteTiers = () => {
  return (
    <section id="jaayante-tiers" className="py-20 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* ✅ Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-primary font-heading">
            Donate via <span className="text-gold">Jaayante Tiers</span>
          </h2>
          <p className="text-lg text-gray-700 font-body mt-3 max-w-3xl mx-auto">
            Choose from our structured donation tiers and become a part of Keur Serigne Touba’s legacy.
          </p>
        </motion.div>

        {/* ✅ Jaayante Redirect CTA */}
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link href="/activities/kst#donation-tiers">
            <motion.button
              className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-[#d4af37] transition shadow-lg text-lg flex items-center justify-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faHandHoldingHeart} className="text-xl" />
              View Jaayante Tiers & Donate
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ViewJaayanteTiers;