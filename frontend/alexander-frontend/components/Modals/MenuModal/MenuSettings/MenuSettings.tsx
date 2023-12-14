import { useEffect, useState } from "react";
import data from "@/data/MenuModal.js";
import TextInput from "@/components/Inputs/TextInput";

type MenuSettingsProps = {
  title?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  onTitleChange?: (newTitle: string) => void;
  onLocationChange?: (newLocation: string) => void;
  onDateChange?: (newDate: string) => void;
  onStartTimeChange?: (newStartTime: string) => void;
  onEndTimeChange?: (newEndTime: string) => void;
};

const MenuSettings = ({
  title = "",
  location = "",
  date = "",
  startTime = "",
  endTime = "",
  onTitleChange,
  onLocationChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  validationState,
}: MenuSettingsProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [locationInput, setLocationInput] = useState(location);
  const [dateInput, setDateInput] = useState(date);
  const [startTimeInput, setStartTimeInput] = useState(startTime);
  const [endTimeInput, setEndTimeInput] = useState(endTime);

  const handleTitleChange = (newValue: string) => {
    setTitleInput(newValue);
    if (onTitleChange) {
      onTitleChange(newValue);
    }
  };

  const handleLocationChange = (newValue: string) => {
    setLocationInput(newValue);
    if (onLocationChange) {
      onLocationChange(newValue);
    }
  };

  const handleDateChange = (newValue: string) => {
    setDateInput(newValue);
    if (onDateChange) {
      onDateChange(newValue);
    }
  };

  const handleStartTimeChange = (newValue: string) => {
    setStartTimeInput(newValue);
    if (onStartTimeChange) {
      onStartTimeChange(newValue);
    }
  };

  const handleEndTimeChange = (newValue: string) => {
    setEndTimeInput(newValue);
    if (onEndTimeChange) {
      onEndTimeChange(newValue);
    }
  };

  useEffect(() => {
    setTitleInput(title);
    setLocationInput(location);
    setDateInput(date);
    setStartTimeInput(startTime);
    setEndTimeInput(endTime);
  }, [title, location, date, startTime, endTime]);

  return (
    <ul className="flex flex-col gap-5 border-y-2 border-eerie_black bg-raisin_black px-6 py-4">
      <li>
        <TextInput
          type="title"
          isInvalid={!validationState.title}
          placeholder={data.location_section.title.placeholder}
          name={data.location_section.title.name}
          label={data.location_section.title.label}
          onValueChange={handleTitleChange}
          value={titleInput}
        />
      </li>
      <li>
        <TextInput
          type="location"
          isInvalid={!validationState.location}
          placeholder={data.location_section.location.placeholder}
          name={data.location_section.location.name}
          label={data.location_section.location.label}
          onValueChange={handleLocationChange}
          value={locationInput}
        />
      </li>
      <li>
        <TextInput
          type="date"
          isInvalid={!validationState.date}
          name={data.location_section.date.name}
          label={data.location_section.date.label}
          onValueChange={handleDateChange}
          value={dateInput}
        />
      </li>
      <li>
        <TextInput
          type="time"
          isInvalid={!validationState.startTime}
          name={data.location_section.start_time.name}
          label={data.location_section.start_time.label}
          onValueChange={handleStartTimeChange}
          value={startTimeInput}
        />
      </li>
      <li>
        <TextInput
          type="time"
          isInvalid={!validationState.endTime}
          name={data.location_section.end_time.name}
          label={data.location_section.end_time.label}
          onValueChange={handleEndTimeChange}
          value={endTimeInput}
        />
      </li>
    </ul>
  );
};

export default MenuSettings;
