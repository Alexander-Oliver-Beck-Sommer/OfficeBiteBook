"use client";
import useTimeMachine from "@/hooks/useTimeMachine";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import Week from "@/components/Calendar/Week/Week";

export default function Calendar() {
  const {
    week,
    weekType,
    setWeekType,
    weekHours,
    weekHighlighter,
    setWeekStart,
    setWeekEndTime,
    weekBackward,
    weekForward,
    weekReset,
    currentWeekNumber,
  } = useTimeMachine();

  return (
    <section aria-label="Calendar">
      <NavigationBar
        navigationBarWeekBackward={weekBackward}
        navigationBarWeekForward={weekForward}
        navigationBarWeekNumber={currentWeekNumber}
        navigationBarWeekHighlighterValue={weekHighlighter}
        navigationBarWeekHighlighterReset={weekReset}
      />
      <Week
        weekDays={week.week_days}
        weekType={weekType}
        weekHours={weekHours()}
      />
    </section>
  );
}
