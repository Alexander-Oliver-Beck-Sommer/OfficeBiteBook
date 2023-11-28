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
    <ul className="flex h-100 w-full items-center justify-between bg-gunmetal px-15 py-20">
      <li>
        <button
          className="flex flex-col items-center gap-8"
          onClick={acceptToggle}
        >
          <h3>{acceptValue}</h3>
          <CheckIcon className="h-30 w-30 fill-ghost_white" variant="enabled" />
        </button>
      </li>
      <li>
        <button
          className="flex flex-col items-center gap-8"
          onClick={declineToggle}
        >
          <h3>{declineValue}</h3>
          <CancelIcon
            className="h-30 w-30 fill-ghost_white"
            variant="enabled"
          />
        </button>
      </li>
      <li>
        <button
          className="flex flex-col items-center gap-8"
          onClick={pendingToggle}
        >
          <h3>{pendingValue}</h3>
          <QuestionIcon
            className="h-30 w-30 fill-ghost_white"
            variant="enabled"
          />
        </button>
      </li>
      <li>
        <button
          className="flex flex-col items-center gap-8"
          onClick={guestToggle}
        >
          <h3>{guestValue}</h3>
          <GroupIcon className="h-30 w-30 fill-ghost_white" variant="enabled" />
        </button>
      </li>
    </ul>
  );
};

export default AttendantsCell;
