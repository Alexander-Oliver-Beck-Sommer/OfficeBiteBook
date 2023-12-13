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
}: DishProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [subInput, setSubInput] = useState(sub);
  const [descInput, setDescInput] = useState(desc);
  const [thumbInput, setThumbInput] = useState(thumb);
  const [isDishOpen, setIsDishOpen] = useState(false);

  const openDishStyle = `${isDishOpen ? "h-16 " : "h-0"}`;

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
    // <li aria-label={titleInput} className="flex flex-col gap-6 px-6 py-4">
    //   <header className="flex items-center justify-between border-b-2 border-arsenic pb-6">
    //     <div className="flex items-center gap-2">
    //       <h2 className="font-medium text-cool_grey">#{dishCount}</h2>
    //       <h3>{titleInput}</h3>
    //     </div>
    //     <div className="flex items-center gap-6">
    //       <ActionButton
    //         label="Save the dish to the archive"
    //         name="Archive"
    //         icon="add"
    //         toggle={archiveToggle}
    //       />
    //       <ActionButton
    //         label="Replace with dish from archive"
    //         name="Replace"
    //         icon="cycle"
    //         toggle={replaceToggle}
    //       />
    //       <ActionButton
    //         label="Delete dish from menu"
    //         name="Delete"
    //         icon="delete"
    //         toggle={deleteToggle}
    //       />
    //     </div>
    //   </header>
    //   <section className="grid grid-cols-2 gap-6">
    //     <TextInput
    //       type="text"
    //       label="Click to change the title of the dish"
    //       name="Title"
    //       placeholder="Title"
    //       onValueChange={setTitleInput}
    //       value={titleInput}
    //     />
    //     <TextInput
    //       type="text"
    //       label="Click to change the subtitle of the dish"
    //       name="Subtitle"
    //       placeholder="Subtitle"
    //       onValueChange={setSubInput}
    //       value={subInput}
    //     />
    //     <TextArea
    //       rows="5"
    //       label="Click to change the subtitle of the dish"
    //       name="Description"
    //       placeholder="Description"
    //       onValueChange={setDescInput}
    //       value={descInput}
    //     />
    //     <ThumbnailButton title="Thumbnail (optional)" />
    //   </section>
    // </li>
    <li aria-label={titleInput} className="animate-fade-up animate-ease-in-out grid w-full grid-rows-autoX1 overflow-hidden rounded border-2 border-arsenic bg-eerie_black">
      <section className="flex items-center justify-between pl-3">
        <div className="flex">
          <h3 className="font-medium text-cool_grey">#{dishCount}</h3>
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
            toggle={dishToggle}
            icon="downArrow"
            label="Expand and collapse the dish"
            variant="icon-circle"
            name="Expand and collapse"
          />
        </div>
      </section>
      <section
        className={`bg-strange_black transition-all duration-300 ease-in-out ${openDishStyle}`}
      >
        <div className="w-full py-4 px-6"></div>
      </section>
    </li>
  );
};

export default Dish;
