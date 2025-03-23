"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faMusic, faUsers, faGlobe } from "@fortawesome/free-solid-svg-icons";

const KureelIntro = () => {
  return (
    <section className="bg-lightBg py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">
        
        {/* ✅ Left Side - Text Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-primary font-heading">
            What is <span className="text-gold">Kureel Xassida?</span>
          </h2>
          <p className="text-lg text-darkText font-body leading-relaxed">
            Kureel Xassida is a sacred practice within the Murid community where believers gather 
            to chant the poetic works of Sheikh Ahmadou Bamba. Through 
            <strong className="text-primary"> rhythmic recitation</strong>, participants connect deeply with their faith, 
            preserving a rich spiritual tradition.
          </p>

          {/* ✅ Key Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: faBookOpen, text: "Rooted in Murid Tradition" },
              { icon: faMusic, text: "Rhythmic & Melodic Chants" },
              { icon: faUsers, text: "Collective Worship" },
              { icon: faGlobe, text: "Open to Everyone" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                <FontAwesomeIcon icon={feature.icon} className="text-gold text-3xl" />
                <span className="text-lg font-semibold text-darkText font-body">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* ✅ Quote Box */}
          <div className="border-l-4 border-gold pl-4 italic text-darkText font-body text-lg bg-white p-4 rounded-xl shadow-md">
            "Through the rhythm of Xassida, our voices unite in devotion, strengthening our hearts in faith."
          </div>
        </motion.div>

        {/* ✅ Right Side - Image */}
        <motion.div
          className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/kureel-hero.jpg"
            alt="Kureel Xassida Chanting"
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

export default KureelIntro;