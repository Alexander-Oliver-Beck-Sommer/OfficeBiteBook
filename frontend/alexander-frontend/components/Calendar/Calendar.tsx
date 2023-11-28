import NavigationBar from "./NavigationBar/NavigationBar"; // Week picker, month selector, and current week showcaser.
import ActionBar from "./ActionBar/ActionBar"; // Publish buttons, lock buttons, clear button, and lock time showcaser.
import WeeklySchedule from "./WeeklySchedule/WeeklySchedule";
import WeekGrid from "./WeekGrid/WeekGrid"; // The actual calendar (the grid of days and times).

export default function CalendarUI() {
  return (
    <section aria-label="Calendar">
      {/* <NavigationBar />
      <ActionBar /> */}
      <WeekGrid />
    </section>
  );
}
