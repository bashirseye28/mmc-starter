"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { events, Event } from "@/data/eventsData";
import RSVPModal from "./RSVPModal";

// Countdown Timer Function
const getTimeRemaining = (eventDate: string) => {
  const eventTime = new Date(eventDate).getTime();
  const now = new Date().getTime();
  const difference = eventTime - now;

  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const FeaturedEvent = () => {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(events[0].date));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // ✅ Find the next event (closest upcoming date)
    const futureEvents = events.filter((event) => new Date(event.date) > new Date());
    const sortedEvents = futureEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (sortedEvents.length > 0) {
      setNextEvent(sortedEvents[0]);
      setTimeLeft(getTimeRemaining(sortedEvents[0].date));
    }

    // ✅ Update countdown every second
    const interval = setInterval(() => {
      if (nextEvent) {
        setTimeLeft(getTimeRemaining(nextEvent.date));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  if (!nextEvent) return null; // ✅ If no upcoming event, hide the section

  return (
    <section className="relative w-full py-16 text-white">
      {/* ✅ Background Image */}
      <div className="absolute inset-0">
        <Image
          src={nextEvent.image}
          alt={nextEvent.name}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ✅ Darker Background Overlay for Readability */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* ✅ Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.h2 
          className="text-4xl font-bold text-gold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {nextEvent.name}
        </motion.h2>
        <p className="text-lg">{nextEvent.description}</p>

        {/* ✅ Event Details */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-lg">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarAlt} />
            {new Date(nextEvent.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} />
            {nextEvent.time}
          </span>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} />
            {nextEvent.location}
          </span>
        </div>

        {/* ✅ Countdown Timer */}
        <div className="flex justify-center gap-4 mt-6 text-2xl font-bold">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-gold text-black px-4 py-2 rounded-md">
              {value}
              <span className="text-sm block">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
            </div>
          ))}
        </div>

        {/* ✅ Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {nextEvent.rsvp && (
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="px-6 py-3 bg-gold text-black font-semibold rounded-md hover:bg-yellow-500 transition shadow-md"
            >
              RSVP Now
            </button>
          )}
          <Link 
            href="/events" 
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition shadow-md"
          >
            View All Events
          </Link>
        </div>
      </div>

      {/* ✅ RSVP Modal */}
      {isModalOpen && <RSVPModal event={nextEvent} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default FeaturedEvent;