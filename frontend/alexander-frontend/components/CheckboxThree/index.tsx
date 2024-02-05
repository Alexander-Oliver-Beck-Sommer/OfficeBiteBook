import React, { useState, useEffect } from "react";
import CheckIcon from "../Icons/CheckIcon";
import CloseIcon from "../Icons/CloseIcon";
import QuestionIcon from "../Icons/QuestionIcon";

type CheckboxThreeProps = {
  initialValue?: boolean | null;
  label?: string;
  onChange?: (value: boolean | null) => void;
};

const CheckboxThree = ({
  initialValue = null,
  label = "",
  onChange,
}: CheckboxThreeProps) => {
  const [value, setValue] = useState<boolean | null>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInputChange = () => {
    const newValue = value === null ? false : value === false ? true : false;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const getCheckboxStyles = () => {
    if (value === true) {
      return "border-primary fill-primary";
    } else if (value === false) {
      return "border-red fill-red";
    }
    return "border-orange fill-orange";
  };

  const checkboxIcons =
    value === true ? (
      <CheckIcon />
    ) : value === false ? (
      <CloseIcon />
    ) : value === null ? (
      <QuestionIcon />
    ) : null;

  return (
    <div className="relative h-8 w-8 overflow-hidden">
      <input
        className="group absolute opacity-0"
        aria-label={label}
        type="checkbox"
        checked={value === true}
        readOnly
      />
      <label
        className={`absolute inset-0 flex cursor-pointer items-center justify-center rounded border-2 bg-dark-100 p-1 outline-primary transition-all duration-300 ease-in-out group-focus:outline ${getCheckboxStyles()}`}
        onClick={handleInputChange}
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === " " || e.key === "Enter") {
            handleInputChange();
          }
        }}
      >
        {checkboxIcons}
      </label>
    </div>
  );
};

export default CheckboxThree;
