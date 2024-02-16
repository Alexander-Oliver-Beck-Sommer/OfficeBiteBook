import LockIcon from "@/components/Icons/LockIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import { useEffect } from "react";

type DayCellProps = {
  day?: string;
  date?: number;
  lockToggle?: () => void;
  dayCellSettings?: () => void;
  currentDay: boolean;
  lockedValue?: boolean;
};

const DayCell = ({
  day = "",
  date = 0,
  lockToggle = () => {},
  dayCellSettings = () => {},
  currentDay = false,
  lockedValue = false,
}: DayCellProps) => {
  const currentDateStyling = currentDay
    ? "border-primary"
    : "border-transparent";

  return (
    <section
      className={`flex h-[70px] w-full items-center justify-between border-t-4 bg-dark-300 px-4 ${currentDateStyling}`}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-bold">{date}</h3>
        <h5 className="text-grey">{day}</h5>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={lockToggle}>
          <LockIcon
            className={`transition-all duration-300 ease-in-out ${
              lockedValue ? "fill-red" : "fill-primary"
            }`}
            variant={lockedValue ? "locked" : "unlocked"}
          />
        </button>
      </div>
    </section>
  );
};

export default DayCell;
