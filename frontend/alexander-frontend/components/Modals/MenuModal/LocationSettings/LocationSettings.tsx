import { useEffect, useState, useRef } from "react";
import data from "@/data/MenuModal.js";
import TextInput from "@/components/Inputs/TextInput";

type LocationSettingsProps = {
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  onLocationChange?: (newLocation: string) => void;
  onEndTimeChange?: (newEndTime: string) => void;
};

const LocationSettings = ({
  location = "",
  date = "",
  startTime = "",
  endTime = "",
  onLocationChange,
  onEndTimeChange,
}: LocationSettingsProps) => {
  const [locationInput, setLocationInput] = useState(location);
  const [endTimeInput, setEndTimeInput] = useState(endTime);
  const [dateInput, setDateInput] = useState(date);
  const [startTimeInput, setStartTimeInput] = useState(startTime);

  const handleLocationChange = (newValue: string) => {
    setLocationInput(newValue);
    if (onLocationChange) {
      onLocationChange(newValue);
    }
  };

  const handleEndTimeChange = (newValue: string) => {
    setEndTimeInput(newValue);
    if (onEndTimeChange) {
      onEndTimeChange(newValue);
    }
  };

  const handleDateChange = (newValue) => {
    setDateInput(newValue);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTimeInput(newValue);
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
          onValueChange={handleLocationChange}
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
          onValueChange={handleEndTimeChange}
          value={endTimeInput}
        />
      </li>
    </ul>
  );
};

export default LocationSettings;
