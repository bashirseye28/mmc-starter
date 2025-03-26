"use client";

import { useState } from "react";
import { Event } from "@/data/Event";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const JOTFORM_URL = "https://form.jotform.com/243235413570046";

const FILTER_CATEGORIES = [
  "All",
  "Spiritual",
  "Community",
  "Workshop",
  "Fundraising",
  "Special Events",
];

interface FilteredEventsProps {
  events: Event[];
}

const FilteredEvents: React.FC<FilteredEventsProps> = ({ events }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only show future events
  const today = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= today
  );

  const filteredEvents =
    activeCategory === "All"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.category === activeCategory);

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  return (
    <section id="filtered-events" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Browse <span className="text-gold">Events</span> by Category
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                activeCategory === category
                  ? "bg-gold text-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-lightBg border border-gray-200 rounded-lg overflow-hidden shadow-md transition hover:shadow-lg"
              >
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                    <FaCalendarAlt /> {event.time}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <FaMapMarkerAlt /> {event.location}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                    {event.description || (
                      <span className="italic text-gray-400">
                        No description available
                      </span>
                    )}
                  </p>

                  <button
                    onClick={() => handleRegisterClick(event)}
                    className="w-full bg-gold text-black font-semibold py-2 rounded-lg shadow hover:bg-yellow-500 transition"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No upcoming events found in this category.
          </p>
        )}
      </div>

      {/* Register Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full rounded-xl relative shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-primary">
                Register for{" "}
                <span className="text-gold">{selectedEvent.title}</span>
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 text-xl"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <iframe
              src={JOTFORM_URL}
              className="w-full h-[600px] border-none"
              title={`Register for ${selectedEvent.title}`}
              allow="geolocation; microphone; camera; fullscreen"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default FilteredEvents;