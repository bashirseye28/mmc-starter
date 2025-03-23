"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FileText, BookOpen, Users, Flag } from "lucide-react";

const milestones = [
  { year: "2021", title: "Official Registration – A New Beginning", description: "MMC was officially registered, providing a structured home for Murid disciples in Manchester.", icon: <FileText size={24} className="text-[#FFD700]" /> },
  { year: "2022", title: "Madrassah (Daara) – Knowledge & Faith", description: "Expanded Islamic education, teaching Qur’an recitation, Arabic, and Murid values.", icon: <BookOpen size={24} className="text-[#FFD700]" /> },
  { year: "2023", title: "KST – Community Centre Expansion", description: "KST became MMC’s hub for weekly Daahira, social events, and spiritual growth.", icon: <Users size={24} className="text-[#FFD700]" /> },
  { year: "2024", title: "Growth & Future Vision", description: "MMC continues to expand, embracing faith, education, and service.", icon: <Flag size={24} className="text-[#FFD700]" /> },
];

const VerticalTimeline = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeYear, setActiveYear] = useState<string>(milestones[0].year);
  const [isVisible, setIsVisible] = useState<boolean>(false); // ✅ Controls visibility of Floating Year

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // ✅ Only show when section is in view
      },
      { root: null, threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible) return; // ✅ Only update if section is visible

      if (containerRef.current) {
        const sections = containerRef.current.querySelectorAll(".timeline-item");
        let currentYear = milestones[0].year;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            currentYear = section.getAttribute("data-year") || milestones[0].year;
          }
        });

        setActiveYear(currentYear);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <section className="py-20 relative bg-gradient-to-b from-[#F8F8F8] to-[#EAF4F4]" ref={containerRef}>
      {/* ✅ Floating Year Indicator (Only Shows Inside Section) */}
      {isVisible && (
        <motion.div
          className="fixed top-16 left-10 bg-[#007676] text-white px-4 py-2 rounded-lg text-lg shadow-lg transition-opacity duration-300"
        >
          {activeYear}
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        {/* ✅ Title Section */}
        <motion.div 
          className="text-center mb-16" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-[#007676]">Our Journey Through the Years</h2>
          <p className="text-lg text-gray-700 mt-4">A timeline of our growth, inspired by the teachings of Cheikh Ahmadou Bamba.</p>
        </motion.div>

        {/* ✅ Vertical Timeline */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#007676] h-full"></div>

          {milestones.map((milestone, index) => {
            const fadeDirection = index % 2 === 0 ? 50 : -50;
            return (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center mb-16 timeline-item"
                data-year={milestone.year}
                initial={{ opacity: 0, x: fadeDirection }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.5 }}
              >
                {/* ✅ Timeline Dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {milestone.icon}
                </motion.div>

                {/* ✅ Highlighted Milestone Card */}
                <motion.div
                  className="w-full md:w-2/3 mt-6"
                  whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="bg-white shadow-lg rounded-lg p-6 backdrop-blur-lg bg-opacity-80 border border-gray-200">
                    <h3 className="text-2xl font-semibold text-[#007676] flex items-center gap-2">
                      {milestone.icon} {milestone.title}
                    </h3>
                    <p className="text-lg text-gray-700 mt-2">{milestone.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalTimeline;