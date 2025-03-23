"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Fatoumata S.",
    role: "Volunteer",
    text: "Volunteering with MMC has strengthened my faith and allowed me to give back to my community. A truly enriching experience!",
    image: "/images/testimonials/fatoumata.jpg",
  },
  {
    name: "Aliou D.",
    role: "Community Member",
    text: "MMC has given me a place to connect with others who share my beliefs. The events and teachings have been life-changing.",
    image: "/images/testimonials/aliou.jpg",
  },
  {
    name: "Aissatou K.",
    role: "Donor",
    text: "Knowing that my donations directly support education and community initiatives makes me proud to be a part of MMC.",
    image: "/images/testimonials/aissatou.jpg",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-primary md:text-4xl">
          What Our Community Says
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Hear from those whose lives have been touched by our work.
        </p>

        {/* Testimonial Card */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md max-w-xl mx-auto"
        >
          <FaQuoteLeft className="text-3xl text-gold mx-auto mb-3" />
          <p className="text-lg italic text-gray-700">{testimonials[current].text}</p>
          <div className="mt-4">
            <h4 className="text-lg font-bold text-primary">{testimonials[current].name}</h4>
            <p className="text-sm text-gray-500">{testimonials[current].role}</p>
          </div>
        </motion.div>

        {/* Next Button */}
        <button
          onClick={nextTestimonial}
          className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition"
        >
          Next Testimonial
        </button>
      </div>
    </section>
  );
};

export default Testimonials;