"use client";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import ActionBar from "@/components/Calendar/ActionBar/ActionBar";
import WeeklySchedule from "@/components/Calendar/WeeklySchedule/WeeklySchedule";
import WeekGrid from "@/components/Calendar/WeekGrid/WeekGrid";
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
