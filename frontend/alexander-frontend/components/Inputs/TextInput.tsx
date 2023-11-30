"use client";
import React from "react";

type TextInputProps = {
  label: string; // Required. Write what purpose/role the component serves.
  name: string; // Required. Write a name for the input field.
  placeholder: string; // Required. Write a placeholder for the input field.
};

const TextInput = ({ label, name, placeholder }: TextInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

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
      "Please provide information what the TextInput component does: label={'Click to edit Location!'}",
    );
  }

  if (!placeholder) {
    throw new Error(
      "Please provide information what the TextInput component does: label={'Click to edit Location!'}",
    );
  }

  if (!name) {
    throw new Error(
      "Please provide a name for the TextInput component: ={'Location'}",
    );
  }
  return (
    <section className="flex flex-col gap-8">
      <label htmlFor={name} className="flex w-fit items-end justify-start">
        <h3
          className={`duration-300  origin-bottom-left transition-all ease-in-out ${labelFocus}`}
        >
          {name}*
        </h3>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="h-fit rounded border-2 border-davys_grey bg-dark_gunmetal px-15 py-15 text-ghost_white placeholder-opacity-100 outline-none transition-all duration-300 ease-in-out placeholder:italic placeholder:text-cool_grey placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0"
        id={name}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        aria-label={label}
      />
    </section>
  );
};

export default TextInput;
