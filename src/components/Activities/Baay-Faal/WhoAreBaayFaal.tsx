"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WhoAreBaayFaal = () => {
  return (
    <section id="who-are-baayfaal" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row items-center gap-12">
        
        {/* ✅ Left Side - Image (Now Adjusted for Full Head Visibility) */}
        <motion.div
          className="relative w-full lg:w-1/2 h-[500px] rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/baay-faal.png"
            alt="Baay Faal History"
            layout="fill"
            objectFit="cover"
            objectPosition="top"  // 👈 This ensures the head is visible
            priority
          />
        </motion.div>

        {/* ✅ Right Side - Text Content */}
        <motion.div
          className="lg:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary">
            Who Are the <span className="text-yellow-500">Ahlu Baay Faal?</span>
          </h2>
          <p className="text-lg text-gray-700">
            Ahlu Baay Faal is a spiritual brotherhood within the Muridiyya movement, emphasizing 
            <strong> service, devotion, and humility</strong>. Inspired by the teachings of Sheikh Ahmadou Bamba, 
            Baay Faal members dedicate themselves to <strong> hard work and selfless service</strong> in pursuit of spiritual enlightenment.
          </p>
          <p className="text-lg text-gray-700">
            The community embraces <strong>a simple lifestyle</strong>, guided by values of 
            <strong> faith, solidarity, and discipline</strong>, strengthening their connection to Islam through 
            <strong> acts of devotion and remembrance</strong>.
          </p>

          {/* ✅ Callout Box with Quote */}
          <div className="p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-yellow-700 italic">
              "Work as if you will never die, and worship as if you will die tomorrow."
            </p>
            <p className="text-sm font-medium text-gray-600 mt-2">– A Muslim Savant</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoAreBaayFaal;