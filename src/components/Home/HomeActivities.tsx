// src/components/Home/HomeActivities.tsx
"use client";

import { useState, useEffect } from "react";
import { activities } from "@/data/ActivityData";
import ActivityCard from "./ActivityCard";
import Link from "next/link";

const HomeActivities = () => {
  const [randomActivities, setRandomActivities] = useState(activities.slice(0, 3));

  useEffect(() => {
    const shuffled = [...activities].sort(() => 0.5 - Math.random());
    setRandomActivities(shuffled.slice(0, 3));
  }, []);

  return (
    <section className="py-16 bg-lightBg">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary">Our Activities</h2>
          <p className="text-gray-600 mt-2">Engaging spiritual, educational, and community activities.</p>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomActivities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>

        {/* See All Activities Button - Professional Hover Effect */}
        <div className="mt-10 text-center">
          <Link
            href="/activities"
            className="inline-flex items-center px-6 py-3 text-white font-semibold bg-primary rounded-lg shadow-md transition-all duration-300 hover:bg-gold hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            See All Activities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeActivities;