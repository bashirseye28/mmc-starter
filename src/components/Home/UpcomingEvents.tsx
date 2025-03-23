"use client";

import Link from "next/link";
import Image from "next/image";
import { upcomingEvents, Event } from "@/data/EventsData";

const UpcomingEvents = () => {
  return (
    <section className="py-16 bg-lightBg">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary">Join Our Upcoming Events</h2>
        <p className="text-gray-600 mt-2">Stay connected through our spiritual and educational gatherings.</p>

        {/* Events Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 3).map((event: Event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl hover:-translate-y-2">
              <div className="relative w-full h-56">
                <Image src={event.image} alt={event.title} width={400} height={250} className="object-cover w-full h-full" priority />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary">{event.title}</h3>
                <p className="text-gray-500">{event.date} | {event.time}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <div className="mt-4">
                  <Link href={event.link} className="text-primary font-semibold hover:text-gold transition">
                    View Event Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="mt-10">
          <Link href="/events">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition">
              View All Events
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;