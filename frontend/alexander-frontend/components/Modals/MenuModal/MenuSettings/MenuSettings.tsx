import { useEffect, useState } from "react";
import data from "@/data/MenuModal.js";
import TextInput from "@/components/Inputs/TextInput";

type ValidationState = {
  title: boolean;
  location: boolean;
  date: boolean;
  startTime: boolean;
  endTime: boolean;
};

type MenuSettingsProps = {
  menuSettingsTitle?: string;
  menuSettingsTitleChange?: (newTitle: string) => void;
  menuSettingsLocation?: string;
  menuSettingsLocationChange?: (newLocation: string) => void;
  menuSettingsDate?: string;
  menuSettingsDateChange?: (newDate: string) => void;
  menuSettingsStartTime?: string;
  menuSettingsStartTimeChange?: (newStartTime: string) => void;
  menuSettingsEndTime?: string;
  menuSettingsEndTimeChange?: (newEndTime: string) => void;
  menuSettingsValidation?: ValidationState;
};

const MenuSettings = ({
  menuSettingsTitle = "",
  menuSettingsTitleChange,
  menuSettingsLocation = "",
  menuSettingsLocationChange,
  menuSettingsDate = "",
  menuSettingsDateChange,
  menuSettingsStartTime = "",
  menuSettingsStartTimeChange,
  menuSettingsEndTime = "",
  menuSettingsEndTimeChange,
  menuSettingsValidation,
}: MenuSettingsProps) => {
  const [titleInput, setTitleInput] = useState(menuSettingsTitle);
  const [locationInput, setLocationInput] = useState(menuSettingsLocation);
  const [dateInput, setDateInput] = useState(menuSettingsDate);
  const [startTimeInput, setStartTimeInput] = useState(menuSettingsStartTime);
  const [endTimeInput, setEndTimeInput] = useState(menuSettingsEndTime);

  const handleTitleChange = (newValue: string) => {
    setTitleInput(newValue);
    if (menuSettingsTitleChange) {
      menuSettingsTitleChange(newValue);
    }
  };

  const handleLocationChange = (newValue: string) => {
    setLocationInput(newValue);
    if (menuSettingsLocationChange) {
      menuSettingsLocationChange(newValue);
    }
  };

  const handleDateChange = (newValue: string) => {
    setDateInput(newValue);
    if (menuSettingsDateChange) {
      menuSettingsDateChange(newValue);
    }
  };

  const handleStartTimeChange = (newValue: string) => {
    setStartTimeInput(newValue);
    if (menuSettingsStartTimeChange) {
      menuSettingsStartTimeChange(newValue);
    }
  };

  const handleEndTimeChange = (newValue: string) => {
    setEndTimeInput(newValue);
    if (menuSettingsEndTimeChange) {
      menuSettingsEndTimeChange(newValue);
    }
  };

  useEffect(() => {
    setTitleInput(menuSettingsTitle);
    setLocationInput(menuSettingsLocation);
    setDateInput(menuSettingsDate);
    setStartTimeInput(menuSettingsStartTime);
    setEndTimeInput(menuSettingsEndTime);
  }, [
    menuSettingsTitle,
    menuSettingsLocation,
    menuSettingsDate,
    menuSettingsStartTime,
    menuSettingsEndTime,
  ]);

  return (
    <ul className="flex flex-col gap-5 border-y-2 border-eerie_black bg-raisin_black px-6 py-4">
      <li>
        <TextInput
          type="title"
          isInvalid={!menuSettingsValidation?.title ?? true}
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
          isInvalid={!menuSettingsValidation?.location ?? true}
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
          isInvalid={!menuSettingsValidation?.date ?? true}
          name={data.location_section.date.name}
          label={data.location_section.date.label}
          onValueChange={handleDateChange}
          value={dateInput}
        />
      </li>
      <li>
        <TextInput
          type="time"
          isInvalid={!menuSettingsValidation?.startTime ?? true}
          name={data.location_section.start_time.name}
          label={data.location_section.start_time.label}
          onValueChange={handleStartTimeChange}
          value={startTimeInput}
        />
      </li>
      <li>
        <TextInput
          type="time"
          isInvalid={!menuSettingsValidation?.endTime ?? true}
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
