"use client";

import { motion } from "framer-motion";
import { Lightbulb, Globe } from "lucide-react";

const MissionVision = () => {
  return (
    <section id="mission"
      className="relative py-20 text-white"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/green.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-[#f5c907]">Our Mission & Vision</h2>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Strengthening faith, unity, and service by following the teachings of Cheikh Ahmadou Bamba.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Mission Section */}
          <motion.div
            className="p-8 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-lg transition duration-300 hover:bg-opacity-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-[#f5c907] flex items-center gap-3">
              <Lightbulb size={30} /> Our Mission
            </h3>
            <p className="text-lg text-gray-300 mt-4 leading-relaxed">
              To strengthen faith, unity, and service by following the teachings of Cheikh Ahmadou Bamba, 
              fostering spiritual growth, community support, and charitable work.
            </p>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            className="p-8 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-lg transition duration-300 hover:bg-opacity-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-[#f5c907] flex items-center gap-3">
              <Globe size={30} /> Our Vision
            </h3>
            <p className="text-lg text-gray-300 mt-4 leading-relaxed">
              A united Murid community that preserves Islamic teachings, supports those in need, and 
              inspires the next generation to uphold the values of peace, devotion, and selflessness.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;