// src/components/Donate/WhyDonate.tsx
"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque, faBookOpen, faUtensils } from "@fortawesome/free-solid-svg-icons";

type ImpactArea = {
  icon: any;
  title: string;
  description: string; // HTML allowed
};

const defaultImpactAreas: ImpactArea[] = [
  {
    icon: faMosque,
    title: "Keur Serigne Touba (KST) Centre Project",
    description: "Supporting the development of a dedicated space for <strong>worship</strong>, <strong>education</strong>, and community programs.",
  },
  {
    icon: faBookOpen,
    title: "Education & Madrassah",
    description: "Helping students receive <strong>Qur'anic education</strong>, Arabic studies, and Murid teachings.",
  },
  {
    icon: faUtensils,
    title: "Charity & Welfare Programs",
    description: "Providing meals and essential support to those in need through our <strong>social welfare initiatives</strong>.",
  },
];

const WhyDonate = ({ impactAreas = defaultImpactAreas }: { impactAreas?: ImpactArea[] }) => {
  return (
    <section
      id="why-donate"
      className="py-20 bg-white"
      aria-label="Reasons to support Manchester Murid Community"
    >
      <div className="container mx-auto px-6 max-w-6xl text-center">
        {/* Section Heading */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold font-heading text-primary">
            Why <span className="text-gold">Your Donation Matters</span>
          </h2>
          <p className="text-lg text-gray-700 font-body mt-3 max-w-3xl mx-auto">
            Your generosity fuels education, charity, and community development.
          </p>
        </motion.header>

        {/* Impact Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactAreas.map((area, index) => (
            <motion.article
              key={index}
              className="p-8 bg-lightBg rounded-lg shadow-lg hover:shadow-xl transition text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gold text-4xl mb-4"
              >
                <FontAwesomeIcon icon={area.icon} aria-hidden="true" />
              </motion.div>

              <h3 className="text-xl font-semibold text-primary mb-2">{area.title}</h3>

              <p
                className="text-gray-700 text-sm"
                dangerouslySetInnerHTML={{ __html: area.description }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;