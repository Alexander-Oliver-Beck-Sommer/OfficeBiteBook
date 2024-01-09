"use client";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import WeekGrid from "@/components/Calendar/WeekGrid/WeekGrid";
import useTimeCalculator from "@/hooks/useTimeCalculator";
import useTimeMachine from "@/hooks/useTimeMachine";

export default function Calendar() {
  const {
    currentDate,
    setCurrentDate,
    generateHourCells,
    getDates,
    getCurrentWeekNumber,
    settings,
  } = useTimeCalculator();

  const { week, setWeekType, hourCellsGeneration } = useTimeMachine();

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
