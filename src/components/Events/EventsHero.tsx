"use client";

import Hero from "@/components/Common/Hero";

const EventsHero = () => {
  return (
    <Hero
      title="Upcoming Events"
      highlight="Explore Our"
      subtitle="Join us for spiritual gatherings, educational workshops, and meaningful community experiences."
      image="/images/events-hero.webp" // ✅ Ensure this image exists in /public/images
      ctaText="Browse Events"
      ctaLink="#events"
    />
  );
};

export default EventsHero;