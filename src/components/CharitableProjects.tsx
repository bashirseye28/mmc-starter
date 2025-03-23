"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faBookOpen, faHospital, faMosque, faUsers } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// ✅ Props Interface for Reusability
interface CharitableProjectsProps {
  title: string;
  description: string;
  projects: {
    title: string;
    icon: any;
    description: string;
  }[];
  fundraisingGoal?: number;
  raisedAmount?: number;
  showProgressBar?: boolean;
}

// ✅ Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const CharitableProjects: React.FC<CharitableProjectsProps> = ({
  title,
  description,
  projects,
  fundraisingGoal,
  raisedAmount,
  showProgressBar = false,
}) => {
  const progressPercentage = fundraisingGoal && raisedAmount ? (raisedAmount / fundraisingGoal) * 100 : 0;

  return (
    <section id="charity" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-5xl text-center">

        {/* ✅ Section Title */}
        <motion.h2
          className="text-4xl font-bold text-primary mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {title}
        </motion.h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">{description}</p>

        {/* ✅ Charitable Initiatives Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={fadeInUp}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <FontAwesomeIcon icon={project.icon} className="text-gold text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
              <p className="text-gray-700 mt-2">{project.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Donation Progress Bar (Optional) */}
        {showProgressBar && fundraisingGoal && raisedAmount !== undefined && (
          <div className="mt-12 max-w-xl mx-auto text-left">
            <p className="text-lg font-semibold text-primary">Current Fundraising Goal</p>
            <div className="bg-gray-300 h-4 rounded-full mt-2 overflow-hidden">
              <div className="bg-gold h-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Raised: <strong>£{raisedAmount.toLocaleString()}</strong> / Goal: <strong>£{fundraisingGoal.toLocaleString()}</strong>
            </p>
          </div>
        )}

        {/* ✅ CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/donate">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition shadow-md">
              Donate to Support
            </button>
          </Link>
          <Link href="/volunteer">
            <button className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition shadow-md">
              Become a Volunteer
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CharitableProjects;