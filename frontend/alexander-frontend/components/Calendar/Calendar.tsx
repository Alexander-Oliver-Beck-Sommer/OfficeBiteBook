"use client";
import NavigationBar from "./NavigationBar/NavigationBar"; // Week picker, month selector, and current week showcaser.
import ActionBar from "./ActionBar/ActionBar"; // Publish buttons, lock buttons, clear button, and lock time showcaser.
import WeeklySchedule from "./WeeklySchedule/WeeklySchedule";
import WeekGrid from "./WeekGrid/WeekGrid"; // The actual calendar (the grid of days and times).
import useTimeCalculator from "@/hooks/useTimeCalculator";

export default function Calendar() {
  const {
    currentDate,
    setCurrentDate,
    generateTimeSlots,
    getWeekDates,
    getCurrentWeekNumber,
    settings,
  } = useTimeCalculator();

  return (
    <section aria-label="Calendar">
      <NavigationBar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        getCurrentWeekNumber={getCurrentWeekNumber}
      />
      <ActionBar />
      <WeekGrid
        currentDate={currentDate}
        generateTimeSlots={generateTimeSlots}
        getWeekDates={getWeekDates}
        settings={settings}
      />
    </section>
  );
}
