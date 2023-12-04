"use client";
import React from "react";

type TextAreaProps = {
  label: string; // Describe what the textarea does.
  rows: string; // Choose how many rows the textarea should have.
  name: string; // Provide a name for the textarea.
  placeholder: string; // Provide a placeholder for the textarea.
  onValueChange: (value: string) => void; // Provide a function to handle the textarea value.
};

const TextArea = ({
  label,
  rows,
  name,
  placeholder,
  onValueChange,
}: TextAreaProps) => {
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
    throw new Error("Provide a label for the textarea.");
  }

  if (!name) {
    throw new Error("Provide a name for the textarea.");
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
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="resize-none rounded border-2 border-davys_grey bg-dark_gunmetal px-16 py-16 text-ghost_white placeholder-opacity-100 outline-none transition-all duration-300 ease-in-out placeholder:text-cool_grey placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
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
