"use client";
import React, { useRef } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import TitleIcon from "@/components/Icons/TitleIcon";

const types = (type: string) => {
  switch (type) {
    case "date":
      return <CalendarIcon />;
    case "time":
      return <TimeIcon />;
    case "location":
      return <LocationIcon />;
    case "title":
      return <TitleIcon />;
    default:
      return null;
  }
};

type TextInputProps = {
  type?: string;
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  isInvalid?: boolean;
  onValueChange: (value: string) => void;
};

const TextInput = ({
  type = "",
  label = "",
  value = "",
  name = "",
  placeholder = "",
  isInvalid = false,
  onValueChange = () => {},
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const errorText = isInvalid ? "text-sunset_orange" : "";

  const errorBorder = isInvalid ? "border-sunset_orange" : "";

  const errorPlaceholder = isInvalid ? "placeholder:text-sunset_orange" : "";

  const errorIcon = isInvalid ? "fill-sunset_orange" : "";

  const [isFocused, setIsFocused] = React.useState(false);

  const typeIcon = types(type);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let timeValue = event.target.value;
    if (type === "time") {
      timeValue = timeValue.substring(0, 5);
    }
    onValueChange(timeValue);
  };

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelFocus = `${
    isFocused ? "scale-75 text-cool_grey" : "scale-100 text-ghost_white"
  }`;

  if (!type) {
    throw new Error("Provide a type for the input.");
  }

  if (!label) {
    throw new Error("Provide a label for the input.");
  }

  if (!name) {
    throw new Error("Provide a name for the input.");
  }
  return (
    <section className="relative flex flex-col gap-4">
      <label htmlFor={name} className="w-fit">
        <p
          className={`origin-bottom-left text-ghost_white transition-all duration-300 ease-in-out ${labelFocus} ${errorText}`}
        >
          {name}
        </p>
      </label>
      <div
        className={`relative w-full overflow-hidden rounded border-2  border-arsenic transition-all duration-300 ease-in-out ${errorBorder}`}
      >
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-eerie_black p-4 text-ghost_white placeholder-opacity-100 outline-0 transition-all duration-300 ease-in-out placeholder:text-cool_grey ${errorPlaceholder} placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0`}
          id={name}
          name={name}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label={label}
          onChange={handleChange}
          value={value}
        />
        <button
          tabIndex={-1}
          aria-label={label}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onClick={handleIconClick}
          className={`absolute inset-y-0 right-0 flex w-16 cursor-auto items-center justify-center bg-eerie_black fill-arsenic ${errorIcon}`}
        >
          {typeIcon}
        </button>
      </div>
    </section>
  );
};

export default TextInput;
