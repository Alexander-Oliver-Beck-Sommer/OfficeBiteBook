"use client";
import NavigationBar from "./NavigationBar/NavigationBar";
import ActionBar from "./ActionBar/ActionBar";
import WeeklySchedule from "./WeeklySchedule/WeeklySchedule";
import WeekGrid from "./WeekGrid/WeekGrid";
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
