"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SuccessPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-lg p-10 rounded-lg text-center max-w-lg border border-gray-300">
        
        {/* ✅ Animated Success Checkmark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-gold"
        >
          <FontAwesomeIcon icon={faCheckCircle} className="text-6xl" />
        </motion.div>

        {/* ✅ Thank You Message */}
        <h1 className="text-3xl font-bold text-primary mt-4">
          Thank You for Your <span className="text-gold">Generosity</span>
        </h1>
        <p className="text-gray-600 mt-3 leading-relaxed">
          Your generosity helps us build 
          <span className="text-gold font-semibold"> Keur Serigne Touba (KST)</span> —
          a permanent center for faith, education, and community service.
        </p>

        {/* ✅ Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* ✅ Next Actions */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-darkPrimary transition flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faArrowLeft} />
              Return to Home
            </button>
          </Link>

          <Link href="/donate">
            <button className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition flex items-center justify-center gap-2">
              Donate Again
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessPage;