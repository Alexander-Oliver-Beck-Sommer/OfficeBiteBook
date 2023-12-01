"use client";
import React, { useRef } from "react";
import TimeIcon from "../Icons/TimeIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import LocationIcon from "../Icons/LocationIcon";

const selectIcon = (type) => {
  switch (type) {
    case "date":
      return <CalendarIcon className="h-24 w-24 fill-davys_grey" />;
    case "time":
      return <TimeIcon className="h-24 w-24 fill-davys_grey" />;
    case "location":
      return <LocationIcon className="h-24 w-24 fill-davys_grey" />;
    default:
      return null;
  }
};

type TextInputProps = {
  type: string; // Optional. Choose which type of input field you want to use.
  label: string; // Required. Write what purpose/role the component serves.
  name: string; // Required. Write a name for the input field and label.
  placeholder: string; // Required. Write a placeholder for the input field.
  onValueChange: (value: string) => void;
};

const TextInput = ({
  type,
  label,
  name,
  placeholder,
  onValueChange,
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = React.useState(false);

  const iconComponent = selectIcon(type);

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
    throw new Error(
      "Please provide what type the TextInput component is: type='text'",
    );
  }

  if (!label) {
    throw new Error(
      "Please provide information what the TextInput component does: label='Click to edit the location where the menu will take place'",
    );
  }

  if (!placeholder) {
    throw new Error(
      "Please provide information what the TextInput component does: placeholder='Write a location for the menu!'",
    );
  }

  if (!name) {
    throw new Error(
      "Please provide a name for the TextInput component: name='Location'",
    );
  }
  return (
    <section className="relative flex flex-col gap-8">
      <label htmlFor={name} className="flex w-fit items-end justify-start">
        <p
          className={`origin-bottom-left  transition-all duration-300 ease-in-out ${labelFocus}`}
        >
          {name}*
        </p>
      </label>
      <div className="relative w-full overflow-hidden rounded border-2 border-davys_grey">
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className="h-fit w-full bg-dark_gunmetal px-15 py-15 text-ghost_white placeholder-opacity-100 outline-none transition-all duration-300 ease-in-out placeholder:text-cool_grey placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
          id={name}
          name={name}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label={label}
          onChange={handleChange}
        />
        <button
          aria-label={label}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onClick={handleIconClick}
          className="absolute outline-none bottom-0 right-0 top-0 flex w-60 cursor-auto items-center justify-center bg-dark_gunmetal"
        >
          {iconComponent}
        </button>
      </div>
    </section>
  );
};

export default TextInput;
