"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { activities } from "@/data/ActivityData";

// Function to shuffle and select 3 random activities
const getRandomActivities = (arr: typeof activities, count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ActivitiesSection = () => {
  const [randomActivities, setRandomActivities] = useState(() => getRandomActivities(activities, 3));

  useEffect(() => {
    setRandomActivities(getRandomActivities(activities, 3));
  }, []);

  return (
    <section className="py-20 bg-lightBg text-darkText">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">Our Activities</h2>
          <p className="text-lg text-gray-600 mt-3">Engaging spiritual, educational, and community activities.</p>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {randomActivities.map((activity) => (
            <div key={activity.id} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56">
                <Image src={activity.image} alt={activity.title} layout="fill" objectFit="cover" />
              </div>

              {/* Card Content */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-primary">{activity.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{activity.description}</p>

                {/* Learn More Button */}
                <Link href={activity.link}>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-dark transition">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Shuffle Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setRandomActivities(getRandomActivities(activities, 3))}
            className="px-6 py-3 text-white font-semibold bg-primary rounded-lg shadow-md hover:bg-dark transition"
          >
            Shuffle Activities
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;