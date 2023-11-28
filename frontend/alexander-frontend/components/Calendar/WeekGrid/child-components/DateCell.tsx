import React from "react";
import LockIcon from "@/components/Icons/LockIcon";

type DateCellProps = {
  dayName: string;
  dayDate: number;
  lockToggle: () => void;
};

const DateCell = ({ dayName, dayDate, lockToggle }: DateCellProps) => {
  return (
    <section className="flex h-65 w-full items-center justify-between bg-gunmetal px-15 py-20">
      <div className="flex items-end gap-8">
        <h2 className="leading-100">{dayDate}</h2>
        <h5>{dayName}</h5>
      </div>
      <button onClick={lockToggle}>
        <LockIcon className="h-24 w-24 fill-ghost_white" variant="outlined" />
      </button>
    </section>
  );
};

export default DateCell;
