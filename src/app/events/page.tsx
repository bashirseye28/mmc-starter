"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

// Components
import EventsHero from "@/components/Events/EventsHero";
import FeaturedEvent from "@/components/Events/FeaturedEvent";
import FilteredEvents from "@/components/Events/FilteredEvents";
import EventCalendar from "@/components/Events/EventCalendar";

// Types
import { Event } from "@/data/Event";

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        const data: Event[] = snapshot.docs.map(
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
            };
          }
        );

        const sorted = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setAllEvents(sorted);
      } catch (err) {
        console.error("❌ Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="bg-lightBg min-h-screen">
      <EventsHero />

      {loading ? (
        <p className="text-center text-primary text-lg py-10">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-10">{error}</p>
      ) : (
        <>
          <FeaturedEvent />
          <div id="events">
            <FilteredEvents events={allEvents} />
            <EventCalendar />
          </div>
        </>
      )}
    </main>
  );
};

export default EventsPage;