"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { CalendarDays, MapPin, Clock, X } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  imageUrl?: string;
}

const EventCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // ✅ Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            date: data.date,
            time: data.time || "TBA",
            location: data.location,
            description: data.description || "No description available",
            imageUrl: data.imageUrl || "",
          };
        });
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Handle Event Click in Calendar
  const handleEventClick = (clickInfo: any) => {
    const event = events.find((e) => e.id.toString() === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  return (
    <section className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
      {/* ✅ Centered & Styled Header */}
      <h2 className="text-3xl font-bold text-center text-primary mb-6 flex items-center justify-center gap-3">
        <CalendarDays className="w-8 h-8 text-gold" />
        <span>Events Calendar</span>
      </h2>

      {/* ✅ FullCalendar Component */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.date,
          allDay: true,
        }))}
        eventClick={handleEventClick}
        height="auto"
        eventColor="#FACC15"
        eventTextColor="#333"
        dayMaxEventRows={2}
        dayCellClassNames="hover:bg-gray-100 transition rounded-md"
      />

      {/* ✅ Event Details Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative border border-gray-300">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* ✅ Event Image (If Available) */}
            {selectedEvent.imageUrl && (
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            {/* ✅ Event Details */}
            <h3 className="text-lg font-semibold text-primary">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{selectedEvent.description}</p>

            <div className="flex items-center gap-2 text-gray-700 mt-4">
              <CalendarDays className="w-5 h-5 text-gray-700" />
              <span>{new Date(selectedEvent.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <Clock className="w-5 h-5 text-gray-700" />
              <span>{selectedEvent.time}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              <span>{selectedEvent.location}</span>
            </div>

            {/* ✅ Register Button - Opens JotForm in a Modal */}
            <button
              className="mt-6 w-full bg-gold text-black font-semibold py-2 rounded-lg shadow-md hover:bg-yellow-400 transition"
              onClick={() => setIsRegisterOpen(true)}
            >
              Register Now
            </button>
          </div>
        </div>
      )}

      {/* ✅ JotForm Registration Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative border border-gray-300">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setIsRegisterOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold text-primary text-center mb-4">
              Event Registration
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
    </section>
  );
};

export default EventCalendar;