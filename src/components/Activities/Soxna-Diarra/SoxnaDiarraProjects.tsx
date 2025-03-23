"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faGraduationCap, faBriefcaseMedical, faMosque, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// ✅ Animation Variants for Smooth Appearance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const donationGoal = 5000; // Total donation goal
const currentDonation = 5000; // Current amount raised
const progressPercentage = (currentDonation / donationGoal) * 100; // Progress calculation

const SoxnaDiarraProjects = () => {
  return (
    <section id="charity" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-6xl text-center">

        {/* ✅ Section Heading */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">Charitable Projects</span>{" "}
            <span className="text-primary">& Community Service</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            Daahira Soxna Diarra is dedicated to 
            <span className="text-primary font-semibold"> empowering women, supporting families in need,</span> 
            and <span className="text-primary font-semibold"> promoting Islamic education.</span> 
            Through various community-driven initiatives, we make a meaningful impact.
          </p>
        </motion.div>

        {/* ✅ Charitable Initiatives - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: faHandHoldingHeart,
              title: "Providing Financial & Social Aid",
              desc: "Supporting widows, single mothers, and struggling families by offering essential aid and financial relief."
            },
            {
              icon: faGraduationCap,
              title: "Educational Sponsorships",
              desc: "Funding young girls' Islamic and academic education, ensuring they receive knowledge and empowerment."
            },
            {
              icon: faBriefcaseMedical,
              title: "Health & Well-being Initiatives",
              desc: "Promoting women’s health awareness and providing access to medical aid for those in need."
            },
            {
              icon: faMosque,
              title: "Supporting Islamic Centers & Schools",
              desc: "Raising funds for Murid institutions, Daara programs, and local Masjid developments."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <FontAwesomeIcon icon={item.icon} className="text-gold text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-primary font-heading">{item.title}</h3>
              <p className="text-darkText font-body mt-2">{item.desc}</p>
            </motion.div>
          ))}
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
          <p className="text-darkText text-lg flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} className="text-gold text-xl" />
            Women recently donated <span className="text-primary font-semibold">£5000</span> to support the 
            <span className="text-primary font-semibold"> KST Project</span>.
          </p>

          {/* ✅ Enhanced Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-6 mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-primary rounded-full text-white text-sm font-semibold flex items-center justify-center transition-all"
              style={{ width: `${progressPercentage}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {progressPercentage}% Funded
            </motion.div>
          </div>

          {/* ✅ Goal Display */}
          <p className="text-darkText text-sm font-semibold mt-2">
            Raised <span className="text-primary">£{currentDonation}</span> of <span className="text-primary">£{donationGoal}</span> Goal
          </p>
        </motion.div>

        {/* ✅ CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          <Link href="/donate">
            <motion.button 
              className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition shadow-md"
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