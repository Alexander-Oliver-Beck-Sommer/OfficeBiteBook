"use client";
import { useEffect, useState, useRef } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import EditableTitle from "@/components/Inputs/EditableTitle";
import TextArea from "@/components/Inputs/TextArea";
import ImageIcon from "@/components/Icons/ImageIcon";
import ThumbnailButton from "@/components/Buttons/ThumbnailButton";

type DishProps = {
  dishCount: number;
  title?: string;
  sub?: string;
  desc?: string;
  thumb?: string;
  thumbAlt?: string;
  thumbToggle: () => void;
  archiveToggle: () => void;
  replaceToggle: () => void;
  deleteToggle: () => void;
};

const Dish = ({
  dishCount,
  title = "",
  sub = "",
  desc = "",
  thumb = "",
  thumbAlt = "",
  thumbToggle,
  archiveToggle,
  replaceToggle,
  deleteToggle,
  isDishOpen,
  toggleDish,
}: DishProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [subInput, setSubInput] = useState(sub);
  const [descInput, setDescInput] = useState(desc);
  const [thumbInput, setThumbInput] = useState(thumb);

  const openDishStyle = `${
    isDishOpen
      ? "grid-rows-[1fr] visible opacity-100"
      : "grid-rows-[0fr] invisible opacity-0"
  }`;

  const dishToggle = () => {
    setIsDishOpen(!isDishOpen);
  };

  const handleTitleChange = (newValue) => {
    setTitleInput(newValue);
  };

  const handleSubChange = (newValue) => {
    setSubInput(newValue);
  };

  const handleDescChange = (newValue) => {
    setDescInput(newValue);
  };

  const handleThumbChange = (newValue) => {
    setThumbInput(newValue);
  };

  useEffect(() => {
    setTitleInput(title);
    setSubInput(sub);
    setDescInput(desc);
    setThumbInput(thumb);
  }, [title, sub, desc, thumb]);

  return (
    <li
      aria-label={titleInput}
      className="grid w-full flex-shrink-0 animate-fade-up grid-rows-autoX1 overflow-hidden rounded border-2 border-arsenic bg-eerie_black animate-ease-in-out"
    >
      <section className="flex items-center justify-between pl-3">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">#{dishCount}</h3>
          <p className="text-cool_grey">{titleInput}</p>
        </div>
        <div className="flex">
          <ActionButton
            toggle={dishToggle}
            icon="inventory"
            label="Clean"
            variant="icon-circle"
            name="Hh"
          />
          <ActionButton
            toggle={dishToggle}
            icon="cycle"
            label="Clean"
            variant="icon-circle"
            name="Hh"
          />
          <ActionButton
            toggle={deleteToggle}
            icon="delete"
            label="Clean"
            variant="icon-circle"
            name="Hh"
          />
          <ActionButton
            toggle={toggleDish}
            icon="downArrow"
            label="Expand and collapse the dish"
            variant="icon-circle"
            name="Expand and collapse"
          />
        </div>
      </section>
      <section
        className={`grid bg-raisin_black transition-all duration-300 ease-in-out ${openDishStyle}`}
      >
        <div className="overflow-hidden">
          <ul className="grid w-full grid-cols-2 gap-6 p-6">
            <li>
              <TextInput
                type="text"
                label="Click to change the title of the dish"
                name="Title"
                placeholder="Title"
                onValueChange={setTitleInput}
                value={titleInput}
              />
            </li>
            <li>
              <TextInput
                type="text"
                label="Click to change the subtitle of the dish"
                name="Subtitle"
                placeholder="Subtitle"
                onValueChange={setSubInput}
                value={subInput}
              />
            </li>
            <li>
              <TextArea
                rows="5"
                label="Click to change the subtitle of the dish"
                name="Description"
                placeholder="Description"
                onValueChange={setDescInput}
                value={descInput}
              />
            </li>
            <li>
              <ThumbnailButton title="Thumbnail" />
            </li>
          </ul>
        </div>
      </section>
    </li>
  );
};

export default Dish;
