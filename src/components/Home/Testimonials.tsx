"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/data/TestimonialsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const nextTestimonial = () => setCurrent((prev) => (prev + 1) % total);
  const prevTestimonial = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section id="testimonials" className="py-16 bg-lightBg">
      <div className="container mx-auto px-6 text-center">
        {/* ✅ Section Heading */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary">What Our Community Says</h2>
          <p className="text-gray-600 mt-2">Voices from our members and volunteers.</p>
        </motion.div>

        {/* ✅ Testimonial Card */}
        <motion.div
          className="relative bg-white shadow-lg rounded-lg p-8 mx-auto max-w-2xl text-center"
          key={testimonials[current].id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FontAwesomeIcon icon={faQuoteLeft} className="text-gold text-3xl mb-4" />
          <p className="text-lg text-gray-700 italic">{testimonials[current].message}</p>

          {/* ✅ User Info */}
          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={testimonials[current].image}
                alt={testimonials[current].name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-primary mt-3">
              {testimonials[current].name}
            </h3>
            <p className="text-sm text-gray-500">{testimonials[current].role}</p>
          </div>
        </motion.div>

        {/* ✅ Navigation Buttons */}
        <div className="mt-6 flex justify-center items-center gap-6">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-primary" />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-primary" />
          </button>
        </div>

        {/* ✅ CTA Button */}
        <div className="mt-8">
          <Link href="/testimonials">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition">
              Read More Stories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;