import React from "react";
import ToggleInput from "@/components/Inputs/ToggleInput";
import LockIcon from "@/components/Icons/LockIcon";

interface DayProps {
  /** Date of the day */
  date?: number;
  /** Day of the week */
  day?: string;
  /** Boolean to check if the day is the current day */
  currentDate?: boolean;
  /** Locked boolean - FALSE = LOCKED | TRUE = UNLOCKED */
  locked?: boolean;
  /** Function to toggle the lock of the day */
  lockToggle?: () => void;
  /** Published boolean - FALSE = UNPUBLISHED | TRUE = PUBLISHED */
  published?: boolean;
  /** Function to toggle the published state of the day */
  publishToggle?: () => void;
}

const Day: React.FC<DayProps> = ({
  date = 0,
  day,
  currentDate = false,
  locked = false,
  lockToggle = () => {},
  published = false,
  publishToggle = () => {},
}) => {
  return (
    <section className="bg-dark-300">
      <div
        className={`flex h-12 items-center justify-between border-t-2 px-3 transition-all duration-300 ease-in-out  ${
          currentDate
            ? published
              ? "border-red"
              : "border-primary"
            : "border-transparent"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold">{date}</h3>
          <p className="text-sm text-grey">{day}</p>
        </div>
        <button
          onClick={lockToggle}
          aria-label={locked ? "Locked" : "Unlocked"}
          title={locked ? "Locked" : "Unlocked"}
        >
          <LockIcon
            className={`transition-all duration-300 ease-in-out ${
              locked ? "fill-red" : "fill-primary"
            }`}
            variant={locked ? "locked" : "unlocked"}
          />
        </button>
      </div>
      <div
        className={`flex h-12 items-center justify-between border-b border-t border-t-dark-500 px-3 transition-all duration-300 ease-in-out ${
          published ? "border-b-dark-500" : "border-b-transparent"
        }`}
      >
        <ToggleInput
          label={published ? "Published" : "Unpublished"}
          onChange={publishToggle}
          initialValue={published}
        />
      </div>
    </section>
  );
};

export default Day;
