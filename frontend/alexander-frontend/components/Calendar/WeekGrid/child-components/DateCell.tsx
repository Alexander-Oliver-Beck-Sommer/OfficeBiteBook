import React from "react";
import LockIcon from "@/components/Icons/LockIcon";

type DateCellProps = {
  dayName: string;
  dayDate: number;
  lockToggle: () => void;
};

const DateCell = ({
  dayName,
  dayDate,
  lockToggle,
  isCurrentDay,
}: DateCellProps) => {
  const cellClass = isCurrentDay ? "border-rajah " : "border-transparent";

  return (
    <section
      className={`flex h-16 w-full items-center justify-between border-t-4 bg-gunmetal px-4 py-5 ${cellClass}`}
    >
      <div className="gap-2 flex items-end">
        <h2 className="leading-none">{dayDate}</h2>
        <h5>{dayName}</h5>
      </div>
      <button onClick={lockToggle}>
        <LockIcon className="h-6 w-6 fill-ghost_white" variant="outlined" />
      </button>
    </section>
  );
};

export default DateCell;
