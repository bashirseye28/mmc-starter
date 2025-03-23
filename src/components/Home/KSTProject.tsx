"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque, faBullseye, faHandHoldingDollar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Fundraising Progress
const goalAmount = 350000;
const raisedAmount = 96000;
const progress = (raisedAmount / goalAmount) * 100;

const KSTProject = () => {
  return (
    <section id="kst-project" className="bg-white py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        
        {/* Project Image */}
        <motion.div 
          className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/kst.webp"
            alt="Keur Serigne Touba Community Centre"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          className="space-y-6 text-darkText"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary flex items-center gap-2">
            <FontAwesomeIcon icon={faMosque} className="text-gold" /> Keur Serigne Touba (KST)
          </h2>
          <p className="text-lg text-gray-700">
            Our goal is to establish a dedicated community centre for faith, education, and social support. 
            The centre will serve as a hub for prayers, Islamic education, and cultural events.
          </p>

          {/* Fundraising Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-6 shadow-inner overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${progress}%` }}
            >
              <span 
                className={`text-sm font-bold ${
                  progress > 40 ? "text-black" : "text-white"
                }`}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 flex items-center gap-4">
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBullseye} className="text-primary" />
              Goal: £{goalAmount.toLocaleString()}
            </span>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHandHoldingDollar} className="text-gold" />
              Raised: £{raisedAmount.toLocaleString()}
            </span>
          </p>

          {/* Buttons Section */}
          <div className="flex gap-6 items-center mt-6">
            {/* Donate Now - Primary CTA */}
            <Link href="/donate">
              <button className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition shadow-md">
                Donate Now
              </button>
            </Link>

            {/* Learn More - More Professional Button */}
            <Link href="/activities/kst">
              <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg flex items-center gap-2 hover:bg-primary hover:text-white transition shadow-md">
                Learn More <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default KSTProject;