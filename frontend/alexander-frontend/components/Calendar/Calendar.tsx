"use client";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import WeekGrid from "@/components/Calendar/WeekGrid/WeekGrid";
import useTimeCalculator from "@/hooks/useTimeCalculator";
import useTimeMachine from "@/hooks/useTimeMachine";
import Week from "@/components/Calendar/Week/Week";

export default function Calendar() {
  const {
    currentDate,
    setCurrentDate,
    generateHourCells,
    getDates,
    getCurrentWeekNumber,
    settings,
  } = useTimeCalculator();

  const {
    week,
    weekType,
    setWeekType,
    hourCellsGeneration,
    setWeekStart,
    setWeekEndTime,
    goToPreviousWeek,
    goToNextWeek,
    currentWeekNumber,
  } = useTimeMachine();

  return (
    <section aria-label="Calendar">
      {/* <NavigationBar
        setCurrentDate={setCurrentDate}
        getCurrentWeekNumber={getCurrentWeekNumber}
      />
      <WeekGrid
        weekGridHours={generateHourCells}
        weekGridDates={getDates}
        weekGridSettings={settings}
      /> */}
      <NavigationBar
        buttonBack={goToPreviousWeek}
        buttonForward={goToNextWeek}
        getCurrentWeekNumber={currentWeekNumber}
      />
      <Week
        weekDays={week.week_days}
        weekType={weekType}
        weekHourCells={hourCellsGeneration()}
      />
    </section>
  );
}
