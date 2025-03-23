"use client";

import { motion } from "framer-motion";
import { HardHat, BookOpen, Heart } from "lucide-react";

const SpiritOfBaayFaal = () => {
  return (
    <section id="spirit-of-baayfaal" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        {/* ✅ Heading */}
        <motion.h2
          className="text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The <span className="text-yellow-500">Spirit of Baay Faal</span>
        </motion.h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          The Baay Faal way of life is built on three foundational principles: 
          <strong> hard work</strong>, <strong>spiritual devotion</strong>, and <strong>community service</strong>.
        </p>

        {/* ✅ Three Core Values (Cards) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ⭐ Hard Work */}
          <motion.div
            className="p-6 bg-gray-100 rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-yellow-500 hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <HardHat size={50} className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-primary mt-4">Hard Work (Jëf Jël)</h3>
            <p className="text-gray-600 mt-2">
              Dedication to labor as a form of worship, aligning with the teachings of Sheikh Ahmadou Bamba.
            </p>
          </motion.div>

          {/* 📖 Spiritual Devotion */}
          <motion.div
            className="p-6 bg-gray-100 rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-yellow-500 hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen size={50} className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-primary mt-4">Spiritual Devotion</h3>
            <p className="text-gray-600 mt-2">
              Deep commitment to prayer, dhikr, and remembrance of Allah as a daily practice.
            </p>
          </motion.div>

          {/* ❤️ Community Service */}
          <motion.div
            className="p-6 bg-gray-100 rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-yellow-500 hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <Heart size={50} className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-primary mt-4">Community Service</h3>
            <p className="text-gray-600 mt-2">
              Helping those in need through charitable actions and selfless service to others.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpiritOfBaayFaal;