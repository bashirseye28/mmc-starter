"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faUsers,
  faHeart,
  faHandsPraying,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const XassidaImportance = () => {
  return (
    <section className="bg-lightBg py-20">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        {/* ✅ Headline & Subtext */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary font-heading mb-4">
            The Spiritual Power of <span className="text-gold">Qassida</span>
          </h2>
          <p className="text-lg text-darkText font-body max-w-3xl mx-auto leading-relaxed">
            Sheikh Ahmadou Bamba&rsquo;s written works, commonly referred to as{" "}
            <span className="text-primary">
              &quot;Qasidas&quot; (poems) or &quot;Khassaides&quot;
            </span>
            , represent a central pillar of the{" "}
            <strong>spiritual, literary, and intellectual identity</strong> of
            the Muridiyya community. These sacred compositions are deeply
            cherished by Murids and are{" "}
            <strong>recited daily</strong>—either individually or in collective
            gatherings known as{" "}
            <span className="text-primary">
              &quot;Durus&quot; (study circles) or &quot;Kourels&quot; (chanting
              sessions)
            </span>
            .
          </p>
          <p className="text-lg text-darkText font-body max-w-3xl mx-auto mt-4 leading-relaxed">
            Murids across the five continents, as well as those within Senegal,
            frequently organize{" "}
            <span className="text-primary">
              &quot;Journées Khassaides&quot; (Khassaide Days)
            </span>
            —dedicated events where Xassida recitation takes center stage,
            ensuring the{" "}
            <strong>continuous transmission of this rich heritage</strong>.
          </p>
        </motion.div>

        {/* ✅ Key Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {[
            {
              icon: faHandsPraying,
              title: "Deepens Faith",
              desc: "Xassida recitations instill love for Allah and His Messenger, guiding the soul toward righteousness.",
            },
            {
              icon: faBookOpen,
              title: "A Living Tradition",
              desc: "For centuries, Murids have preserved this chanting practice, ensuring Sheikh Ahmadou Bamba’s legacy endures.",
            },
            {
              icon: faHeart,
              title: "Blessings & Healing",
              desc: "The rhythmic chanting of Xassida is known to bring peace, tranquility, and divine baraka (blessings).",
            },
            {
              icon: faUsers,
              title: "Strengthens Bonds",
              desc: "Through collective recitation, we connect as a family of faith, united by the teachings of our spiritual guide.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transition hover:shadow-xl border-t-4 border-gold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-gold text-5xl mb-4"
              />
              <h3 className="text-xl font-semibold text-primary font-heading">
                {item.title}
              </h3>
              <p className="text-darkText font-body mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Featured Quote */}
        <motion.div
          className="mt-12 bg-white shadow-md rounded-xl border-l-4 border-gold px-6 py-4 text-lg italic text-darkText font-body max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          &quot;One who consistently recites my writings will never lose his way
          in this life or the next.&quot;
          <p className="text-right text-sm text-gray-600 mt-2">
            — Sheikh Ahmadou Bamba
          </p>
        </motion.div>

        {/* ✅ CTA Button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Link href="/library">
            <button className="px-8 py-4 bg-gold text-black font-semibold text-lg rounded-lg hover:bg-[#e6b800] transition shadow-md">
              Explore More Qassida Teachings →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default XassidaImportance;