import React from "react";
import CheckIcon from "@/components/Icons/CheckIcon";
import CancelIcon from "@/components/Icons/CancelIcon";
import QuestionIcon from "@/components/Icons/QuestionIcon";
import GroupIcon from "@/components/Icons/GroupIcon";

type AttendantsCellProps = {
  acceptValue: number;
  acceptToggle: () => void;
  declineValue: number;
  declineToggle: () => void;
  pendingValue: number;
  pendingToggle: () => void;
  guestValue: number;
  guestToggle: () => void;
};

const AttendantsCell = ({
  acceptValue,
  acceptToggle,
  declineValue,
  declineToggle,
  pendingValue,
  pendingToggle,
  guestValue,
  guestToggle,
}: AttendantsCellProps) => {
  return (
    <ul className="bg-raisin_black flex h-24 w-full items-center justify-between px-4 py-5">
      <li>
        <button
          className="gap-2 flex flex-col items-center"
          onClick={acceptToggle}
        >
          <h3>{acceptValue}</h3>
          <CheckIcon className="h-7 w-7 fill-ghost_white" variant="enabled" />
        </button>
      </li>
      <li>
        <button
          className="gap-2 flex flex-col items-center"
          onClick={declineToggle}
        >
          <h3>{declineValue}</h3>
          <CancelIcon className="h-7 w-7 fill-ghost_white" variant="enabled" />
        </button>
      </li>
      <li>
        <button
          className="gap-2 flex flex-col items-center"
          onClick={pendingToggle}
        >
          <h3>{pendingValue}</h3>
          <QuestionIcon
            className="h-7 w-7 fill-ghost_white"
            variant="enabled"
          />
        </button>
      </li>
      <li>
        <button
          className="gap-2 flex flex-col items-center"
          onClick={guestToggle}
        >
          <h3>{guestValue}</h3>
          <GroupIcon className="h-7 w-7 fill-ghost_white" variant="enabled" />
        </button>
      </li>
    </ul>
  );
};

export default AttendantsCell;
