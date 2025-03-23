"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  ctaPrimaryIcon?: React.ReactNode;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  ctaSecondaryIcon?: React.ReactNode;
  quote?: string;
  quoteAuthor?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  highlight,
  subtitle,
  image,
  ctaText,
  ctaLink,
  ctaPrimaryIcon,
  ctaSecondaryText,
  ctaSecondaryLink,
  ctaSecondaryIcon,
  quote,
  quoteAuthor,
}) => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center text-center">
      {/* ✅ Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
          quality={85}
          className="w-full h-full"
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          <span className="text-gold">{highlight} </span> {title}
        </h1>
        <p className="mt-4 text-sm sm:text-lg md:text-xl text-gray-300">{subtitle}</p>

        {/* ✅ CTA Buttons */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {ctaText && ctaLink && (
            <Link href={ctaLink} className="inline-flex">
              <button className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition flex items-center gap-2">
                {ctaPrimaryIcon} {ctaText}
              </button>
            </Link>
          )}
          {ctaSecondaryText && ctaSecondaryLink && (
            <Link href={ctaSecondaryLink} className="inline-flex">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition flex items-center gap-2">
                {ctaSecondaryIcon} {ctaSecondaryText}
              </button>
            </Link>
          )}
        </div>

        {/* ✅ Optional Quote */}
        {quote && quoteAuthor && (
          <div className="mt-6 text-gray-300 italic text-sm sm:text-md max-w-lg">
            <p>“{quote}”</p>
            <p className="font-semibold mt-2">– {quoteAuthor}</p>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;