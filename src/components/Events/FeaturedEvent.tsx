"use client";

import { useEffect, useState } from "react";
import { Event } from "@/data/Event";
import { db } from "@/app/lib/firebaseConfig";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const JOTFORM_URL = "https://form.jotform.com/243235413570046";

const FeaturedEvent = () => {
  const [featured, setFeatured] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));

        const events: Event[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const d = doc.data();
            return {
              id: doc.id,
              title: d.title,
              date: d.date,
              time: d.time,
              location: d.location,
              description: d.description,
              imageUrl: d.imageUrl,
              rsvp: d.rsvp,
              category: d.category,
              featured: d.featured || false,
            };
          }
        );

        const now = new Date();

        const featuredEvents = events
          .filter((e) => e.featured && new Date(e.date) >= now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3);

        setFeatured(featuredEvents);
      } catch (err) {
        console.error("❌ Failed to fetch featured events:", err);
        setError("Failed to load featured events.");
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = (event: Event) => {
    setActiveEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveEvent(null);
  };

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Featured <span className="text-gold">Events</span>
        </h2>

        {error && (
          <p className="text-center text-red-600 mb-6">{error}</p>
        )}

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event) => (
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
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
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
                      <span className="italic text-gray-400">No description available</span>
                    )}
                  </p>

                  <button
                    onClick={() => handleRegister(event)}
                    className="mt-2 w-full bg-gold text-black font-semibold py-2 rounded-lg shadow hover:bg-yellow-500 transition"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No upcoming featured events available.
          </p>
        )}
      </div>

      {/* JotForm Modal */}
      {showModal && activeEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
        >
          <div className="bg-white max-w-3xl w-full rounded-xl relative shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-primary">
                Register for <span className="text-gold">{activeEvent.title}</span>
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
              title={`Register for ${activeEvent.title}`}
              allow="geolocation; microphone; camera; fullscreen"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedEvent;