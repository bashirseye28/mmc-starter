"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import Image from "next/image";
import { CalendarDays, MapPin, X } from "lucide-react";

// ✅ Define Event Type for TypeScript
interface EventData {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

const FeaturedEvent = () => {
  const [featuredEvent, setFeaturedEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));

        // ✅ Corrected Mapping: Ensures `id` is included only once
        const eventList: EventData[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as Omit<EventData, "id">; // ✅ Exclude `id` from spread
          return { id: doc.id, ...data }; // ✅ Include `id` separately
        });

        // ✅ Sort events by date (Upcoming First)
        const sortedEvents = eventList.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        if (sortedEvents.length > 0) setFeaturedEvent(sortedEvents[0]);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load featured event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="relative bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
          <span className="text-gold">Upcoming </span>Featured Event
        </h2>

        {/* ✅ Loading & Error Handling */}
        {loading ? (
          <p className="text-center text-primary text-lg">Loading featured event...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : featuredEvent ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-64">
              <Image
                src={featuredEvent.imageUrl || "/images/default-event.jpg"}
                alt={featuredEvent.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-900">{featuredEvent.title}</h3>
              <p className="mt-2 text-gray-600">{featuredEvent.description}</p>

              {/* ✅ Event Details */}
              <div className="mt-4 flex flex-col items-center text-gray-700 space-y-1">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-gray-700" />
                  <span>{featuredEvent.date} | {featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  <span>{featuredEvent.location}</span>
                </div>
              </div>

              {/* ✅ Register Now Button */}
              <button
                className="mt-6 px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
                onClick={() => setIsModalOpen(true)}
              >
                Register Now
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No upcoming events available.</p>
        )}
      </div>

      {/* ✅ Registration Modal */}
      {isModalOpen && featuredEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>

            {/* ✅ Embedded JotForm */}
            <iframe
              id="JotFormIFrame-243235413570046"
              title="Event Registration"
              src="https://form.jotform.com/243235413570046"
              frameBorder="0"
              allow="geolocation; microphone; camera; fullscreen"
              style={{ width: "100%", height: "600px", border: "none" }}
              scrolling="no"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedEvent;