"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { UserPlus, X } from "lucide-react";

// ✅ Modal Animation Variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const MadrassahRegister = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Enroll Now Section */}
      <section id="register" className="py-16 bg-primary text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold font-heading mb-4 flex items-center justify-center gap-2">
            <UserPlus size={32} className="text-gold" /> Enroll in Our Madrassah
          </h2>
          <p className="text-lg text-gray-200 font-body mb-6 max-w-2xl mx-auto">
            Secure your child’s spot in our Madrassah today and begin their journey in Islamic learning.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            Enroll Now
          </button>
        </motion.div>
      </section>

      {/* ✅ Registration Form Modal */}
      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl relative"
            >
              {/* ✅ Modal Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-2xl font-bold text-primary font-heading">Madrassah Registration</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-red-600 transition"
                  aria-label="Close Modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* ✅ Embedded JotForm Using IFRAME */}
              <div className="w-full h-[600px]">
                <iframe
                  src="https://form.jotform.com/241338964351359"
                  title="Madrassah Registration Form"
                  className="w-full h-full rounded-lg border-2 border-primary"
                  aria-hidden="false"
                />
              </div>

              {/* ✅ Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-[#005a5a] transition"
              >
                Close
              </button>
            </motion.div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MadrassahRegister;