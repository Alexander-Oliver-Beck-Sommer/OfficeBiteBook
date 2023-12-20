"use client";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import WeekGrid from "@/components/Calendar/WeekGrid/WeekGrid";
import useTimeCalculator from "@/hooks/useTimeCalculator";

export default function Calendar() {
  const {
    currentDate,
    setCurrentDate,
    generateHourCells,
    getDates,
    getCurrentWeekNumber,
    settings,
  } = useTimeCalculator();

  return (
    <section aria-label="Calendar">
      <NavigationBar
        setCurrentDate={setCurrentDate}
        getCurrentWeekNumber={getCurrentWeekNumber}
      />
      <WeekGrid
        weekGridHours={generateHourCells}
        weekGridDates={getDates}
        weekGridSettings={settings}
      />
    </section>
  );
}
