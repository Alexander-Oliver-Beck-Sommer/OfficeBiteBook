"use client";
import React, { useRef } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import LocationIcon from "@/components/Icons/LocationIcon";

const types = (type) => {
  switch (type) {
    case "date":
      return <CalendarIcon className="fill-davys_grey" />;
    case "time":
      return <TimeIcon className="fill-davys_grey" />;
    case "location":
      return <LocationIcon className="fill-davys_grey" />;
    default:
      return null;
  }
};

type TextInputProps = {
  type: string; // Provide a type for the input.
  label: string; // Describe what the input does.
  value: string; // Provide a value for the input.
  name: string; // Provide a name for the input.
  placeholder: string; // Provide a placeholder for the input.
  onValueChange: (value: string) => void; // Provide a function to handle the input value.
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
    <section className="relative flex flex-col gap-8">
      <label htmlFor={name} className="w-fit">
        <p
          className={`origin-bottom-left transition-all duration-300 ease-in-out ${labelFocus}`}
        >
          {name}
        </p>
      </label>
      <div className="relative w-full overflow-hidden rounded border-2 border-davys_grey">
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className="w-full bg-dark_gunmetal p-16 text-ghost_white placeholder-opacity-100 outline-none transition-all duration-300 ease-in-out placeholder:text-cool_grey placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
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
          className="absolute inset-y-0 right-0 flex w-60 cursor-auto items-center justify-center bg-dark_gunmetal"
        >
          {typeIcon}
        </button>
      </div>
    </section>
  );
};

export default TextInput;
