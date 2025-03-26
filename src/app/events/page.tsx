"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Event } from "@/data/Event";

import EventsHero from "@/components/Events/EventsHero";
import FeaturedEvent from "@/components/Events/FeaturedEvent";
import FilteredEvents from "@/components/Events/FilteredEvents";
import EventsList from "@/components/Events/EventsList";
import EventsCalendar from "@/components/Events/EventCalendar";

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
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
              recurrence: d.recurrence || "none",
            };
          }
        );

        const now = new Date();

        const upcoming = events
          .filter((e) => new Date(e.date) >= now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setAllEvents(upcoming);
      } catch (err) {
        console.error("❌ Failed to fetch events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <EventsHero />

      {loading ? (
        <p className="text-center text-primary text-lg py-10">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-10">{error}</p>
      ) : (
        <>
          <FeaturedEvent events={allEvents.filter((e) => e.featured)} />
          <FilteredEvents events={allEvents} />
          <EventsList events={allEvents} />
          <EventsCalendar />
        </>
      )}
    </main>
  );
};

export default EventsPage;