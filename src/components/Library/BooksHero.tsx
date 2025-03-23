"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BooksHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
}

const BooksHero: React.FC<BooksHeroProps> = ({ title, highlight, subtitle }) => {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center text-center bg-gray-900">
      {/* ✅ Background Image + Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-books.jpg" // 🔹 Use a dedicated Books Page background
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* ✅ Hero Content */}
      <motion.div
        className="relative z-10 px-6 text-white flex flex-col items-center max-w-[90%] sm:max-w-3xl md:max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* ✅ Title & Subtitle */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          <span className="text-gold">{highlight} </span> {title}
        </h1>
        <p className="mt-4 text-sm sm:text-lg md:text-xl text-gray-300">{subtitle}</p>
      </motion.div>
    </section>
  );
};

export default BooksHero;