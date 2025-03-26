"use client";

import { useState } from "react";
import { Event } from "@/data/Event"; // ✅ Use the correct shared interface
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

interface EventsListProps {
  events: Event[];
}

const EventsList = ({ events }: EventsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          All <span className="text-gold">Events</span>
        </h2>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-lightBg border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 text-gray-500 flex items-center justify-center">
                  No Image Available
                </div>
              )}

              <div className="p-5">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FaCalendarAlt /> {event.time}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <p className="text-sm text-gray-700 line-clamp-4 mb-4">
                  {event.description}
                </p>

                <button
                  onClick={() => handleRegisterClick(event)}
                  className="mt-2 w-full bg-gold text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No events available yet.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full rounded-xl relative shadow-lg overflow-hidden">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>

            {/* Modal Header */}
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-primary">
                Register for <span className="text-gold">{selectedEvent.title}</span>
              </h3>
            </div>

            {/* JotForm Embed */}
            <div className="p-4 h-[600px]">
              <iframe
                title="Event Registration"
                src="https://form.jotform.com/243235413570046" // ✅ Your actual form link
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsList;