"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque, faHandHoldingHeart, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const SoxnaLegacy = () => {
  return (
    <section id="legacy" className="relative py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ✅ Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">The Legacy of Murid Women</span>{" "}
            <span className="text-primary">Inspired by Mame Diarra Bousso</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-3xl mx-auto">
            Mame Diarra Bousso, the mother of Sheikh Ahmadou Bamba, remains a{" "}
            <span className="text-primary font-semibold">symbol of faith, patience, and dedication.</span> 
            Her teachings inspire Murid women to serve their communities through{" "}
            <span className="text-primary font-semibold">education, charity, and spiritual devotion.</span>
          </p>
        </motion.div>

        {/* ✅ Featured Image */}
        <motion.div
          className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/soxna.png"
            alt="Mame Diarra Bousso"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* ✅ Key Legacy Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: faMosque,
              title: "A Model of Faith & Patience",
              desc: "Mame Diarra Bousso’s devotion and righteousness shaped the Muridiyya movement, influencing generations of Muslim women."
            },
            {
              icon: faHandHoldingHeart,
              title: "Symbol of Women’s Strength in Islam",
              desc: "A pillar of wisdom and resilience, her teachings emphasize the importance of faith, community service, and perseverance."
            },
            {
              icon: faBookOpen,
              title: "A Name That Lives On",
              desc: "Many Murid women’s groups honor her legacy through charity, education, and empowerment programs."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-2xl transition"
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

        {/* ✅ Featured Quote */}
        <motion.div
          className="border-l-4 border-gold pl-6 italic text-darkText font-body text-lg mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          "Following the footsteps of Mame Diarra Bousso means embracing{" "}
          <span className="text-primary font-semibold">patience, devotion, and service</span> 
          to our families and communities."
        </motion.div>

        {/* ✅ CTA - Read More About Mame Diarra Bousso */}
        <div className="text-center mt-12">
          <Link href="/about/mame-diarra-bousso">
            <motion.button 
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 118, 118, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Read More About Mame Diarra Bousso
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SoxnaLegacy;