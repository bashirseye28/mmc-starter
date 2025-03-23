"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faCoins, faUsers } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// ✅ Fundraising Data (Replace with real API later)
const targetAmount = 150000; // Total Fundraising Goal (£)
const raisedAmount = 78500; // Amount Raised (£)
const donors = 325; // Number of Supporters

// ✅ Calculate Progress Percentage
const progressPercentage = Math.min((raisedAmount / targetAmount) * 100, 100);

const KstFundraising = () => {
  return (
    <section id="fundraising" className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#E5E7EB] relative overflow-hidden">
      {/* Glowing Effects */}
      <div className="absolute -top-20 left-1/3 w-96 h-96 bg-yellow-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-primary opacity-20 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        
        {/* ✅ Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">Help Build</span> <span className="text-primary">Keur Serigne Touba</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            Together, we can establish a permanent Islamic Centre for the Murid community in Manchester. Every contribution brings us closer to this historic achievement.
          </p>
        </motion.div>

        {/* ✅ Fundraising Stats */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 bg-opacity-80 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* 🎯 Target Goal */}
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faCoins} className="text-gold text-5xl mb-2" />
              <p className="text-2xl font-semibold text-primary">£{targetAmount.toLocaleString()}</p>
              <p className="text-darkText text-sm font-medium">Total Goal</p>
            </div>

            {/* 💰 Amount Raised */}
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faHandHoldingHeart} className="text-gold text-5xl mb-2" />
              <p className="text-2xl font-semibold text-primary">£{raisedAmount.toLocaleString()}</p>
              <p className="text-darkText text-sm font-medium">Raised So Far</p>
            </div>

            {/* 👥 Number of Supporters */}
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faUsers} className="text-gold text-5xl mb-2" />
              <p className="text-2xl font-semibold text-primary">{donors.toLocaleString()}</p>
              <p className="text-darkText text-sm font-medium">Donors</p>
            </div>
          </div>

          {/* ✅ PROGRESS BAR */}
          <div className="relative w-full bg-gray-300 rounded-full h-8 mt-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-md"
              style={{ width: `${progressPercentage}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Glowing Progress Effect */}
            <motion.div
              className="absolute top-0 h-full bg-white bg-opacity-20 rounded-full blur-lg"
              style={{ width: `${progressPercentage}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5 }}
            />

            {/* ✅ Tooltip for Live Percentage */}
            <motion.span
              className="absolute top-0 left-0 bg-primary text-white text-xs font-medium px-2 py-1 rounded-lg shadow-md transform -translate-y-8"
              style={{ left: `calc(${progressPercentage}% - 20px)` }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {progressPercentage.toFixed(2)}%
            </motion.span>
          </div>
        </motion.div>

        {/* ✅ CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
          <Link href="/donate">
            <motion.button 
              className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Now
            </motion.button>
          </Link>

          <Link href="/sponsor-brick">
            <motion.button 
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 118, 118, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Sponsor a Brick
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default KstFundraising;