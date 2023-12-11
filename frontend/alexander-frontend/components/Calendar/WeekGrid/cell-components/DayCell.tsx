import React from "react";
import LockIcon from "@/components/Icons/LockIcon";

type DayCellProps = {
  dayName: string;
  dayDate: number;
  lockToggle: () => void;
};

const DayCell = ({
  dayName,
  dayDate,
  lockToggle,
  isCurrentDay,
}: DayCellProps) => {
  const cellClass = isCurrentDay ? "border-true_blue" : "border-transparent";

  return (
    <section
      className={`flex h-20 w-full items-center justify-between border-t-4 bg-raisin_black px-4 ${cellClass}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="leading-none">{dayDate}</h2>
        <h5>{dayName}</h5>
      </div>
      <button onClick={lockToggle}>
        <LockIcon className="h-6 w-6 fill-ghost_white" variant="outlined" />
      </button>
    </section>
  );
};

export default DayCell;
