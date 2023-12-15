function getCurrentWeekNumber() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (today.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export default function WeekHighlighter() {
  const weekNumber = getCurrentWeekNumber();

  return (
    <h4 className="font-normal" aria-live="polite">
      Currently: <span className="font-semibold">Week {weekNumber}</span>
    </h4>
  );
}
