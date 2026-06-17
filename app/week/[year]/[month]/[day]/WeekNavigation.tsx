import Link from "next/link";

type Props = {
  currentWeekLabel: string;
  prevHref: string;
  nextHref: string;
  monthHref: string;
};

export default function WeekNavigation({
  currentWeekLabel,
  prevHref,
  nextHref,
  monthHref,
}: Props) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <Link href={prevHref} className="rounded border px-3 py-1">
        前週
      </Link>

      <h1 className="text-3xl font-bold">{currentWeekLabel}</h1>

      <Link href={nextHref} className="rounded border px-3 py-1">
        翌週
      </Link>

      <Link href={monthHref} className="rounded border px-3 py-1">
        月
      </Link>
    </div>
  );
}
