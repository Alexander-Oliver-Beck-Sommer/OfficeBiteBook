import { useEffect, useState } from "react";
import data from "@/data/MenuModal.js";
import TextInput from "@/components/Inputs/TextInput";

type MenuSettingsProps = {
  title?: string;
  changeTitle?: (newTitle: string) => void;
  isTitleValid?: boolean;
  location?: string;
  changeLocation?: (newLocation: string) => void;
  isLocationValid?: boolean;
  date?: string;
  changeDate?: (newDate: string) => void;
  isDateValid?: boolean;
  startTime?: string;
  changeStartTime?: (newStartTime: string) => void;
  isStartTimeValid?: boolean;
  endTime?: string;
  changeEndTime?: (newEndTime: string) => void;
  isEndTimeValid?: boolean;
};

const MenuSettings = ({
  title = "",
  changeTitle = () => {},
  isTitleValid = false,
  location = "",
  changeLocation = () => {},
  isLocationValid = false,
  date = "",
  changeDate = () => {},
  isDateValid = false,
  startTime = "",
  changeStartTime = () => {},
  isStartTimeValid = false,
  endTime = "",
  changeEndTime = () => {},
  isEndTimeValid = false,
}: MenuSettingsProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [locationInput, setLocationInput] = useState(location);
  const [dateInput, setDateInput] = useState(date);
  const [startTimeInput, setStartTimeInput] = useState(startTime);
  const [endTimeInput, setEndTimeInput] = useState(endTime);

  const handleTitleChange = (newValue: string) => {
    setTitleInput(newValue);
    if (changeTitle) {
      changeTitle(newValue);
    }
  };

  const handleLocationChange = (newValue: string) => {
    setLocationInput(newValue);
    if (changeLocation) {
      changeLocation(newValue);
    }
  };

  const handleDateChange = (newValue: string) => {
    setDateInput(newValue);
    if (changeDate) {
      changeDate(newValue);
    }
  };

  const handleStartTimeChange = (newValue: string) => {
    setStartTimeInput(newValue);
    if (changeStartTime) {
      changeStartTime(newValue);
    }
  };

  const handleEndTimeChange = (newValue: string) => {
    setEndTimeInput(newValue);
    if (changeEndTime) {
      changeEndTime(newValue);
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
    <ul className="flex flex-col gap-5 border-y-2 border-dark-100 bg-dark-300 px-6 py-4">
      <li>
        <TextInput
          variant="text"
          placeholder={data.location_section.title.placeholder}
          name={data.location_section.title.name}
          label={data.location_section.title.label}
          valueChange={handleTitleChange}
          value={titleInput}
          valid={isTitleValid}
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
          valid={isLocationValid}
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
          valid={isDateValid}
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
          valid={isStartTimeValid}
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
          valid={isEndTimeValid}
          value={endTimeInput}
          required={true}
        />
      </li>
    </ul>
  );
};

export default MenuSettings;
