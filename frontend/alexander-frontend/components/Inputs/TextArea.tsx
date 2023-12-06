"use client";
import React from "react";

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
    <section className="gap-2 relative flex flex-col">
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
        className="bg-eerie_black border-arsenic resize-none rounded border-2 px-4 py-4 text-ghost_white placeholder-opacity-100 outline-none transition-all duration-300 ease-in-out placeholder:text-cool_grey placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
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
