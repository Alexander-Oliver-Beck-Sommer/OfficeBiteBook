import React, { useRef, useState } from "react";

type Type = "text" | "password" | "email" | "tel" | "date" | "time" | "url";
type Size = "small" | "normal";

interface InputFieldProps {
  /** Defines what type the input should serve. */
  type?: string;
  /** Defines a string value that labels the current element. */
  label?: string;
  /** Adds a label for the input field, and connects it to the input element. */
  name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  label = "",
  name = "",
}) => {
  const input = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let timeValue = event.target.value;
    if (variant === "time") {
      timeValue = timeValue.substring(0, 5);
    }
    valueChange(timeValue);
  };

  const textInputIconClick = () => {
    inputField.current?.focus();
  };

  const textInputFocus = () => {
    setIsFocused(true);
  };

  const textInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <section className="relative flex flex-col gap-2 md:gap-4">
      <label className="w-fit" htmlFor={name}>
        <p
          className={`text_white origin-bottom-left text-sm text-grey transition-all duration-300 ease-in-out md:text-base`}
        >
          {name}
        </p>
      </label>

      <input
        type="date"
        id={name}
        className={`text_white placeholder:text-test_grey w-full rounded border-2 border-dark-500 bg-dark-100 p-3 placeholder-opacity-100 outline-0 transition-all duration-300 ease-in-out placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0 md:p-4`}
      />
    </section>
  );
};

export default InputField;
