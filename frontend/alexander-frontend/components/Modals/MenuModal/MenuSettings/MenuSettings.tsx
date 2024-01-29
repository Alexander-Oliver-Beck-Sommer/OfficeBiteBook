import { useEffect, useState } from "react";
import data from "@/data/MenuModal.js";
import TextInput from "@/components/Inputs/TextInput";

type MenuSettingsProps = {
  menuSettingsTitle?: string;
  menuSettingsTitleChange?: (newTitle: string) => void;
  menuSettingsTitleValid?: boolean;
  menuSettingsLocation?: string;
  menuSettingsLocationChange?: (newLocation: string) => void;
  menuSettingsLocationValid?: boolean;
  menuSettingsDate?: string;
  menuSettingsDateChange?: (newDate: string) => void;
  menuSettingsDateValid?: boolean;
  menuSettingsStartTime?: string;
  menuSettingsStartTimeChange?: (newStartTime: string) => void;
  menuSettingsStartTimeValid?: boolean;
  menuSettingsEndTime?: string;
  menuSettingsEndTimeChange?: (newEndTime: string) => void;
  menuSettingsEndTimeValid?: boolean;
};

const MenuSettings = ({
  menuSettingsTitle = "",
  menuSettingsTitleChange,
  menuSettingsTitleValid,
  menuSettingsLocation = "",
  menuSettingsLocationChange,
  menuSettingsLocationValid,
  menuSettingsDate = "",
  menuSettingsDateChange,
  menuSettingsDateValid,
  menuSettingsStartTime = "",
  menuSettingsStartTimeChange,
  menuSettingsStartTimeValid,
  menuSettingsEndTime = "",
  menuSettingsEndTimeChange,
  menuSettingsEndTimeValid,
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
    <ul className="bg-dark-300 flex flex-col gap-5 border-y-2 border-dark-100 px-6 py-4">
      <li>
        <TextInput
          variant="text"
          placeholder={data.location_section.title.placeholder}
          name={data.location_section.title.name}
          label={data.location_section.title.label}
          valueChange={handleTitleChange}
          value={titleInput}
          valid={menuSettingsTitleValid}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="text"
          placeholder={data.location_section.location.placeholder}
          name={data.location_section.location.name}
          label={data.location_section.location.label}
          valueChange={handleLocationChange}
          valid={menuSettingsLocationValid}
          value={locationInput}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="date"
          name={data.location_section.date.name}
          label={data.location_section.date.label}
          valueChange={handleDateChange}
          valid={menuSettingsDateValid}
          value={dateInput}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="time"
          name={data.location_section.start_time.name}
          label={data.location_section.start_time.label}
          valueChange={handleStartTimeChange}
          valid={menuSettingsStartTimeValid}
          value={startTimeInput}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="time"
          name={data.location_section.end_time.name}
          label={data.location_section.end_time.label}
          valueChange={handleEndTimeChange}
          valid={menuSettingsEndTimeValid}
          value={endTimeInput}
          required={true}
        />
      </li>
    </ul>
  );
};

export default MenuSettings;
