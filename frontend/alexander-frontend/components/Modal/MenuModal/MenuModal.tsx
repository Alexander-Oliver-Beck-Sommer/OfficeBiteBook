import React, { useEffect, useState, useRef } from "react";
import MenuControls from "@/components/Modal/MenuModal/MenuControls/MenuControls";
import TitleBar from "@/components/Modal/MenuModal/TitleBar/TitleBar";
import LocationForm from "@/components/MenuModal/LocationForm/LocationForm";
import ActionButton from "@/components/Buttons/ActionButton";
import Dish from "@/components/Modal/MenuModal/Dish/Dish";
import DishButton from "@/components/Buttons/DishButton";
import TextInput from "@/components/Inputs/TextInput";

const visibilities = (visible) => {
  return visible ? "opacity-1 visible" : "opacity-0 invisible";
};

type MenuModalProps = {
  visible: boolean;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  toggle: () => void;
  createDish: () => void;
  importDish: () => void;
  cancel: () => void;
  accept: () => void;
};

const MenuModal = ({
  visible = false,
  location = "",
  date = "",
  startTime = "",
  endTime = "",
  toggle,
  createDish,
  importDish,
  cancel,
  accept,
}: MenuModalProps) => {
  const visibleValue = visibilities(visible);
  const scrollToTop = useRef(null);
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

    if (!visible && scrollToTop.current) {
      scrollToTop.current.scrollTop = 0;
    }
  }, [visible, location, date, startTime, endTime]);

  const ignoreParentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <section
      aria-hidden={!visible}
      onClick={toggle}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-all duration-400 ease-in-out ${visibleValue}`}
    >
      <ul
        ref={scrollToTop}
        onClick={ignoreParentClick}
        className="flex max-h-menu w-full max-w-menu flex-col gap-76 overflow-y-auto overflow-x-hidden rounded border-2 border-davys_grey bg-gunmetal px-48 py-48"
      >
        <li className="flex flex-col gap-24">
          <TitleBar />
          <MenuControls />
          <ul className="grid grid-cols-2 gap-25">
            <li>
              <TextInput
                type="location"
                placeholder="Write a location for the menu"
                name="Location"
                label="Change or adjust the location where the menu will take place"
                onValueChange={setLocationInput}
                value={locationInput}
              />
            </li>
            <li>
              <TextInput
                type="date"
                name="Date"
                label="Change or adjust the date (DD/MM/YYYY) when the menu will take place"
                onValueChange={setDateInput}
                value={dateInput}
              />
            </li>
            <li>
              <TextInput
                type="time"
                name="Start Time"
                label="Change or adjust the time when the menu will start"
                onValueChange={setStartTimeInput}
                value={startTimeInput}
              />
            </li>
            <li>
              <TextInput
                type="time"
                name="End Time"
                label="Change or adjust the time when the menu will end"
                onValueChange={setEndTimeInput}
                value={endTimeInput}
              />
            </li>
          </ul>
        </li>
        <Dish />
        <li className="grid grid-cols-2 gap-24">
          <DishButton
            icon="add"
            name="Create Dish"
            desc="Create a new dish from scratch"
            label="Click to create a new dish from scratch"
            toggle={createDish}
          />
          <DishButton
            icon="inventory"
            name="Import Dish"
            desc="Import a dish from the archive"
            label="Click to import a dish from the archive"
            toggle={importDish}
          />
        </li>
        <li className="flex items-center justify-end gap-12">
          <ActionButton
            variant="outlined"
            name="Cancel"
            label="Cancel and close the menu modal"
            icon="cancel"
            toggle={cancel}
          />
          <ActionButton
            variant="filled"
            name="Accept"
            label="Accept and close the menu modal"
            icon="check"
            toggle={accept}
          />
        </li>
      </ul>
    </section>
  );
};

export default MenuModal;
