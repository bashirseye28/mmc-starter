"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart } from "lucide-react";

const DaahiraSoxnaHero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center bg-black">
      {/* ✅ Background Image with Lazy Loading */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg" // ✅ Use optimized WebP format for performance
          alt="Women gathering at Daahira Soxna Diarra for worship"
          fill
          className="object-cover"
          quality={90}
          priority // ✅ Preload hero image for better LCP
        />
      </div>

      {/* ✅ Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* ✅ Hero Content */}
      <motion.div
        className="relative z-10 max-w-4xl text-white px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* ✅ Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight font-heading">
          <span className="text-gold">Empowering Women</span> <br className="hidden sm:block" />
          Through Faith & Unity
        </h1>

        {/* ✅ Supporting Text */}
        <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto font-body">
          Join <span className="text-gold font-semibold">Daahira Soxna Diarra</span> in strengthening 
          our community through <strong>faith, charity, and sisterhood.</strong>
        </p>

        {/* ✅ CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Join Us Button */}
          <Link href="/contact">
            <motion.button
              className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md transition-all 
              hover:shadow-lg hover:bg-[#d4af37] focus:ring focus:ring-gold focus:ring-opacity-50 
              flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5" /> Join the Sisterhood
            </motion.button>
          </Link>

          {/* Learn More Button */}
          <Link href="#mission">
            <motion.button
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg shadow-md transition-all 
              hover:bg-primary hover:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 
              flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" /> Learn More
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default DaahiraSoxnaHero;