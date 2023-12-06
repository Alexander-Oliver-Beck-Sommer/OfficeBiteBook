"use client";
import React, { useRef } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import LocationIcon from "@/components/Icons/LocationIcon";

const types = (type) => {
  switch (type) {
    case "date":
      return <CalendarIcon className="fill-arsenic" />;
    case "time":
      return <TimeIcon className="fill-arsenic" />;
    case "location":
      return <LocationIcon className="fill-arsenic" />;
    default:
      return null;
  }
};

type TextInputProps = {
  type: string;
  label: string;
  value: string;
  name: string;
  placeholder: string;
  onValueChange: (value: string) => void;
};

const TextInput = ({
  type,
  label,
  value,
  name,
  placeholder,
  onValueChange,
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = React.useState(false);

  const typeIcon = types(type);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
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
    <section className="gap-2 relative flex flex-col">
      <label htmlFor={name} className="w-fit">
        <p
          className={`origin-bottom-left transition-all duration-300 ease-in-out ${labelFocus}`}
        >
          {name}
        </p>
      </label>
      <div className="border-arsenic relative w-full overflow-hidden rounded border-2">
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className="bg-eerie_black w-full p-4 text-ghost_white placeholder-opacity-100 outline-0 transition-all duration-300 ease-in-out placeholder:text-cool_grey placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
          id={name}
          name={name}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label={label}
          onChange={handleChange}
          value={value}
        />
        <button
          tabIndex="-1"
          aria-label={label}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onClick={handleIconClick}
          className="bg-eerie_black absolute inset-y-0 right-0 flex w-16 cursor-auto items-center justify-center"
        >
          {typeIcon}
        </button>
      </div>
    </section>
  );
};

export default TextInput;
