"use client";
import useTimeMachine from "@/hooks/useTimeMachine";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import Week from "@/components/Calendar/Week/Week";

type CalendarProps = {
  user?: any;
};

export default function Calendar({ user }: CalendarProps) {
  const {
    week,
    type,
    weekTypeSwitcher,
    hours,
    weekHighlighter,
    setWeekStart,
    setWeekEndTime,
    weekBackward,
    weekForward,
    weekReset,
    currentWeekNumber,
  } = useTimeMachine();

  return (
    <>
      <NavigationBar
        jumpBack={weekBackward}
        weekNumber={currentWeekNumber}
        jumpForward={weekForward}
        currentDateHighlight={weekHighlighter}
        currentDateReset={weekReset}
        typeToggle={weekTypeSwitcher}
      />
      <Week
        user={user}
        days={week.week_days}
        type={type}
        hours={hours()}
        weekNumber={currentWeekNumber}
      />
    </>
  );
}
