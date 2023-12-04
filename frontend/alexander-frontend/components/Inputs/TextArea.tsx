"use client";
import React, { useRef } from "react";

type TextAreaProps = {
  label: string;
  rows: string;
  name: string;
  placeholder: string;
  onValueChange: (value: string) => void;
};

const TextArea = ({
  label,
  rows,
  name,
  placeholder,
  onValueChange,
}: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(event.target.value);
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

  if (!label) {
    throw new Error(
      "Please provide information what the TextArea component does: label='Click to edit the location where the menu will take place'",
    );
  }

  if (!name) {
    throw new Error(
      "Please provide a name for the TextArea component: name='Location'",
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
      <textarea
        rows={rows}
        ref={textAreaRef}
        placeholder={placeholder}
        className="resize-none rounded border-2 border-davys_grey bg-dark_gunmetal px-15 py-15 text-base text-ghost_white placeholder-opacity-100 outline-none transition-all duration-300 ease-in-out placeholder:text-cool_grey placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
        id={name}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        aria-label={label}
        onChange={handleChange}
      ></textarea>
    </section>
  );
};

export default TextArea;
