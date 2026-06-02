"use client";

import { format, isSameDay, isSameMonth } from "date-fns";
import { useState } from "react";
import type { CalendarEvent } from "@/app/types";
import EventModal from "@/components/EventModal";

type Props = {
  days: Date[];
  currentMonth: Date;
  today: Date;
  initialEvents: CalendarEvent[];
};

export default function CalendarGrid({
  days,
  currentMonth,
  today,
  initialEvents,
}: Props) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handleAddEvent = (day: Date) => {
    setEditingEvent(null);
    setSelectedDate(day);
    setTitle("");
    setIsOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    await fetch("/api/events", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setSelectedDate(null);
    setEditingEvent(null);
  };

  const handleSaveEvent = async () => {
    if (!selectedDate || !title) return;

    if (editingEvent) {
      const response = await fetch("/api/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingEvent.id,
          title,
        }),
      });

      const updatedEvent = await response.json();

      setEvents((prev) =>
        prev.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event,
        ),
      );
    } else {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date: format(selectedDate, "yyyy-MM-dd"),
        }),
      });

      const newEvent = await response.json();
      setEvents((prev) => [...prev, newEvent]);
    }

    closeModal();
  };

  return (
    <>
      <div className="grid grid-cols-7 border border-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="border p-2 text-center font-semibold">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={day.toISOString()}
              onClick={() => handleAddEvent(day)}
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
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingEvent(event);
                          setTitle(event.title);
                          setSelectedDate(new Date(event.date));
                          setIsOpen(true);
                        }}
                        className="flex-1 text-left"
                      >
                        {event.title}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event.id);
                        }}
                        className="ml-1"
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

      <EventModal
        isOpen={isOpen}
        selectedDate={selectedDate}
        title={title}
        setTitle={setTitle}
        editingEvent={editingEvent}
        onClose={closeModal}
        onSave={handleSaveEvent}
      />
    </>
  );
}
