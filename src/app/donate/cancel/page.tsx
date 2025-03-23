"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const CancelPage = () => {
  return (
    <section className="py-20 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="bg-white shadow-lg p-8 rounded-lg border border-gray-200"
        >
          {/* Icon */}
          <div className="text-red-600 text-6xl mb-4">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>

          {/* Message */}
          <p className="text-lg text-darkText mt-3">
            Your donation was not processed. If this was an error, you can try again below.
            Need assistance? <span className="font-semibold">Contact our support team.</span>
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/activities/kst#donation-tiers">
              <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-md">
                Try Again
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition shadow-md">
                Contact Support
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CancelPage;