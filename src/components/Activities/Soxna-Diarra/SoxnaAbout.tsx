"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrayingHands, faGraduationCap, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const SoxnaAbout = () => {
  return (
    <section id="about-soxna" className="bg-lightBg py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* ✅ Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold font-heading">
            <span className="text-gold">Who We Are</span>{" "}
            <span className="text-primary">as Murid Women</span>
          </h2>
          <p className="text-lg text-darkText font-body mt-3 max-w-2xl mx-auto">
            Daahira Soxna Diarra is a faith-driven women&#39;s group focused on 
            <span className="text-primary font-semibold"> spiritual growth, education, and community service</span>. 
            We empower women to strengthen their faith, support those in need, and build 
            a brighter future for the next generation.
          </p>
        </motion.div>

        {/* ✅ Three Key Features (Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: faPrayingHands,
              title: "Faith & Worship",
              desc: "Strengthening spiritual connection through prayer, gatherings, and Islamic teachings."
            },
            {
              icon: faGraduationCap,
              title: "Education & Leadership",
              desc: "Empowering women through Islamic knowledge, mentorship, and leadership training."
            },
            {
              icon: faHandHoldingHeart,
              title: "Charity & Community Work",
              desc: "Supporting families, widows, and vulnerable women through social aid and empowerment."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition text-center"
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

        {/* ✅ Inspirational Quote */}
        <motion.div
          className="mt-12 bg-primary text-white text-lg italic font-semibold px-8 py-6 rounded-lg shadow-md text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          
          "When you educate a woman, you educate a generation."
        </motion.div>

      </div>
    </section>
  );
};

export default SoxnaAbout;