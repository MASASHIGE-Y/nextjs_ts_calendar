"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import type { CalendarEvent } from "@/app/types";
import CalendarGrid from "@/components/CalendarGrid";

type Props = {
  currentMonth: Date;
  initialEvents: CalendarEvent[];
};

export default function MonthCalendarClient({
  currentMonth,
  initialEvents,
}: Props) {
  const today = startOfToday();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <main className="min-h-screen p-8">
      <CalendarGrid
        days={days}
        currentMonth={currentMonth}
        today={today}
        initialEvents={initialEvents}
      />
    </main>
  );
}
