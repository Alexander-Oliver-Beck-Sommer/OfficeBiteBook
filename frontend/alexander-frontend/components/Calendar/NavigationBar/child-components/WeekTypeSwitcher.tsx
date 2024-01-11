import { useState } from "react";
import CalendarIcon from "@/components/Icons/CalendarIcon";

type WeekTypeSwitcherProps = {
  weekTypeSwitcherToggle: () => void;
};

const WeekTypeSwitcher = ({
  weekTypeSwitcherToggle = () => {},
}: WeekTypeSwitcherProps) => {
  const [weekType, setWeekType] = useState(false);
  const fullWeek = weekType ? "fill-ghost_white" : "fill-arsenic";
  const workWeek = weekType ? "fill-arsenic" : "fill-ghost_white";

  const weekTypeChange = () => {
    setWeekType(!weekType);
    weekTypeSwitcherToggle();
  };

  return (
    <button
      aria-label={
        weekType ? "Switch to work week view" : "Switch to full week view"
      }
      title={weekType ? "Switch to work week view" : "Switch to full week view"}
      onClick={weekTypeChange}
      aria-pressed={weekType}
      className="flex items-center gap-3"
    >
      <CalendarIcon
        className={`transition-all duration-300 ease-in-out ${workWeek}`}
      />
      <CalendarIcon
        variant="fullWeek"
        className={`transition-all duration-300 ease-in-out ${fullWeek}`}
      />
    </button>
  );
};

export default WeekTypeSwitcher;
