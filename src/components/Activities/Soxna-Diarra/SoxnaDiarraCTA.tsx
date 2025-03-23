"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";

const SoxnaDiarraCTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-16 bg-gradient-to-b from-primary via-[#005a5a] to-primary-dark text-white">
      {/* ✅ Wave Separator (Top) */}
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
        {/* ✅ Title */}
        <h2 className="text-4xl font-bold font-heading mb-4">
          Get Involved with <span className="text-gold">Daahira Soxna Diarra</span>
        </h2>

        {/* ✅ Description */}
        <p className="text-lg text-gray-200 font-body max-w-3xl mx-auto mb-6">
          Join our growing network of dedicated women, participate in spiritual gatherings, and support charitable initiatives.
        </p>

        {/* ✅ CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* Join Now Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:bg-[#d4af37] transition flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            Join Now
          </button>

          {/* Donate Button */}
          <a
            href="/donate"
            className="px-6 py-3 border-2 border-gold text-white font-semibold rounded-lg hover:bg-primary hover:text-white transition shadow-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faHeart} />
            Donate & Support
          </a>
        </div>
      </motion.div>

      {/* ✅ Wave Separator (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      {/* ✅ Registration Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl"
          >
            {/* ✅ Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-2xl font-bold text-primary">Join Daahira Soxna Diarra</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            {/* ✅ Embedded Form */}
            <div className="w-full h-[600px]">
              <iframe
                src="https://form.jotform.com/233294488558371"
                title="Soxna Diarra Registration Form"
                className="w-full h-full rounded-lg border-2 border-primary"
              />
            </div>

            {/* ✅ Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#005a5a] transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      </Dialog>
    </section>
  );
};

export default SoxnaDiarraCTA;