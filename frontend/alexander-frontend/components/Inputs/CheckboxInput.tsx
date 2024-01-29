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
    ? "border-primary fill-primary"
    : "border-dark-500 fill-grey";

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
        className={`outline-primary absolute inset-0 flex cursor-pointer items-center justify-center rounded border-2 p-1 transition-all duration-300 ease-in-out group-focus:outline ${checkboxStyles}`}
        onClick={handleInputChange}
      >
        {checkboxIcons}
      </label>
    </div>
  );
};

export default CheckboxInput;
