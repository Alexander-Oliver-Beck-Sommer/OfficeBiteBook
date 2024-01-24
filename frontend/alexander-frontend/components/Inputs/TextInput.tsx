"use client";
import React, { useRef } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import TextIcon from "@/components/Icons/TextIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import EmailIcon from "@/components/Icons/EmailIcon";
import KeyIcon from "@/components/Icons/KeyIcon";

const variants = (variant: string) => {
  switch (variant) {
    case "text":
      return <TextIcon />;
    case "date":
      return <CalendarIcon />;
    case "time":
      return <TimeIcon />;
    case "tel":
      return <PhoneIcon />;
    case "email":
      return <EmailIcon />;
    case "password":
      return <KeyIcon />;
    default:
      return null;
  }
};

type TextInputProps = {
  variant?: string;
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  valid?: boolean;
  required?: boolean;
  valueChange: (value: string) => void;
  disabled?: boolean;
};

const TextInput = ({
  variant = "",
  label = "",
  value = "",
  name = "",
  placeholder = "",
  valid,
  required,
  valueChange = () => {},
  disabled = false,
}: TextInputProps) => {
  const inputField = useRef<HTMLInputElement>(null);

  const inputDisabled = disabled ? "text-arsenic" : "";

  const buttonDisabled = disabled ? "fill-arsenic" : "";

  const borderDisabled = disabled ? "border-dark_charcoal" : "";

  const invalidText = valid ? "text-sunset_orange" : "";

  const invalidBorder = valid ? "border-sunset_orange" : "";

  const invalidPlaceholder = valid ? "placeholder:text-sunset_orange" : "";

  const invalidIcon = valid ? "fill-sunset_orange" : "";

  const [isFocused, setIsFocused] = React.useState(false);

  const textInputIcon = variants(variant);

  // This is functionality is to remove the seconds from the time input
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

  const labelFocus = `${isFocused ? "scale-75" : "scale-100"}`;

  return (
    <section className="relative flex flex-col gap-2 md:gap-4">
      <label htmlFor={name} className="w-fit">
        <p
          className={`text_ghost_white origin-bottom-left text-sm text-cool_grey transition-all duration-300 ease-in-out md:text-base ${labelFocus} ${invalidText}`}
        >
          {name}
        </p>
      </label>
      <div
        className={`relative w-full overflow-hidden rounded border-2 border-arsenic transition-all duration-300 ease-in-out ${invalidBorder} ${borderDisabled} `}
      >
        <input
          ref={inputField}
          type={variant}
          placeholder={placeholder}
          className={`text_ghost_white placeholder:text-test_cool_grey w-full bg-eerie_black p-3 placeholder-opacity-100 outline-0 transition-all duration-300 ease-in-out md:p-4 ${invalidPlaceholder} ${invalidText} ${inputDisabled} placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0`}
          id={name}
          name={name}
          onBlur={textInputBlur}
          onFocus={textInputFocus}
          aria-label={label}
          onChange={handleChange}
          value={value}
          required={required}
          {...(disabled ? { disabled: true } : {})}
        />
        <button
          tabIndex={-1}
          aria-label={label}
          onBlur={textInputBlur}
          onFocus={textInputFocus}
          onClick={textInputIconClick}
          className={`absolute inset-y-0 right-0 flex w-16 cursor-auto items-center justify-center bg-eerie_black fill-apple ${invalidIcon} ${buttonDisabled}`}
          {...(disabled ? { disabled: true } : {})}
        >
          {textInputIcon}
        </button>
      </div>
    </section>
  );
};

export default TextInput;
