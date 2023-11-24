// This component is used to higlight the current week in the real world, and not the chosen week in the calendar

function getCurrentWeekNumber() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export default function WeekHighlighter() {
  const weekNumber = getCurrentWeekNumber();

  return (
    <h3>
      <span className="font-normal">Currently: </span>
      Week {weekNumber}
    </h3>
  );
}
