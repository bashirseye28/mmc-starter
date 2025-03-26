export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    imageUrl: string;
    rsvp: boolean;
    category: string;
    featured: boolean;
    recurrence?: "weekly" | "monthly" | "yearly" | "none" | null; // ✅ Add this
  }