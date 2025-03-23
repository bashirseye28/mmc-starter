"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig"; // ✅ Correct Firestore Import
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import HeroEvents from "@/components/Events/EventsHero";
import FilteredEvents from "@/components/Events/FilteredEvents";
import FeaturedEvent from "@/components/Events/FeaturedEvent";
import EventsList from "@/components/Events/EventsList";
import EventCalendar from "@/components/Events/EventCalendar";

// ✅ Define Event Type for TypeScript
interface EventData {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string; // Example: "Community", "Spiritual"
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));

        // ✅ Corrected Mapping: Ensures `id` is included only once
        const eventList: EventData[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as Omit<EventData, "id">; // ✅ Exclude `id` from spread
          return { id: doc.id, ...data }; // ✅ Include `id` separately
        });

        // ✅ Sort by date (Upcoming First)
        const sortedEvents = eventList.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="bg-lightBg min-h-screen py-10">
      {/* ✅ Events Hero Section */}
      <HeroEvents />

      {/* ✅ Loading & Error Handling */}
      {loading ? (
        <p className="text-center text-primary text-lg">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {/* ✅ Pass Firestore Events Data to Components */}
          <FilteredEvents events={events} />
          <FeaturedEvent />
          <EventsList events={events} />
          <EventCalendar events={events} />
        </>
      )}
    </main>
  );
}