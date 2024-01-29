import React, { useState } from "react";

type ToggleInputProps = {
  label?: string;
  trueValue: string;
  falseValue: string;
  toggle?: () => void;
  className?: string;
};

const ToggleInput = ({
  label = "",
  trueValue,
  falseValue,
  toggle = () => {},
  className = "",
}: ToggleInputProps) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <h5 className={`${isChecked ? "text-primary" : "text-red"}`}>
        {isChecked ? trueValue : falseValue}
      </h5>
      <label
        className={`flex cursor-pointer select-none items-center ${className}`}
      >
        <div className="relative">
          <input
            onClick={toggle}
            aria-label={label}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-6 w-12 rounded-full border transition-all duration-300 ease-in-out ${
              isChecked ? "border-primary" : "border-red"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
              isChecked ? "bg-primary translate-x-6" : "bg-red"
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ToggleInput;
