"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const ContactHero = () => {
  return (
    <section className="relative w-full min-h-[400px] flex items-center justify-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg" // Replace with actual image
          alt="Contact MMC"
          layout="fill"
          objectFit="cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-2xl text-white px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Get in Touch with <span className="text-gold">MMC</span>
        </h1>
        <p className="mt-4 text-sm sm:text-lg">
          Whether you have a question, need assistance, or want to visit, we’re here to help.
        </p>

        {/* Call-to-Action Button */}
        <div className="mt-6">
          <Link href="#contact-form">
            <button className="px-6 py-3 w-44 text-center bg-gold text-black font-semibold rounded-lg shadow-md transition duration-300 hover:bg-yellow-500">
              Send a Message
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactHero;