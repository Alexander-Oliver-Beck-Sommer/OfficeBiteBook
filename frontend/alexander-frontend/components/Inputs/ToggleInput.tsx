import React, { useState } from "react";

type ToggleInputProps = {
  label?: string;
  trueValue: string;
  falseValue: string;
  toggle?: () => void;
};

const ToggleInput = ({
  label = "",
  trueValue,
  falseValue,
  toggle = () => {},
}: ToggleInputProps) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <h5 className={`${isChecked ? "text-apple" : "text-sunset_orange"}`}>
        {isChecked ? trueValue : falseValue}
      </h5>
      <label className="flex cursor-pointer select-none items-center">
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
              isChecked ? "border-apple" : "border-sunset_orange"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
              isChecked ? "translate-x-6 bg-apple" : "bg-sunset_orange"
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ToggleInput;
