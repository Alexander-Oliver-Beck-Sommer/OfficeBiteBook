"use client";
import useTimeMachine from "@/hooks/useTimeMachine";
import NavigationBar from "@/components/Calendar/NavigationBar";
import Week from "@/components/Calendar/Week";

type CalendarProps = {
  userId?: string;
};

export default function Calendar({ userId }: CalendarProps) {
  const {
    week,
    type,
    weekTypeSwitcher,
    hours,
    weekHighlighter,
    weekBackward,
    weekForward,
    weekReset,
    currentWeekNumber,
    lockDay,
    togglePublished,
  } = useTimeMachine(userId);

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
        lockDay={lockDay}
        togglePublished={togglePublished}
      />
    </>
  );
}
