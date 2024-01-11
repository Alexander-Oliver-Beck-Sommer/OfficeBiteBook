"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import TextArea from "@/components/Inputs/TextArea";
import useCalendar from "@/hooks/useCalendar";
import ThumbnailInput from "@/components/Inputs/ThumbnailInput";

type DishProps = {
  dishCount?: number;
  dishTitle?: string;
  dishTitleChange?: (newTitle: string) => void;
  dishSubtitle?: string;
  dishSubtitleChange?: (newSubtitle: string) => void;
  dishDescription?: string;
  dishDescriptionChange?: (newDescription: string) => void;
  dishThumbnailFile?: File | null;
  dishThumbnailFileChange?: (newThumbnailFile: File | null) => void;
  dishThumbnailUrl?: string;
  dishThumbnailUrlChange?: (newThumbnailUrl: string) => void;
  dishArchive?: () => void;
  dishReplace?: () => void;
  dishDelete?: () => void;
};

const Dish = ({
  dishCount = 0,
  dishTitle = "",
  dishTitleChange = () => {},
  dishSubtitle = "",
  dishSubtitleChange = () => {},
  dishDescription = "",
  dishDescriptionChange = () => {},
  dishThumbnailFile = null,
  dishThumbnailFileChange = () => {},
  dishThumbnailUrl = "",
  dishThumbnailUrlChange = () => {},
  dishArchive,
  dishReplace,
  dishDelete,
}: DishProps) => {
  const [titleInput, setTitleInput] = useState(dishTitle);
  const [subtitleInput, setSubtitleInput] = useState(dishSubtitle);
  const [descriptionInput, setDescriptionInput] = useState(dishDescription);
  const [thumbnailInputFile, setThumbnailInputFile] = useState(dishThumbnailFile) // prettier-ignore
  const [thumbnailInputUrl, setThumbnailInputUrl] = useState(dishThumbnailUrl) // prettier-ignore
  const [dishOpen, setDishOpen] = useState(false);

  const dishOpenStyle = dishOpen
    ? "grid-rows-[1fr] visible opacity-100"
    : "grid-rows-[0fr] invisible opacity-0";

  const dishExpand = () => {
    setDishOpen(!dishOpen);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitleInput(newTitle);
    if (dishTitleChange) {
      dishTitleChange(newTitle);
    }
  };

  const handleSubtitleChange = (newSubtitle: string) => {
    setSubtitleInput(newSubtitle);
    if (dishSubtitleChange) {
      dishSubtitleChange(newSubtitle);
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescriptionInput(newDescription);
    if (dishDescriptionChange) {
      dishDescriptionChange(newDescription);
    }
  };

  const handleThumbnailChange = (newThumbnailFile: File | null) => {
    setThumbnailInputFile(newThumbnailFile);
    if (dishThumbnailFileChange) {
      dishThumbnailFileChange(newThumbnailFile);
    }
  };

  const handleThumbnailUrlChange = (newThumbnailUrl: string) => {
    setThumbnailInputUrl(newThumbnailUrl);
    if (dishThumbnailUrlChange) {
      dishThumbnailUrlChange(newThumbnailUrl);
    }
  };

  useEffect(() => {
    setTitleInput(dishTitle);
    setSubtitleInput(dishSubtitle);
    setDescriptionInput(dishDescription);
    setThumbnailInputFile(dishThumbnailFile);
    setThumbnailInputUrl(dishThumbnailUrl);
  }, [
    dishTitle,
    dishSubtitle,
    dishDescription,
    dishThumbnailFile,
    dishThumbnailUrl,
  ]);

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
            icon="replace"
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
                textInputType="text"
                textInputLabel="Click to change the title of the dish"
                textInputName="Title"
                textInputPlaceholder="Title"
                textInputValueChange={handleTitleChange}
                textInputValue={titleInput}
                textInputRequired
              />
            </li>
            <li>
              <TextInput
                textInputType="text"
                textInputLabel="Click to change the subtitle of the dish"
                textInputName="Subtitle"
                textInputPlaceholder="Subtitle"
                textInputValueChange={handleSubtitleChange}
                textInputValue={subtitleInput}
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
              <ThumbnailInput
                thumbnailInputTitle="Thumbnail"
                thumbnailInputId={dishCount}
                onThumbnailChange={handleThumbnailChange}
                thumbnailInputUrl={thumbnailInputUrl}
                onThumbnailUrlChange={handleThumbnailUrlChange}
              />
            </li>
          </ul>
        </div>
      </section>
    </li>
  );
};

export default Dish;
