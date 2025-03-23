"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faMusic, faUsers, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const KureelImportance = () => {
  return (
    <section className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 text-center">
        
        {/* ✅ Heading & Intro */}
        <motion.h2 
          className="text-4xl font-bold text-primary font-heading mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Timeless Wisdom of Sheikh Ahmadou Bamba’s <span className="text-gold">Qassida</span>
        </motion.h2>
        <motion.p 
          className="text-lg text-darkText font-body max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Qassida poems carry profound spiritual guidance, offering wisdom, devotion, and a path 
          to enlightenment for generations of Murids worldwide.
        </motion.p>

        {/* ✅ Key Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { icon: faBookOpen, title: "A Legacy of Spiritual Knowledge", desc: "Teachings on faith, discipline, and devotion." },
            { icon: faMusic, title: "Rhythmic & Meditative Chanting", desc: "Enhances spirituality through communal recitation." },
            { icon: faUsers, title: "Connection to Muridiyya", desc: "Strengthening the Murid community’s unity & values." },
            { icon: faGlobe, title: "A Global Impact", desc: "Preserving tradition while inspiring the world." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transition hover:shadow-xl border-t-4 border-gold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <FontAwesomeIcon icon={item.icon} className="text-gold text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-primary font-heading">{item.title}</h3>
              <p className="text-darkText font-body mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ✅ Quote Box */}
        <motion.div 
          className="bg-white shadow-md rounded-xl border-l-4 border-gold px-6 py-4 text-lg italic text-darkText font-body max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          "Through the rhythm of Qassida, our voices unite in devotion, strengthening our hearts in faith."
        </motion.div>

        {/* ✅ CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="https://www.kaggu.net/qasidas.php?mytype=1&lg=AR">
            <motion.button 
              className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-[#e6b800] transition shadow-lg text-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Read Qassidas →
            </motion.button>
          </Link>
          <Link href="/activities/kureel#schedule">
            <motion.button 
              className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition shadow-lg text-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Join a Chanting Session →
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default KureelImportance;