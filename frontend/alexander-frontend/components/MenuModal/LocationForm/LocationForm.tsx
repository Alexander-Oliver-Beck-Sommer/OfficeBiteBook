"use client";
import React, { useState } from "react";
import TextInput from "@/components/Inputs/TextInput";

const LocationForm = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  return (
    <ul className="grid grid-cols-2 gap-25">
      <li>
        <TextInput
          type="location"
          placeholder="Write a location for the menu"
          name="Location"
          label="Click to change the location of where the menu will take place"
          onValueChange={setLocation}
        />
      </li>
      <li>
        <TextInput
          type="date"
          placeholder="Select a date for the menu"
          name="Date"
          label="Click to change the date when the menu will take place"
          onValueChange={setDate}
        />
      </li>
      <li>
        <TextInput
          type="time"
          placeholder="Write a location for the menu"
          name="Start Time"
          label="Click to select a"
          onValueChange={setLocation}
        />
      </li>
      <li>
        <TextInput
          type="time"
          placeholder="Select a date for the menu"
          name="End Time"
          label="Click to change the date when the menu will take place"
          onValueChange={setDate}
        />
      </li>
    </ul>
  );
};

export default LocationForm;
