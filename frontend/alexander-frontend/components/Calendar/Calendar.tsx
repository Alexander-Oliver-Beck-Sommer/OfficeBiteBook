"use client";
import useTimeMachine from "@/hooks/useTimeMachine";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import Week from "@/components/Calendar/Week/Week";

type CalendarProps = {
  calendarUser: any;
};

export default function Calendar({ calendarUser }) {
  const {
    week,
    weekType,
    weekTypeSwitcher,
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
    <section aria-label="Calendar" className="flex-1">
      <NavigationBar
        navigationBarWeekBackward={weekBackward}
        navigationBarWeekForward={weekForward}
        navigationBarWeekNumber={currentWeekNumber}
        navigationBarWeekHighlighterValue={weekHighlighter}
        navigationBarWeekHighlighterReset={weekReset}
        navigationBarWeekTypeSwitcherToggle={weekTypeSwitcher}
      />
      <Week
        weekUser={calendarUser}
        weekDays={week.week_days}
        weekType={weekType}
        weekHours={weekHours()}
        weekNumber={currentWeekNumber}
      />
    </section>
  );
}
