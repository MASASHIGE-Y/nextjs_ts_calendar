"use client";

import { format, isSameDay, isSameMonth } from "date-fns";
import type { CalendarEvent } from "@/app/types";

type Props = {
  days: Date[];
  currentMonth: Date;
  today: Date;
  events: CalendarEvent[];
  onDayClick: (day: Date) => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
};

export default function CalendarGrid({
  days,
  currentMonth,
  today,
  events,
  onDayClick,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="grid grid-cols-7 border border-gray-300">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="border-b p-2 text-center font-semibold">
          {day}
        </div>
      ))}

      {days.map((day) => {
        const isCurrentMonth = isSameMonth(day, currentMonth);

        return (
          <div
            key={day.toISOString()}
            onClick={() => onDayClick(day)}
            className={`min-h-24 border p-2 ${
              isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            <div
              className={
                isSameDay(day, today)
                  ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
                  : ""
              }
            >
              {format(day, "d")}
            </div>

            <div className="mt-1 space-y-1 text-xs">
              {events
                .filter((event) => event.date === format(day, "yyyy-MM-dd"))
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded bg-blue-200 px-1 text-black"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(event);
                      }}
                      className="flex-1 text-left"
                    >
                      {event.title}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(event.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
