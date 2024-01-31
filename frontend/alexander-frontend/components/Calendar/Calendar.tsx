"use client";
import useTimeMachine from "@/hooks/useTimeMachine";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import Week from "@/components/Calendar/Week/Week";

type CalendarProps = {
  user?: any;
  userId?: string;
};

export default function Calendar({ user, userId, userEmail }: CalendarProps) {
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
        userId={userId}
        days={week.week_days}
        type={type}
        hours={hours()}
        weekNumber={currentWeekNumber}
      />
    </>
  );
}
