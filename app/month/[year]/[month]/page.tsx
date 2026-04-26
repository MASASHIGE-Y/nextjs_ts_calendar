"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import type { CalendarEvent } from "@/app/types";
import EventModal from "@/components/EventModal";
import CalendarGrid from "@/components/CalendarGrid";

export default function MonthPage() {
  const router = useRouter();
  const params = useParams<{ year: string; month: string }>();

  const year = Number(params.year);
  const month = Number(params.month);

  const currentMonth = new Date(year, month - 1, 1);
  const today = startOfToday();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();

      setEvents(data);
    };

    fetchEvents();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

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

    setEvents((prev) => prev.filter((e) => e.id !== id));
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

  const goToPrevMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    router.push(
      `/month/${format(prevMonth, "yyyy")}/${format(prevMonth, "M")}`,
    );
  };

  const goToNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    router.push(
      `/month/${format(nextMonth, "yyyy")}/${format(nextMonth, "M")}`,
    );
  };

  const goToWeekView = () => {
    router.push(
      `/week/${format(today, "yyyy")}/${format(today, "M")}/${format(
        today,
        "d",
      )}`,
    );
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="rounded border px-3 py-1"
        >
          前月
        </button>

        <h1 className="text-3xl font-bold">
          {format(currentMonth, "yyyy年M月")}
        </h1>

        <button
          type="button"
          onClick={goToNextMonth}
          className="rounded border px-3 py-1"
        >
          翌月
        </button>

        <button type="button" className="rounded border px-3 py-1">
          月
        </button>

        <button
          type="button"
          onClick={goToWeekView}
          className="rounded border px-3 py-1"
        >
          週
        </button>
      </div>

      <CalendarGrid
        days={days}
        currentMonth={currentMonth}
        today={today}
        events={events}
        onDayClick={handleAddEvent}
        onEdit={(event) => {
          setEditingEvent(event);
          setTitle(event.title);
          setSelectedDate(new Date(event.date));
          setIsOpen(true);
        }}
        onDelete={handleDeleteEvent}
      />

      {isOpen && (
        <EventModal
          isOpen={isOpen}
          selectedDate={selectedDate}
          title={title}
          setTitle={setTitle}
          editingEvent={editingEvent}
          onClose={closeModal}
          onSave={handleSaveEvent}
        />
      )}
    </main>
  );
}
