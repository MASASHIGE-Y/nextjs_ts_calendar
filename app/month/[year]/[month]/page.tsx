import { prisma } from "@/lib/prisma";
import { addMonths, format } from "date-fns";
import CalendarNavigation from "./CalendarNavigation";
import MonthCalendarClient from "./MonthCalendarClient";

type Props = {
  params: Promise<{
    year: string;
    month: string;
  }>;
};

export default async function MonthPage({ params }: Props) {
  const { year, month } = await params;

  const currentMonth = new Date(Number(year), Number(month) - 1, 1);
  const today = new Date();

  const events = await prisma.event.findMany();

  const prevMonth = addMonths(currentMonth, -1);
  const nextMonth = addMonths(currentMonth, 1);

  return (
    <main className="p-8">
      <CalendarNavigation
        currentMonthLabel={format(currentMonth, "yyyy年M月")}
        prevHref={`/month/${format(prevMonth, "yyyy")}/${format(prevMonth, "M")}`}
        nextHref={`/month/${format(nextMonth, "yyyy")}/${format(nextMonth, "M")}`}
        weekHref={`/week/${format(today, "yyyy")}/${format(today, "M")}/${format(today, "dd")}`}
      />

      <MonthCalendarClient currentMonth={currentMonth} initialEvents={events} />
    </main>
  );
}
