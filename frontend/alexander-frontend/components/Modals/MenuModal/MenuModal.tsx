import React, { useEffect, useState, useRef } from "react";
import ActionButton from "@/components/Buttons/ActionButton";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import DishButton from "@/components/Buttons/DishButton";
import TextInput from "@/components/Inputs/TextInput";
import data from "@/data/MenuModal.js";
import EditableTitle from "@/components/Inputs/EditableTitle";
import CloseButton from "@/components/Buttons/CloseButton";

const visibilities = (visible) => {
  return visible ? "opacity-100 visible" : "opacity-0 invisible";
};

type MenuModalProps = {
  visible: boolean;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  toggle: () => void;
  selectTemplate: () => void;
  saveTemplate: () => void;
  selectMenu: () => void;
  saveMenu: () => void;
  deleteMenu: () => void;
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
  selectTemplate,
  saveTemplate,
  selectMenu,
  saveMenu,
  deleteMenu,
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
        className="flex max-h-menu w-full max-w-menu_width flex-col gap-20 overflow-y-auto overflow-x-hidden rounded border-2 border-davys_grey bg-gunmetal px-12 py-12"
      >
        <li className="flex flex-col gap-6">
          <header className="flex items-center justify-between gap-6">
            <EditableTitle
              heading="h1"
              placeholder={data.header_section.title.placeholder}
              label={data.header_section.title.label}
            />
            <CloseButton
              label={data.header_section.close.label}
              toggle={toggle}
            />
          </header>
          <ul className="flex items-center gap-6 border-y-2 border-davys_grey py-4">
            <li>
              <ActionButton
                icon="downArrow"
                name={data.controls_section.select_template.name}
                label={data.controls_section.select_template.label}
                toggle={selectTemplate}
              />
            </li>
            <li>
              <ActionButton
                icon="add"
                name={data.controls_section.save_template.name}
                label={data.controls_section.save_template.label}
                toggle={saveTemplate}
              />
            </li>
            <li>
              <ActionButton
                icon="downArrow"
                name={data.controls_section.select_menu.name}
                label={data.controls_section.select_menu.label}
                toggle={selectMenu}
              />
            </li>
            <li>
              <ActionButton
                icon="add"
                name={data.controls_section.save_menu.name}
                label={data.controls_section.save_menu.label}
                toggle={saveMenu}
              />
            </li>
            <li>
              <ActionButton
                icon="delete"
                name={data.controls_section.delete_menu.name}
                label={data.controls_section.delete_menu.label}
                toggle={deleteMenu}
              />
            </li>
          </ul>
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
        </li>
        <Dish />
        <li className="grid grid-cols-2 gap-6">
          <DishButton
            icon="add"
            name={data.dish_buttons.create.name}
            desc={data.dish_buttons.create.desc}
            label={data.dish_buttons.create.label}
            toggle={createDish}
          />
          <DishButton
            icon="inventory"
            name={data.dish_buttons.import.name}
            desc={data.dish_buttons.import.desc}
            label={data.dish_buttons.import.label}
            toggle={importDish}
          />
        </li>
        <li className="flex items-center justify-end gap-3">
          <ActionButton
            variant="outlined"
            icon="cancel"
            name={data.menu_buttons.cancel.name}
            label={data.menu_buttons.cancel.label}
            toggle={cancel}
          />
          <ActionButton
            variant="filled"
            icon="check"
            name={data.menu_buttons.accept.name}
            label={data.menu_buttons.accept.label}
            toggle={accept}
          />
        </li>
      </ul>
    </section>
  );
};

export default MenuModal;
