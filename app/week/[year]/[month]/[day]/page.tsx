import { prisma } from "@/lib/prisma";
import { addWeeks, subWeeks, format } from "date-fns";
import WeekNavigation from "./WeekNavigation";
import WeekCalendarClient from "./WeekCalendarClient";

type Props = {
  params: Promise<{
    year: string;
    month: string;
    day: string;
  }>;
};

export default async function WeekPage({ params }: Props) {
  const { year, month, day } = await params;

  const currentDate = new Date(Number(year), Number(month) - 1, Number(day));

  // DBから取得
  const events = await prisma.event.findMany();

  // 前週・翌週
  const prevWeek = subWeeks(currentDate, 1);
  const nextWeek = addWeeks(currentDate, 1);

  return (
    <main className="p-8">
      <WeekNavigation
        currentWeekLabel={`${format(currentDate, "yyyy年M月d日")}`}
        prevHref={`/week/${format(prevWeek, "yyyy")}/${format(prevWeek, "M")}/${format(prevWeek, "d")}`}
        nextHref={`/week/${format(nextWeek, "yyyy")}/${format(nextWeek, "M")}/${format(nextWeek, "d")}`}
        monthHref={`/month/${format(currentDate, "yyyy")}/${format(currentDate, "M")}`}
      />

      <WeekCalendarClient currentDate={currentDate} initialEvents={events} />
    </main>
  );
}
