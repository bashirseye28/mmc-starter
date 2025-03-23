"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MissionVision = () => {
  return (
    <section className="bg-lightBg py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side: Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/kst.webp" // Replace with the actual image
            alt="About Manchester Murid Community"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Side: Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-darkText"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">
            Our Mission & Vision
          </h2>
          <p className="mt-4 text-lg font-body">
            The Manchester Murid Community is dedicated to fostering faith, knowledge, and unity 
            among individuals inspired by the teachings of Cheikh Ahmadou Bamba. Our vision is to 
            build a stronger community through education, cultural preservation, and social service.
          </p>
          <p className="mt-3 text-lg font-body">
            We strive to create an inclusive space where everyone can grow spiritually and contribute 
            to society with compassion and integrity.
          </p>

          {/* Call to Action Button */}
          <div className="mt-6">
            <Link
              href="/about"
              className="px-6 py-3 text-lg font-semibold bg-gold text-black rounded-full shadow-md hover:bg-yellow-500 transition transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;