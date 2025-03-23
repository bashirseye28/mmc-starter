"use client";

import Hero from "@/components/Common/Hero";

const EventsHero = () => {
  return (
    <Hero
      title="Upcoming"
      highlight="Events"
      subtitle="Join us for spiritual gatherings, educational workshops, and community events."
      image="/images/events-hero.webp" // Update with the correct image path
      ctaText="View Events"
      ctaLink="#events"
    />
  );
};

export default EventsHero;