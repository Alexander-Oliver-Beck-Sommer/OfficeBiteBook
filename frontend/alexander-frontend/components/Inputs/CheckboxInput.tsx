import React, { useState } from "react";
import CheckIcon from "../Icons/CheckIcon";
import CloseIcon from "../Icons/CloseIcon";

type CheckboxInputProps = {
  initialChecked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
};

const CheckboxInput = ({
  initialChecked = false,
  label = "",
  onChange,
}: CheckboxInputProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleInputChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  const checkboxStyles = isChecked
    ? "border-apple fill-apple"
    : "border-sunset_orange fill-sunset_orange";

  const checkboxIcons = isChecked ? (
    <CheckIcon className="animate-fade-down animate-duration-200 animate-ease-in-out" />
  ) : (
    <CloseIcon className="animate-fade-up animate-duration-200 animate-ease-in-out" />
  );

  return (
    <div className="relative h-8 w-8 overflow-hidden">
      <input
        className="group opacity-0"
        aria-label={label}
        type="checkbox"
        checked={isChecked}
        onChange={handleInputChange}
      />
      <label
        className={`absolute inset-0 flex cursor-pointer items-center justify-center rounded border p-1 outline-apple transition-all duration-300 ease-in-out group-focus:outline ${checkboxStyles}`}
        onClick={handleInputChange}
      >
        {checkboxIcons}
      </label>
    </div>
  );
};

export default CheckboxInput;
