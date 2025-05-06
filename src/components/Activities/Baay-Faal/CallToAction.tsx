"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section
      className="relative py-24 bg-gradient-to-r from-lightBg to-white text-center"
    >
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* ✅ Heading */}
        <motion.h2
          className="text-4xl font-bold text-primary font-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to Join <span className="text-gold">Ahlu Baay Faal?</span>
        </motion.h2>

        {/* ✅ Subheading */}
        <p className="text-lg text-darkText font-body mt-4">
          Take the next step and become part of our growing community of faith, service, and brotherhood.
        </p>

        {/* ✅ CTA Button */}
        <div className="mt-8">
          <Link href="/volunteer">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-[#e6b800] transition shadow-lg text-lg"
            >
              Get Involved
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;