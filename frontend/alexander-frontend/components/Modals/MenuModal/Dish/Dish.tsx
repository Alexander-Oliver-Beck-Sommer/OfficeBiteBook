"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import TextArea from "@/components/Inputs/TextArea";
import ThumbnailButton from "@/components/Buttons/ThumbnailButton";

type DishProps = {
  dishCount?: number;
  dishTitle?: string;
  dishTitleChange?: (newTitle: string) => void;
  dishSubtitle?: string;
  dishSubtitleChange?: (newSubtitle: string) => void;
  dishDescription?: string;
  dishDescriptionChange?: (newDescription: string) => void;
  dishThumbnail?: string;
  dishThumbnailChange?: (newThumbnail: string) => void;
  dishArchive?: () => void;
  dishReplace?: () => void;
  dishDelete?: () => void;
  dishOpen?: boolean;
  dishExpand?: () => void;
};

const Dish = ({
  dishCount,
  dishTitle = "",
  dishTitleChange,
  dishSubtitle = "",
  dishSubtitleChange,
  dishDescription = "",
  dishDescriptionChange,
  dishThumbnail = "",
  dishThumbnailChange,
  dishArchive,
  dishReplace,
  dishDelete,
  dishOpen,
  dishExpand,
}: DishProps) => {
  const [titleInput, setTitleInput] = useState(dishTitle);
  const [subtitleInput, setSubtitleInput] = useState(dishSubtitle);
  const [descriptionInput, setDescriptionInput] = useState(dishDescription);
  const [thumbnailInput, setThumbnailInput] = useState(dishThumbnail);

  const dishOpenStyle = `${
    dishOpen
      ? "grid-rows-[1fr] visible opacity-100"
      : "grid-rows-[0fr] invisible opacity-0"
  }`;

  const handleTitleChange = (newValue: string) => {
    setTitleInput(newValue);
    if (dishTitleChange) {
      dishTitleChange(newValue);
    }
  };

  const handleSubtitleChange = (newValue: string) => {
    setSubtitleInput(newValue);
    if (dishSubtitleChange) {
      dishSubtitleChange(newValue);
    }
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescriptionInput(newValue);
    if (dishDescriptionChange) {
      dishDescriptionChange(newValue);
    }
  };

  const handleThumbnailChange = (newValue: string) => {
    setThumbnailInput(newValue);
    if (dishThumbnailChange) {
      dishThumbnailChange(newValue);
    }
  };

  useEffect(() => {
    setTitleInput(dishTitle);
    setSubtitleInput(dishSubtitle);
    setDescriptionInput(dishDescription);
    setThumbnailInput(dishThumbnail);
  }, [dishTitle, dishSubtitle, dishDescription, dishThumbnail]);

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
            toggle={dishArchive}
            icon="inventory"
            label="Click to save the dish to the archive"
            variant="icon"
            title="Save the dish to the archive"
            name="Save"
          />
          <ActionButton
            toggle={dishReplace}
            icon="cycle"
            label="Click to replace the dish with a dish from the archive"
            variant="icon"
            title="Replace the dish with a dish from the archive"
            name="Replace"
          />
          <ActionButton
            toggle={dishDelete}
            icon="delete"
            label="Click to delete the dish from the menu"
            variant="icon"
            title="Delete the dish from the menu"
            name="Delete"
          />
          <ActionButton
            toggle={dishExpand}
            icon="downArrow"
            label="Click to expand and collapse the dish"
            variant="icon"
            title="Expand and collapse the dish"
            name="Expand/Collapse"
          />
        </div>
      </section>
      <section
        className={`grid bg-raisin_black transition-all duration-300 ease-in-out ${dishOpenStyle}`}
      >
        <div className="overflow-hidden">
          <ul className="grid w-full grid-cols-2 gap-6 p-6">
            <li>
              <TextInput
                type="text"
                label="Click to change the title of the dish"
                name="Title"
                placeholder="Title"
                onValueChange={handleTitleChange}
                value={titleInput}
              />
            </li>
            <li>
              <TextInput
                type="text"
                label="Click to change the subtitle of the dish"
                name="Subtitle"
                placeholder="Subtitle"
                onValueChange={handleSubtitleChange}
                value={subtitleInput}
              />
            </li>
            <li>
              <TextArea
                rows={5}
                label="Click to change the subtitle of the dish"
                name="Description"
                placeholder="Description"
                onValueChange={handleDescriptionChange}
                value={descriptionInput}
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
