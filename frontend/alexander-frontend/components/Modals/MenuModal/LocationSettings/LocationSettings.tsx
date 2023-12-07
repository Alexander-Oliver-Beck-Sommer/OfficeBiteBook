import { useEffect, useState, useRef } from "react";
import data from "@/data/MenuModal.js";
import TextInput from "@/components/Inputs/TextInput";

type LocationSettingsProps = {
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
};

const LocationSettings = ({
  location = "",
  date = "",
  startTime = "",
  endTime = "",
}: LocationSettingsProps) => {
  const [locationInput, setLocationInput] = useState(location);
  const [dateInput, setDateInput] = useState(date);
  const [startTimeInput, setStartTimeInput] = useState(startTime);
  const [endTimeInput, setEndTimeInput] = useState(endTime);

  const handleLocationChange = (newValue) => {
    setLocationInput(newValue);
  };

  const handleDateChange = (newValue) => {
    setDateInput(newValue);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTimeInput(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTimeInput(newValue);
  };

  useEffect(() => {
    setLocationInput(location);
    setDateInput(date);
    setStartTimeInput(startTime);
    setEndTimeInput(endTime);
  }, [location, date, startTime, endTime]);

  return (
    <ul className="grid grid-cols-2 gap-6">
      <li>
        <TextInput
          type="location"
          placeholder={data.location_section.location.placeholder}
          name={data.location_section.location.name}
          label={data.location_section.location.label}
          onValueChange={setLocationInput}
          value={locationInput}
        />
      </li>
      <li>
        <TextInput
          type="date"
          name={data.location_section.date.name}
          label={data.location_section.date.label}
          onValueChange={setDateInput}
          value={dateInput}
        />
      </li>
      <li>
        <TextInput
          type="time"
          name={data.location_section.start_time.name}
          label={data.location_section.start_time.label}
          onValueChange={setStartTimeInput}
          value={startTimeInput}
        />
      </li>
      <li>
        <TextInput
          type="time"
          name={data.location_section.end_time.name}
          label={data.location_section.end_time.label}
          onValueChange={setEndTimeInput}
          value={endTimeInput}
        />
      </li>
    </ul>
  );
};

export default LocationSettings;
