import { CalendarEvent } from "../types";

const STORAGE_KEY = "calendar-events";

export function getStoredEvents(): CalendarEvent[] {
  if (typeof window === "undefined") return [];

  const storedEvents = localStorage.getItem(STORAGE_KEY);

  if (!storedEvents) return [];

  return JSON.parse(storedEvents) as CalendarEvent[];
}

export function saveStoredEvents(events: CalendarEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}
