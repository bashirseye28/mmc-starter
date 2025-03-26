"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // ✅ Corrected import
import { Event } from "@/data/Event";
import { generateRecurringEvents } from "@/utils/generateRecurringEvents";
import { CalendarDays, Clock, MapPin, X } from "lucide-react";
import { parseISO, format } from "date-fns";

const JOTFORM_URL = "https://form.jotform.com/243235413570046";

const EventsCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        let allEvents: Event[] = [];

        snapshot.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const d = doc.data();
          const base: Event = {
            id: doc.id,
            title: d.title,
            date: d.date,
            time: d.time,
            location: d.location,
            description: d.description,
            imageUrl: d.imageUrl,
            category: d.category,
            rsvp: d.rsvp,
            featured: d.featured,
            recurrence: d.recurrence || "none",
          };
          allEvents.push(...generateRecurringEvents(base));
        });

        const upcoming = allEvents
          .filter((e) => new Date(e.date) >= new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setEvents(upcoming);
      } catch (error) {
        console.error("❌ Failed to fetch events for calendar:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo: any) => {
    const match = events.find((e) => e.id === clickInfo.event.id);
    if (match) setSelectedEvent(match);
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-10 flex items-center justify-center gap-3">
          <CalendarDays className="text-gold w-8 h-8" />
          Events Calendar
        </h2>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          events={events.map((e) => ({
            id: e.id,
            title: e.title,
            start: e.date,
            allDay: true,
          }))}
          eventClick={handleEventClick}
          height="auto"
          eventColor="#FACC15"
          eventTextColor="#1F2937"
        />
      </div>

      {/* 🟨 Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white max-w-lg w-full rounded-xl relative shadow-xl overflow-hidden">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
              aria-label="Close modal"
            >
              <X />
            </button>

            {selectedEvent.imageUrl && (
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">
                {selectedEvent.title}
              </h3>

              <p className="text-gray-700 text-sm mb-2">
                {selectedEvent.description || (
                  <span className="italic text-gray-400">
                    No description available
                  </span>
                )}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <CalendarDays className="w-4 h-4" />
                {format(parseISO(selectedEvent.date), "eeee, MMM d, yyyy")}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                {selectedEvent.time}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                {selectedEvent.location}
              </div>

              <button
                onClick={() => {
                  setShowForm(true);
                  setSelectedEvent(null);
                }}
                className="w-full bg-gold text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📝 Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full rounded-xl shadow-xl relative p-6">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setShowForm(false)}
              aria-label="Close registration"
            >
              <X />
            </button>

            <h3 className="text-xl font-bold text-primary text-center mb-4">
              Event Registration
            </h3>

            <iframe
              src={JOTFORM_URL}
              title="Event Registration"
              className="w-full h-[600px] rounded-md border"
              allow="geolocation; microphone; camera; fullscreen"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsCalendar;