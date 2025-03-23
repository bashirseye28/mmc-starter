"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

// ✅ Modal Animation Variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const DaahiraRegister = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ CTA Section */}
      <section className="py-16 bg-gradient-to-b from-primary to-primary-dark text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2 font-heading">
            <FontAwesomeIcon icon={faUserPlus} className="text-gold" />
            <span>Join Our Daahira</span>
          </h2>
          <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto font-body">
            Be a part of our <span className="font-semibold">weekly spiritual gatherings</span>. 
            Strengthen your faith, participate in Dhikr, and connect with our community.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition shadow-lg text-lg"
          >
            Register Now
          </button>
        </motion.div>
      </section>

      {/* ✅ Registration Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl"
          >
            {/* ✅ Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-2xl font-bold text-primary font-heading">Daahira Registration</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            {/* ✅ Embedded JotForm */}
            <div className="w-full h-[600px]">
              <iframe
                src="https://form.jotform.com/233294488558371"
                title="Daahira Registration Form"
                className="w-full h-full rounded-lg border-2 border-primary"
              />
            </div>

            {/* ✅ Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#005a5a] transition text-lg"
            >
              Close
            </button>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
};

export default DaahiraRegister;