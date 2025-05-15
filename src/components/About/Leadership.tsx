"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Moustapha Gueye",
    role: "Chair",
    responsibilities: [
      "Provides vision and leadership",
      "Presides over meetings",
      "Represents MMC officially",
      "Ensures Murid values are upheld",
    ],
    image: "/images/me.png",
  },
  {
    name: "Serigne Modou Keinde",
    role: "Vice Chair",
    responsibilities: [
      "Supports strategic planning",
      "Coordinates between committees",
      "Resolves community concerns",
    ],
    image: "/images/me.png",
  },
  {
    name: "Baye Touba Sarr",
    role: "Advisory Council",
    responsibilities: [
      "Advises on religious matters",
      "Ensures adherence to Murid traditions",
      "Guides community growth",
    ],
    image: "/images/me.png",
  },
  {
    name: "Anonymous",
    role: "General Secretary",
    responsibilities: [
      "Manages records and communications",
      "Organises internal coordination",
      "Handles official correspondence",
    ],
    image: "/images/me.png",
  },
  {
    name: "Baye Gora Gueye",
    role: "Finance & Treasury",
    responsibilities: [
      "Oversees financial transparency",
      "Manages fundraising and donations",
      "Prepares financial reports",
    ],
    image: "/images/me.png",
  },
  {
    name: "Moustapha Seye",
    role: "Education & Cultural",
    responsibilities: [
      "Manages Madrassah & Islamic studies",
      "Organises Qasida chanting sessions",
      "Promotes Murid teachings",
    ],
    image: "/images/me.png",
  },
  {
    name: "Baay Qasida",
    role: "Organisation Committee",
    responsibilities: [
      "Organises community gatherings",
      "Handles logistics and events",
      "Ensures smooth execution of MMC activities",
    ],
    image: "/images/me.png",
  },
  {
    name: "Moustapha Lo",
    role: "KST Team Leader",
    responsibilities: [
      "Oversees Islamic Centre project",
      "Manages construction and fundraising",
      "Ensures project implementation",
    ],
    image: "/images/me.png",
  },
  {
    name: "Djibril Mbengue",
    role: "Media & Tech",
    responsibilities: [
      "Handles digital presence and outreach",
      "Manages livestreaming & event coverage",
      "Distributes newsletters and promotions",
    ],
    image: "/images/me.png",
  },
  {
    name: "TBC",
    role: "Social & Welfare",
    responsibilities: [
      "Organises food distribution & aid",
      "Implements well-being initiatives",
      "Supports vulnerable community members",
    ],
    image: "/images/me.png",
  },
];

const TeamSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-semibold text-center text-[#007676]">
        Meet Our Leadership Team
      </h2>
      <p className="text-lg text-center text-gray-600 mt-2 max-w-2xl mx-auto">
        Dedicated individuals leading our community with wisdom, faith, and service.
      </p>

      {/* Team Grid - 5 Columns for large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="relative group bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center overflow-hidden transition-all cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleToggle(index)} // Tap to expand on mobile
          >
            {/* Profile Image */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Role */}
            <h3 className="mt-4 text-xl font-semibold text-primary">{member.name}</h3>
            <p className="text-sm text-[#f5c907] font-bold italic">{member.role}</p>

            {/* Responsibilities */}
            <motion.div
              className={`absolute top-0 left-0 w-full h-full bg-[#007676] text-white flex flex-col justify-center items-center transition-all duration-300 p-4 ${
                expandedIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <h4 className="text-lg font-semibold">{member.role}</h4>
              <ul className="text-sm mt-2 space-y-1">
                {member.responsibilities.map((resp, idx) => (
                  <li key={idx}>• {resp}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;