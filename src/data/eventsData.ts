// src/data/eventsData.ts

export type Event = {
  id: number;
  name: string;
  date: string; // Format: YYYY-MM-DDTHH:mm:ss
  time: string;
  location: string;
  description: string;
  image: string;
  rsvp: boolean;
  category: "Spiritual" | "Community" | "Special Events"; // ✅ Ensured all events have a category
};

// ✅ Updated Events List
export const events: Event[] = [
  {
    id: 1,
    name: "Grand Magal de Touba",
    date: "2025-08-12T00:00:00",
    time: "Tuesday, August 12, 2025",
    location: "Manchester Murid Community Centre",
    description:
      "The largest Murid religious gathering to honor Cheikh Ahmadou Bamba with prayers, teachings, and community gatherings.",
    image: "/images/events-hero.webp",
    rsvp: true,
    category: "Spiritual",
  },
  {
    id: 2,
    name: "Community Iftar (Koor)",
    date: "2025-03-03T18:30:00",
    time: "Every Monday during Ramadan",
    location: "MMC Centre",
    description:
      "Join us for a weekly community iftar to break our fast together with unity and spirituality.",
    image: "/images/events-hero.webp",
    rsvp: false,
    category: "Community",
  },
  {
    id: 3,
    name: "Magal Darou",
    date: "2025-02-14T00:00:00",
    time: "Friday, February 14, 2025",
    location: "MMC Centre",
    description:
      "A spiritual gathering to commemorate the life and teachings of Sheikh Ibrahima Fall.",
    image: "/images/events-hero.webp",
    rsvp: true,
    category: "Spiritual",
  },
  {
    id: 4,
    name: "Gammu (Mawlid)",
    date: "2025-09-04T00:00:00",
    time: "Thursday, September 4, 2025",
    location: "MMC Centre",
    description:
      "A night of prayer, remembrance, and celebration for the birth of the Prophet Muhammad (PBUH).",
    image: "/images/events-hero.webp",
    rsvp: false,
    category: "Special Events",
  },
  {
    id: 5,
    name: "Bisu Qasida",
    date: "2025-12-24T00:00:00",
    time: "Wednesday, December 24, 2025",
    location: "MMC Centre",
    description:
      "Annual gathering for the collective recitation and celebration of Qasida.",
    image: "/images/events-hero.webp.webp",
    rsvp: true,
    category: "Spiritual",
  },
  {
    id: 6,
    name: "Magal Poroxaan",
    date: "2025-02-13T00:00:00",
    time: "Thursday, February 13, 2025",
    location: "MMC Centre",
    description:
      "Annual celebration for Soxna Diarra, honoring her contributions to the community and faith.",
    image: "/images/events-hero.webp",
    rsvp: true,
    category: "Community",
  },
];