"use client";
import React, { useState } from "react";
import TextInput from "@/components/Inputs/TextInput";

const LocationForm = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <ul className="grid grid-cols-2 gap-25">
      <li>
        <TextInput
          type="location"
          placeholder="Write a location for the menu"
          name="Location"
          label="Change or adjust the location where the menu will take place"
          onValueChange={setLocation}
        />
      </li>
      <li>
        <TextInput
          type="date"
          name="Date"
          label="Change or adjust the date (DD/MM/YYYY) when the menu will take place"
          onValueChange={setDate}
        />
      </li>
      <li>
        <TextInput
          type="time"
          name="Start Time"
          label="Change or adjust the time when the menu will start"
          onValueChange={setStartTime}
        />
      </li>
      <li>
        <TextInput
          type="time"
          name="End Time"
          label="Change or adjust the time when the menu will end"
          onValueChange={setEndTime}
        />
      </li>
    </ul>
  );
};

export default LocationForm;
