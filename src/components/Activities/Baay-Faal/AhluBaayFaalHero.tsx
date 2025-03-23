"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AhluBaayFaalHero = () => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center text-center">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Ahlu Baay Faal Gathering"
          layout="fill"
          objectFit="cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-4xl px-6 text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-yellow-500">Ahlu Baay Faal</span> – A Brotherhood of Faith & Service
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Strengthening our connection to Islam through work, worship, and devotion.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <Link href="#who-are-baayfaal">
            <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition">
              Learn more
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default AhluBaayFaalHero;