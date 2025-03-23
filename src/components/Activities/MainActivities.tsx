"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { activities } from "@/data/ActivityData";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainActivities = () => {
  return (
    <section id="OurActivities" className="py-16 bg-lightBg">
      <div className="container mx-auto px-6">
        {/* ✅ Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">Our Main Activities – What We Do</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore the key activities that define our mission, from faith and education to community service.
          </p>
        </div>

        {/* ✅ Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* ✅ Activity Image */}
              <div className="relative w-full h-52">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* ✅ Activity Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary">{activity.title}</h3>
                <p className="text-gray-600 mt-2">{activity.description}</p>

                {/* ✅ Learn More Link */}
                <div className="mt-4">
                  <Link href={activity.link} className="text-primary font-semibold flex items-center gap-2 hover:text-gold transition">
                    Learn More <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ CTA Button */}
        {/* <div className="text-center mt-12">
          <Link href="/activities">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-darkPrimary transition">
              View All Activities
            </button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default MainActivities;