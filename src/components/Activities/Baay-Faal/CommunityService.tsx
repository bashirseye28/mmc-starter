"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faBookOpen, faMosque, faHandsHelping } from "@fortawesome/free-solid-svg-icons";

const CommunityService = () => {
  return (
    <section id="community-service" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        {/* ✅ Heading */}
        <motion.h2
          className="text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          How We <span className="text-yellow-500">Serve the Community</span>
        </motion.h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Ahlu Baay Faal is committed to uplifting the community through service, education, and spiritual engagement.
        </p>

        {/* ✅ Four Activity Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 🍲 Social Welfare Projects */}
          <motion.div
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-yellow-500 hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} size="3x" className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-primary mt-4">Social Welfare Projects</h3>
            <p className="text-gray-600 mt-2">
              Providing food, shelter, and aid to the less fortunate in our community.
            </p>
          </motion.div>

          {/* 📚 Education & Mentorship */}
          <motion.div
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-yellow-500 hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faBookOpen} size="3x" className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-primary mt-4">Education & Mentorship</h3>
            <p className="text-gray-600 mt-2">
              Teaching Murid values, Arabic, and life skills to younger members.
            </p>
          </motion.div>

          {/* 🕌 Religious Gatherings & Dhikr */}
          <motion.div
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-yellow-500 hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faMosque} size="3x" className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-primary mt-4">Religious Gatherings & Dhikr</h3>
            <p className="text-gray-600 mt-2">
              Strengthening faith through group recitations and spiritual gatherings.
            </p>
          </motion.div>

          {/* 🤝 Volunteer Opportunities */}
          <motion.div
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-yellow-500 hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faHandsHelping} size="3x" className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-primary mt-4">Volunteer Opportunities</h3>
            <p className="text-gray-600 mt-2">
              Participate in community service events and uplift those in need.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityService;