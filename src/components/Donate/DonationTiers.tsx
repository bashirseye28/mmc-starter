"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  BookOpen,
  Building,
  Gift,
  Home,
  Users,
} from "lucide-react";

const tiers = [
  {
    amount: 5,
    title: "Daahira Meals & Hospitality",
    description:
      "Provide food and drinks for our weekly Daahira gatherings, helping us continue the spirit of brotherhood, sharing, and remembrance.",
    icon: Users,
  },
  {
    amount: 30,
    title: "Support KST",
    description:
      "Contribute to the monthly fundraising towards acquiring Keur Serigne Touba – the future Islamic Centre and spiritual home of MMC.",
    icon: Home,
  },
  {
    amount: 10,
    title: "Gift to Touba (Addiya)",
    description:
      "Support our annual Addiya contribution to Touba, an act of devotion and gratitude in honour of our Murid roots.",
    icon: Gift,
  },
  {
    amount: 100,
    title: "Hall Rental Contribution",
    description:
      "Cover one full weekly hall payment to host Daahira gatherings, ensuring a consistent space for worship and community bonding.",
    icon: Building,
  },
  {
    amount: 20,
    title: "Sponsor a Child",
    description:
      "Help a child in our Madrassah with essential learning materials including Qur’anic books, pens, and notebooks.",
    icon: BookOpen,
  },
  {
    amount: 50,
    title: "Feed the Needy",
    description:
      "Provide nutritious meals to individuals and families in need through our Social Welfare Programme.",
    icon: HeartHandshake,
  },
];

const DonationTiers = () => {
  return (
    <section className="py-20 bg-white" id="donation-tiers">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-primary">
            Choose a Cause to Support
          </h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Each donation tier represents a vital part of our spiritual and community work.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12"></div>
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition hover:shadow-xl"
            >
              <tier.icon size={40} className="text-gold mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {tier.title}
              </h3>
              <p className="text-xl font-bold text-primary mb-1">£{tier.amount}</p>
              <p className="text-sm text-gold mb-3">One-Time</p>
              <p className="text-sm text-gray-600">{tier.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationTiers;