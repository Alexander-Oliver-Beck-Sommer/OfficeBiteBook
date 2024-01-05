"use client";
import React, { useRef } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import TextIcon from "@/components/Icons/TextIcon";

const types = (type: string) => {
  switch (type) {
    case "text":
      return <TextIcon />;
    case "date":
      return <CalendarIcon />;
    case "time":
      return <TimeIcon />;
    default:
      return null;
  }
};

type TextInputProps = {
  textInputType?: string;
  textInputLabel?: string;
  textInputValue?: string;
  textInputName?: string;
  textInputPlaceholder?: string;
  textInputValid?: boolean;
  textInputRequired?: boolean;
  textInputValueChange: (value: string) => void;
};

const TextInput = ({
  textInputType = "",
  textInputLabel = "",
  textInputValue = "",
  textInputName = "",
  textInputPlaceholder = "",
  textInputValid,
  textInputRequired,
  textInputValueChange = () => {},
}: TextInputProps) => {
  const inputField = useRef<HTMLInputElement>(null);

  const invalidText = textInputValid
    ? "text-sunset_orange"
    : "text-ghost_white";

  const invalidBorder = textInputValid
    ? "border-sunset_orange"
    : "border-arsenic";

  const invalidPlaceholder = textInputValid
    ? "placeholder:text-sunset_orange"
    : "placeholder:text-cool_grey";

  const invalidIcon = textInputValid ? "fill-sunset_orange" : "fill-arsenic";

  const [isFocused, setIsFocused] = React.useState(false);

  const textInputIcon = types(textInputType);

  // This is functionality is to remove the seconds from the time input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let timeValue = event.target.value;
    if (textInputType === "time") {
      timeValue = timeValue.substring(0, 5);
    }
    textInputValueChange(timeValue);
  };

  const textInputIconClick = () => {
    inputField.current?.focus();
  };

  const textInputFocus = () => {
    setIsFocused(true);
  };

  const textInputBlur = () => {
    setIsFocused(false);
  };

  const textInputLabelFocus = `${
    isFocused ? "scale-75 text-cool_grey" : "scale-100 text-ghost_white"
  }`;

  if (!textInputType) {
    throw new Error("Provide a type for the TextInput.");
  }

  if (!textInputLabel) {
    throw new Error("Provide a label for the TextInput.");
  }

  if (!textInputName) {
    throw new Error("Provide a name for the TextInput.");
  }
  return (
    <section className="relative flex flex-col gap-4">
      <label htmlFor={textInputName} className="w-fit">
        <p
          className={`origin-bottom-left  transition-all duration-300 ease-in-out ${textInputLabelFocus} ${invalidText}`}
        >
          {textInputName}
        </p>
      </label>
      <div
        className={`relative w-full overflow-hidden rounded border-2 transition-all duration-300 ease-in-out ${invalidBorder}`}
      >
        <input
          ref={inputField}
          type={textInputType}
          placeholder={textInputPlaceholder}
          className={`w-full bg-eerie_black p-4 placeholder-opacity-100 outline-0 transition-all duration-300 ease-in-out ${invalidPlaceholder} ${invalidText} placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0`}
          id={textInputName}
          name={textInputName}
          onBlur={textInputBlur}
          onFocus={textInputFocus}
          aria-label={textInputLabel}
          onChange={handleChange}
          value={textInputValue}
          required={textInputRequired}
        />
        <button
          tabIndex={-1}
          aria-label={textInputLabel}
          onBlur={textInputBlur}
          onFocus={textInputFocus}
          onClick={textInputIconClick}
          className={`absolute inset-y-0 right-0 flex w-16 cursor-auto items-center justify-center bg-eerie_black ${invalidIcon}`}
        >
          {textInputIcon}
        </button>
      </div>
    </section>
  );
};

export default TextInput;
