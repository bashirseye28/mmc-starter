import { addWeeks, addMonths, addYears, isBefore } from "date-fns";
import { Event } from "@/data/Event";

export function generateRecurringEvents(event: Event, instances = 6): Event[] {
  if (!event.recurrence || event.recurrence === "none") return [event];

  const start = new Date(event.date);
  const now = new Date();
  const generated: Event[] = [];

  for (let i = 0; i < instances; i++) {
    let nextDate = new Date(start);

    switch (event.recurrence) {
      case "weekly":
        nextDate = addWeeks(start, i);
        break;
      case "monthly":
        nextDate = addMonths(start, i);
        break;
      case "yearly":
        nextDate = addYears(start, i);
        break;
    }

    if (isBefore(nextDate, now)) continue;

    generated.push({
      ...event,
      id: `${event.id}-${event.recurrence}-${i}`,
      date: nextDate.toISOString(),
    });
  }

  return generated;
}