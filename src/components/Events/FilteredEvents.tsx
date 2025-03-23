"use client";

import { useState } from "react";
import EventCard from "./EventCard"; // ✅ Import EventCard Component

const categories = ["All Events", "Spiritual", "Community", "Special Events"];

const FilteredEvents = ({ events }: { events: any[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  // ✅ Filter events based on selected category
  const filteredEvents = selectedCategory === "All Events"
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <section className="max-w-6xl mx-auto px-4">
      {/* ✅ Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 font-semibold rounded-lg transition-all 
              ${selectedCategory === category ? "bg-gold text-black shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ✅ Event Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No upcoming events in this category. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
};

export default FilteredEvents;