"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faGraduationCap, faBriefcaseMedical, faMosque } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// ✅ Animation Variants for Smooth Appearance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const SoxnaDiarraProjects = () => {
  return (
    <section id="charity" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-6 max-w-6xl text-center">

        {/* ✅ Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-primary">
            <span className="border-b-4 border-gold pb-1">Charitable Projects & Community Service</span>
          </h2>
          <p className="text-lg text-gray-700 mt-3 max-w-3xl mx-auto">
            Daahira Soxna Diarra is dedicated to **empowering women, supporting families in need, and promoting Islamic education.** Through various community-driven initiatives, we make a meaningful impact.
          </p>
        </motion.div>

        {/* ✅ Charitable Initiatives - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 🌟 Providing Financial & Social Aid */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition border-t-4 border-gold text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary">Providing Financial & Social Aid</h3>
            <p className="text-gray-700 mt-2">
              Supporting **widows, single mothers, and struggling families** by offering essential aid and financial relief.
            </p>
          </motion.div>

          {/* 📚 Educational Sponsorships */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition border-t-4 border-gold text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FontAwesomeIcon icon={faGraduationCap} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary">Educational Sponsorships</h3>
            <p className="text-gray-700 mt-2">
              Funding **young girls' Islamic and academic education**, ensuring they receive knowledge and empowerment.
            </p>
          </motion.div>

          {/* 🏥 Health & Well-being Initiatives */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition border-t-4 border-gold text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FontAwesomeIcon icon={faBriefcaseMedical} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary">Health & Well-being Initiatives</h3>
            <p className="text-gray-700 mt-2">
              Promoting **women’s health awareness** and providing access to medical aid for those in need.
            </p>
          </motion.div>

          {/* 🕌 Supporting Islamic Centers & Schools */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition border-t-4 border-gold text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FontAwesomeIcon icon={faMosque} className="text-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-primary">Supporting Islamic Centers & Schools</h3>
            <p className="text-gray-700 mt-2">
              Raising funds for **Murid institutions, Daara programs, and local Masjid developments**.
            </p>
          </motion.div>

        </div>

        {/* ✅ Donation Goal Progress */}
        <motion.div
          className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-xl font-semibold text-primary mb-4">
            <span className="border-b-2 border-gold pb-1">Recent Donation</span>
          </h3>
          <p className="text-gray-700 text-lg">Women recently donated <strong>£5000</strong> to support the **KST Project**.</p>
          
          {/* ✅ Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-primary h-4 rounded-full transition-all"
              style={{ width: "100%" }} // ✅ Fully funded
            ></div>
          </div>
        </motion.div>

        {/* ✅ CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
          <Link href="/donate">
            <motion.button 
              className="px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-yellow-600 transition shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Donate to Support Women’s Initiatives
            </motion.button>
          </Link>

          <Link href="/volunteer">
            <motion.button 
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 118, 118, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Volunteer With Us
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SoxnaDiarraProjects;