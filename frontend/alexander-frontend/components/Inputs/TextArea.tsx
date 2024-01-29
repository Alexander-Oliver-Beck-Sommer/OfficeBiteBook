"use client";
import React from "react";

type TextAreaProps = {
  label?: string;
  rows: number;
  name?: string;
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
};

const TextArea = ({
  label = "",
  rows,
  name = "",
  placeholder = "",
  value = "",
  onValueChange = () => {},
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
    isFocused ? "scale-75 text-grey" : "scale-100 text-white"
  }`;

  return (
    <section className="relative flex flex-col gap-4">
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
        className="border-dark-500 placeholder:text-grey text-white resize-none rounded border-2 bg-dark-100 px-4 py-4 placeholder-opacity-100 outline-none transition-all duration-300 ease-in-out placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
        id={name}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        aria-label={label}
        onChange={handleChange}
        value={value}
      ></textarea>
    </section>
  );
};

export default TextArea;
