import Link from "next/link";

type Props = {
  currentMonthLabel: string;
  prevHref: string;
  nextHref: string;
  weekHref: string;
};

export default function CalendarNavigation({
  currentMonthLabel,
  prevHref,
  nextHref,
  weekHref,
}: Props) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <Link href={prevHref} className="rounded border px-3 py-1">
        前月
      </Link>

      <h1 className="text-3xl font-bold">{currentMonthLabel}</h1>

      <Link href={nextHref} className="rounded border px-3 py-1">
        翌月
      </Link>

      <Link href={weekHref} className="rounded border px-3 py-1">
        週
      </Link>
    </div>
  );
}
