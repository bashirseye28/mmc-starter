"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faBookOpen, faMosque, faHandsHelping, faStar, faInfinity } from "@fortawesome/free-solid-svg-icons";

// ✅ Jaayante Tiers Data
const jaayanteTiers = [
  {
    id: "baraka",
    icon: faSeedling,
    title: "Baraka",
    amount: "£200+",
    impact: "Contributing to the foundation of the project.",
    image: "/images/jaayante.png",
  },
  {
    id: "ilm",
    icon: faBookOpen,
    title: "Ilm (Knowledge)",
    amount: "£500+",
    impact: "Supporting educational and learning facilities.",
    image: "/images/jaayante.png",
  },
  {
    id: "ibaadah",
    icon: faMosque,
    title: "Ibaadah (Worship)",
    amount: "£1,000+",
    impact: "Helping build prayer spaces for Murid gatherings.",
    image: "/images/jaayante.png",
  },
  {
    id: "khidma",
    icon: faHandsHelping,
    title: "Khidma (Service)",
    amount: "£2,500+",
    impact: "Assisting with essential infrastructure.",
    image: "/images/jaayante.png",
  },
  {
    id: "touba",
    icon: faStar,
    title: "Touba (Repentance)",
    amount: "£5,000+",
    impact: "Supporting the growth of a spiritual haven.",
    image: "/images/jaayante.png",
  },
  {
    id: "wirdal-akbar",
    icon: faInfinity,
    title: "Wirdal Akbar (The Great Invocation)",
    amount: "£10,000+",
    impact: "A legacy donation for long-term sustainability.",
    image: "/images/jaayante.png",
  },
];

const JaayanteTiers = () => {
  return (
    <section id="donation-tiers" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        
        {/* ✅ Section Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">Jaayante</span> <span className="text-primary">Donation Tiers</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            Choose a Jaayante Tier and contribute to the legacy of Keur Serigne Touba.
          </p>
        </motion.div>

        {/* ✅ Jaayante Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jaayanteTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className="relative bg-cover bg-center bg-no-repeat p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition text-center overflow-hidden"
              style={{ backgroundImage: `url(${tier.image})` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* ✅ Overlay for Readability */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

              {/* ✅ Content */}
              <div className="relative z-10">
                {/* ✅ Icon */}
                <div className="text-gold text-4xl mb-3">
                  <FontAwesomeIcon icon={tier.icon} />
                </div>

                {/* ✅ Tier Title */}
                <h3 className="text-2xl font-semibold text-white font-heading">{tier.title}</h3>

                {/* ✅ Amount */}
                <p className="text-lg text-gold font-bold mt-2">{tier.amount}</p>

                {/* ✅ Impact */}
                <p className="text-white font-body mt-3">{tier.impact}</p>

                {/* ✅ CTA Button */}
                <Link href={`/donate/${tier.id}`}>
                  <motion.button
                    className="mt-6 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition shadow-md w-full"
                    whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(255, 215, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Donate Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JaayanteTiers;