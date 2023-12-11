// This component has independent functionality as it is not related to the WeekFlipper component.

function getCurrentWeekNumber() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export default function WeekHighlighter() {
  const weekNumber = getCurrentWeekNumber();

  return (
    <h4 aria-live="polite">
      <span className="font-normal">Currently: </span>
      Week {weekNumber}
    </h4>
  );
}
