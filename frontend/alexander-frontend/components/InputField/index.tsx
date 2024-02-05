import React, { useRef, useState } from "react";
import TextIcon from "../Icons/TextIcon";
import LocationIcon from "../Icons/LocationIcon";

const icons = (icon: string) => {
  switch (icon) {
    case "text":
      return <TextIcon />;
    case "location":
      return <LocationIcon />;
  }
};

type InputFieldProps = {
  icon?: string;
  type?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  valid?: boolean;
  required?: boolean;
};

const InputField = ({
  icon = "text",
  type = "text",
  label = "",
  name = "",
  placeholder = "",
  valid = true,
  required = false,
}: InputFieldProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const labelFocus = `${isFocused ? "scale-75" : "scale-100"}`;

  const textInputBlur = () => {
    setIsFocused(false);
  };
  const textInputFocus = () => {
    setIsFocused(true);
  };
  const textInputIconClick = () => {
    ref.current?.focus();
  };

  const iconValue = icons(icon);

  return (
    <section className="relative flex flex-col gap-2 fill-grey md:gap-4">
      <label htmlFor={name} className="w-fit">
        <p
          className={`text_white origin-bottom-left text-sm text-grey transition-all duration-300 ease-in-out md:text-base ${labelFocus}`}
        >
          {name}
        </p>
      </label>
      <div className="relative w-full overflow-hidden rounded border-2 border-dark-500 transition-all duration-300 ease-in-out">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="text_white placeholder:text-test_grey w-full bg-dark-100 p-3 placeholder-opacity-100 outline-0 transition-all duration-300 ease-in-out placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0 md:p-4"
          id={name}
          name={name}
          onBlur={textInputBlur}
          onFocus={textInputFocus}
          aria-label={label}
          required={required}
        />
        <button
          tabIndex={-1}
          aria-label={label}
          onBlur={textInputBlur}
          onFocus={textInputFocus}
          onClick={textInputIconClick}
          className="absolute inset-y-0 right-0 flex w-16 cursor-auto items-center justify-center bg-dark-100"
        >
          {iconValue}
        </button>
      </div>
    </section>
  );
};

export default InputField;
