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
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
        {/* ✅ Event Image (Handles Missing Image) */}
        <div className="relative w-full h-56">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
              No Image Available
            </div>
          )}
        </div>

        <div className="p-5">
          {/* ✅ Event Title (Keep it at the top) */}
          <h3 className="text-lg font-semibold text-primary">{event.title}</h3>

          {/* ✅ Display Event Description (Now below title) */}
          {event.description ? (
            <p className="text-gray-600 mt-2 text-sm">
              {event.description.length > 120
                ? event.description.substring(0, 120) + "..."
                : event.description}
            </p>
          ) : (
            <p className="text-gray-400 italic mt-2">No description available</p>
          )}

          {/* ✅ Display Date */}
          <div className="flex items-center gap-2 text-gray-500 mt-3">
            <CalendarDays className="w-5 h-5" />
            <span>{new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}</span>
          </div>

          {/* ✅ Display Time */}
          {event.time ? (
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>
          ) : (
            <div className="text-gray-400 italic mt-2">Time not available</div>
          )}

          {/* ✅ Display Location */}
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin className="w-5 h-5" />
            <span>{event.location}</span>
          </div>

          {/* ✅ Register Now Button - Opens JotForm in Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full bg-gold text-black font-semibold py-2 rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* ✅ JotForm Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>

            <h3 className="text-xl font-semibold text-primary text-center mb-4">
              Register for {event.title}
            </h3>

            {/* ✅ Embedded JotForm */}
            <iframe
              src="https://form.jotform.com/243235413570046"
              title="Event Registration"
              className="w-full h-[600px] rounded-md"
              frameBorder="0"
              allow="geolocation; microphone; camera; fullscreen"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;