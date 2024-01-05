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
    <ul className="flex flex-col gap-5 border-y-2 border-eerie_black bg-raisin_black px-6 py-4">
      <li>
        <TextInput
          textInputType="text"
          textInputPlaceholder={data.location_section.title.placeholder}
          textInputName={data.location_section.title.name}
          textInputLabel={data.location_section.title.label}
          textInputValueChange={handleTitleChange}
          textInputValue={titleInput}
          textInputValid={menuSettingsTitleValid}
          textInputRequired={true}
        />
      </li>
      <li>
        <TextInput
          textInputType="text"
          textInputPlaceholder={data.location_section.location.placeholder}
          textInputName={data.location_section.location.name}
          textInputLabel={data.location_section.location.label}
          textInputValueChange={handleLocationChange}
          textInputValid={menuSettingsLocationValid}
          textInputValue={locationInput}
          textInputRequired={true}
        />
      </li>
      <li>
        <TextInput
          textInputType="date"
          textInputName={data.location_section.date.name}
          textInputLabel={data.location_section.date.label}
          textInputValueChange={handleDateChange}
          textInputValid={menuSettingsDateValid}
          textInputValue={dateInput}
          textInputRequired={true}
        />
      </li>
      <li>
        <TextInput
          textInputType="time"
          textInputName={data.location_section.start_time.name}
          textInputLabel={data.location_section.start_time.label}
          textInputValueChange={handleStartTimeChange}
          textInputValid={menuSettingsStartTimeValid}
          textInputValue={startTimeInput}
          textInputRequired={true}
        />
      </li>
      <li>
        <TextInput
          textInputType="time"
          textInputName={data.location_section.end_time.name}
          textInputLabel={data.location_section.end_time.label}
          textInputValueChange={handleEndTimeChange}
          textInputValid={menuSettingsEndTimeValid}
          textInputValue={endTimeInput}
          textInputRequired={true}
        />
      </li>
    </ul>
  );
};

export default MenuSettings;
