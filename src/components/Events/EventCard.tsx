"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, Clock, X } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    time?: string;
    location: string;
    description?: string;
    imageUrl?: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ✅ Event Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
        {/* ✅ Event Image */}
        <div className="relative w-full h-56">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover rounded-t-lg"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
              No Image Available
            </div>
          )}
        </div>

        {/* ✅ Event Details */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-primary">{event.title}</h3>

          <p className="text-sm text-gray-600 mt-2">
            {event.description ? (
              event.description.length > 120
                ? `${event.description.slice(0, 120)}...`
                : event.description
            ) : (
              <span className="italic text-gray-400">No description available</span>
            )}
          </p>

          <div className="flex items-center gap-2 text-gray-500 mt-3">
            <CalendarDays className="w-5 h-5" />
            <span>
              {new Date(event.date).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          {event.time && (
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin className="w-5 h-5" />
            <span>{event.location}</span>
          </div>

          {/* ✅ Register Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full bg-gold text-black font-semibold py-2 rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* ✅ Modal with JotForm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
            {/* ❌ Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Registration Modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-semibold text-center text-primary mb-4">
              Register for {event.title}
            </h2>

            <iframe
              src="https://form.jotform.com/243235413570046"
              title={`Register for ${event.title}`}
              className="w-full h-[600px] rounded-md border"
              allow="geolocation; microphone; camera; fullscreen"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;