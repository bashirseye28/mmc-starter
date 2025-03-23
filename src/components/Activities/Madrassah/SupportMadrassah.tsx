"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, BookOpen, Users } from "lucide-react";
import Link from "next/link";

// ✅ Animation Variants
const fadeIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const SupportMadrassah = () => {
  return (
    <section id="support" className="py-20 bg-lightBg">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row items-center gap-12">
        
        {/* ✅ Left Side - Image */}
        <motion.div
          className="relative w-full lg:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Image
            src="/images/madrassah-hero.jpg"
            alt="Support Our Madrassah"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* ✅ Right Side - Support Options */}
        <motion.div
          className="lg:w-1/2 space-y-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-primary font-heading">
            Support <span className="text-gold">Our Madrassah</span>
          </h2>
          <p className="text-lg text-darkText font-body">
            Help us continue providing quality Islamic education by supporting our Madrassah through donations and volunteer efforts.
          </p>

          {/* ✅ Contribution Options */}
          <div className="space-y-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md flex items-center gap-4 border-l-4 border-gold hover:shadow-xl transition"
                whileHover={{ scale: 1.02 }}
              >
                <option.icon size={40} className="text-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-primary font-heading">{option.title}</h3>
                  <p className="text-darkText font-body">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ✅ CTA Buttons */}
          <div className="flex gap-6 mt-6">
            <Link href="/donate">
              <button className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
                Donate to the Madrassah
              </button>
            </Link>
            <Link href="/volunteer">
              <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition">
                Become a Volunteer
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ✅ Support Options Data
const supportOptions = [
  {
    icon: Heart,
    title: "Sponsor a Student",
    description: "Provide free Islamic education for underprivileged children.",
  },
  {
    icon: BookOpen,
    title: "Donate Learning Materials",
    description: "Support by providing Qur’ans, books, and classroom essentials.",
  },
  {
    icon: Users,
    title: "Become a Volunteer",
    description: "Assist teachers, mentor students, and help our community thrive.",
  },
];

export default SupportMadrassah;