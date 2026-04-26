"use client";

import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfToday,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CalendarEvent } from "@/app/types";
import EventModal from "@/components/EventModal";

export default function WeekPage() {
  const router = useRouter();
  const params = useParams<{ year: string; month: string; day: string }>();

  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);

  const currentDate = new Date(year, month - 1, day);
  const today = startOfToday();

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

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

      const createdEvent = await response.json();

      setEvents((prev) => [...prev, createdEvent]);
    }

    closeModal();
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

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);

  const days = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });

  const goToPrevWeek = () => {
    const prev = subWeeks(currentDate, 1);
    router.push(
      `/week/${format(prev, "yyyy")}/${format(prev, "M")}/${format(prev, "d")}`,
    );
  };

  const goToNextWeek = () => {
    const next = addWeeks(currentDate, 1);
    router.push(
      `/week/${format(next, "yyyy")}/${format(next, "M")}/${format(next, "d")}`,
    );
  };

  const goToMonth = () => {
    router.push(
      `/month/${format(currentDate, "yyyy")}/${format(currentDate, "M")}`,
    );
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mb-6 flex items-center gap-4">
        <button onClick={goToPrevWeek}>前週</button>

        <h1 className="text-3xl font-bold">
          {format(weekStart, "yyyy年M月d日")} 〜 {format(weekEnd, "M月d日")}
        </h1>

        <button onClick={goToNextWeek}>翌週</button>

        <button onClick={goToMonth}>月</button>
      </div>

      <div className="grid grid-cols-7 border border-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="border p-2 text-center font-semibold">
            {d}
          </div>
        ))}

        {days.map((day) => (
          <div
            key={day.toISOString()}
            onClick={() => handleAddEvent(day)}
            className="min-h-24 border p-2"
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
        ))}
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
    </main>
  );
}
