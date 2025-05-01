"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faUsers, faHandHoldingHeart, faUtensils, faHandsPraying, faMosque, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "@headlessui/react";

// 🔹 Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

// 🔹 List of Features
const features = [
  { icon: faBookOpen, title: "Qur’an & Qasida Recitations", description: "Strengthen faith through sacred verses and Sheikh Ahmadou Bamba’s teachings." },
  { icon: faHandsPraying, title: "Group Dhikr", description: "A collective remembrance of Allah, bringing peace to the heart and mind." },
  { icon: faUsers, title: "Islamic Discussions", description: "Deepen knowledge with reflections on Islamic teachings and Muridiyya history." },
  { icon: faHandHoldingHeart, title: "Brotherhood & Community", description: "Build lifelong bonds with fellow Murids in a nurturing environment." },
  { icon: faUtensils, title: "Sharing a Meal Together", description: "Strengthening unity through the tradition of communal dining." },
  { icon: faMosque, title: "Spiritual Growth", description: "A sacred space for prayer, reflection, and moral upliftment." },
];

const WhyJoinDaahira = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-lightBg" id="why-join">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* ✅ Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-primary font-heading">
            Why Join the <span className="text-gold">Daahira</span>?
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-2xl mx-auto">
            Be part of a spiritual community that fosters faith, brotherhood, and knowledge through weekly gatherings.
          </p>
        </motion.div>

        {/* ✅ Features Grid (6 Cards) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-200 flex flex-col items-center text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-primary text-white rounded-full shadow-md mb-4">
                <FontAwesomeIcon icon={feature.icon} size="2x" />
              </div>
              <h3 className="text-xl font-semibold text-primary font-heading">{feature.title}</h3>
              <p className="text-darkText font-body mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Centered Call-to-Action Button */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-12 flex justify-center items-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-[#d4af37] transition flex items-center gap-2 shadow-md"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            Join Our Daahira
          </button>
        </motion.div>

        {/* ✅ Registration Modal */}
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }}
              className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl"
            >
              {/* ✅ Modal Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-2xl font-bold text-primary">Daahira Registration</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-red-600 transition"
                >
                  ✖
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
                onClick={() => setIsModalOpen(false)}
                className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#005a5a] transition"
              >
                Close
              </button>
            </motion.div>
          </div>
        </Dialog>

      </div>
    </section>
  );
};

export default WhyJoinDaahira;