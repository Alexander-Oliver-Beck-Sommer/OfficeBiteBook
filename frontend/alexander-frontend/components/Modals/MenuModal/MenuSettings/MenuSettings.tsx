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
          textInputType="title"
          // textInputValid={!menuSettingsValidation?.title ?? true}
          textInputPlaceholder={data.location_section.title.placeholder}
          textInputName={data.location_section.title.name}
          textInputLabel={data.location_section.title.label}
          textInputValueChange={handleTitleChange}
          textInputValue={titleInput}
          textInputRequired={true}
        />
      </li>
      <li>
        <TextInput
          textInputType="location"
          // textInputValid={!menuSettingsValidation?.location ?? true}
          textInputPlaceholder={data.location_section.location.placeholder}
          textInputName={data.location_section.location.name}
          textInputLabel={data.location_section.location.label}
          textInputValueChange={handleLocationChange}
          textInputValue={locationInput}
        />
      </li>
      <li>
        <TextInput
          textInputType="date"
          // textInputValid={!menuSettingsValidation?.date ?? true}
          textInputName={data.location_section.date.name}
          textInputLabel={data.location_section.date.label}
          textInputValueChange={handleDateChange}
          textInputValue={dateInput}
        />
      </li>
      <li>
        <TextInput
          textInputType="time"
          // textInputValid={!menuSettingsValidation?.startTime ?? true}
          textInputName={data.location_section.start_time.name}
          textInputLabel={data.location_section.start_time.label}
          textInputValueChange={handleStartTimeChange}
          textInputValue={startTimeInput}
        />
      </li>
      <li>
        <TextInput
          textInputType="time"
          // textInputValid={!menuSettingsValidation?.endTime ?? true}
          textInputName={data.location_section.end_time.name}
          textInputLabel={data.location_section.end_time.label}
          textInputValueChange={handleEndTimeChange}
          textInputValue={endTimeInput}
        />
      </li>
    </ul>
  );
};

export default MenuSettings;
