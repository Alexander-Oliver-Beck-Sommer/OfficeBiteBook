import React, { useState, useEffect } from "react";
import CheckIcon from "../Icons/CheckIcon";
import CloseIcon from "../Icons/CloseIcon";
import QuestionIcon from "../Icons/QuestionIcon";

type CheckboxInputProps = {
  initialState?: "notResponded" | "declined" | "accepted";
  label?: string;
  onChange?: (state: "notResponded" | "declined" | "accepted") => void;
};

const CheckboxInput = ({
  initialState = "notResponded",
  label = "",
  onChange,
}: CheckboxInputProps) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const handleInputChange = () => {
    const newState =
      state === "notResponded"
        ? "declined"
        : state === "declined"
          ? "accepted"
          : "notResponded";
    setState(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  const checkboxStyles =
    state === "accepted"
      ? "border-primary fill-primary"
      : state === "declined"
        ? "border-red fill-red"
        : "border-dark-500 fill-grey";

  const checkboxIcons =
    state === "accepted" ? (
      <CheckIcon />
    ) : state === "declined" ? (
      <CloseIcon />
    ) : (
      <QuestionIcon />
    );

  return (
    <div className="relative h-8 w-8 overflow-hidden">
      <input
        className="group opacity-0"
        aria-label={label}
        type="checkbox"
        checked={state !== "notResponded"}
        readOnly
      />
      <label
        className={`absolute inset-0 flex cursor-pointer items-center justify-center rounded border-2 bg-dark-100 p-1 outline-primary transition-all duration-300 ease-in-out group-focus:outline ${checkboxStyles}`}
        onClick={handleInputChange}
      >
        {checkboxIcons}
      </label>
    </div>
  );
};

export default CheckboxInput;
