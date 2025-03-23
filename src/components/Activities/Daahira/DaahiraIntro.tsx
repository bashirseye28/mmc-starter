"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookQuran,
  faPrayingHands,
  faUsers,
  faUtensils,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const DaahiraIntro = () => {
  return (
    <section id="intro" className="bg-lightBg py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">
        
        {/* ✅ Left Side - Text Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary font-heading">
            <span className="border-b-4 border-gold pb-1"> <span className="text-gold">What</span> is Daahira?</span>
          </h2>
          <p className="text-lg text-darkText font-body leading-relaxed">
            Daahira is a sacred gathering where Murids come together for 
            <span className="font-semibold text-primary"> faith, remembrance, and unity.</span> 
            Through prayer, recitation, and discussion, we deepen our connection to Allah 
            and strengthen our bonds as a community.
          </p>

          {/* ✅ Key Features - Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: faBookQuran, text: "Qur'an & Xassida Recitations" },
              { icon: faPrayingHands, text: "Group Dhikr & Praise" },
              { icon: faUsers, text: "Community & Brotherhood" },
              { icon: faUtensils, text: "Sharing a Meal Together" },
              { icon: faComments, text: "Islamic Teachings & Discussions" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                <FontAwesomeIcon icon={feature.icon} className="text-gold text-3xl" />
                <span className="text-lg font-semibold text-darkText">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* ✅ Quote Box */}
          <div className="border-l-4 border-gold pl-4 italic text-gray-600 text-lg bg-white shadow-md p-4 rounded-lg">
            "Gather together for the remembrance of Allah, and your hearts will find peace."
          </div>
        </motion.div>

        {/* ✅ Right Side - Image */}
        <motion.div
          className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/gathering.png"
            alt="Daahira Gathering"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DaahiraIntro;