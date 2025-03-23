"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faEnvelope, faChalkboardTeacher, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const steps = [
  {
    icon: faClipboardList,
    title: "Step 1: Fill Out the Registration Form",
    description: "Complete the online registration form with your details to enroll in the Madrassah.",
  },
  {
    icon: faEnvelope,
    title: "Step 2: Receive Confirmation",
    description: "After submitting your application, you will receive a confirmation email with further instructions.",
  },
  {
    icon: faChalkboardTeacher,
    title: "Step 3: Attend Orientation",
    description: "Join us for an orientation session to meet the teachers and learn about our curriculum.",
  },
  {
    icon: faBookOpen,
    title: "Step 4: Start Learning",
    description: "Once orientation is completed, you are officially a student! Begin your journey with us.",
  },
];

const MadrassahEnroll = () => {
  return (
    <section id="enroll" className="py-24 bg-gradient-to-b from-lightBg to-[#EAF4F4]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* 🏆 Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-extrabold text-primary font-heading">
            How to <span className="text-gold">Enroll</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-4 max-w-3xl mx-auto leading-relaxed">
            Follow these simple steps to register for the Madrassah and begin your Islamic education.
          </p>
        </motion.div>

        {/* ⭐ Timeline Steps */}
        <motion.div
          className="relative border-l-4 border-primary pl-10 space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
              whileHover={{ scale: 1.02 }}
            >
              {/* ✅ Floating Icon */}
              <div className="absolute -left-6 top-6 w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full shadow-md">
                <FontAwesomeIcon icon={step.icon} className="text-xl" />
              </div>

              <h3 className="text-xl font-semibold text-primary font-heading">{step.title}</h3>
              <p className="text-darkText font-body mt-2">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 🏆 CTA Button */}
        <div className="text-center mt-12">
          <Link href="#register">
            <button className="px-8 py-4 text-white font-semibold bg-primary rounded-lg shadow-md hover:bg-[#005e5e] transition text-lg">
              Register Now
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default MadrassahEnroll;