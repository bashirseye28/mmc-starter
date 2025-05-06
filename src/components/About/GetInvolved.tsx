"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHelping, faHandHoldingHeart, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const GetInvolved = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-primary via-[#005a5a] to-primary-dark text-white">
      {/* ✅ Wave Separator (Top) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      {/* ✅ Section Content */}
      <motion.div
        className="container mx-auto px-6 text-center max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ✅ Title */}
        <h2 className="text-4xl font-bold font-heading mb-4">
          Be Part of <span className="text-gold">Our Community</span>
        </h2>

        {/* ✅ Description */}
        <p className="text-lg text-gray-200 font-body max-w-3xl mx-auto mb-6">
          Join us in making a lasting impact through <span className="text-gold font-semibold">volunteering</span>,
          <span className="text-gold font-semibold"> donations</span>, and <span className="text-gold font-semibold">community engagement</span>.
        </p>

        {/* ✅ Three Cards Layout */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: faHandsHelping,
              title: "Volunteer",
              description: "Become an active part of our community by helping with events, education, and support services.",
              link: "/volunteer",
            },
            {
              icon: faHandHoldingHeart,
              title: "Donate",
              description: "Support our initiatives, projects, and charity programs through your generous contributions.",
              link: "/donate",
            },
            {
              icon: faCalendarCheck,
              title: "Attend Events",
              description: "Be part of our upcoming religious, educational, and social gatherings.",
              link: "/events",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white bg-opacity-10 rounded-xl shadow-lg hover:bg-opacity-20 transition text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <FontAwesomeIcon icon={item.icon} className="text-gold text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-white font-heading">{item.title}</h3>
              <p className="text-gray-300 font-body mt-2">{item.description}</p>
              <Link href={item.link} className="text-gold font-semibold mt-4 inline-block hover:text-yellow-300 transition">
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ✅ Call to Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/volunteer">
            <motion.button
              className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:bg-[#d4af37] transition flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 14px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved Today
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* ✅ Wave Separator (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default GetInvolved;