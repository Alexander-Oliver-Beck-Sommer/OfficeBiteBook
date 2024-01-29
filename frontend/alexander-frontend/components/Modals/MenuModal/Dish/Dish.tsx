"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import TextArea from "@/components/Inputs/TextArea";
import UploadThumbnail from "@/components/Inputs/UploadThumbnail";

type DishProps = {
  count?: number;
  title?: string;
  changeTitle?: (newTitle: string) => void;
  subtitle?: string;
  changeSubtitle?: (newSubtitle: string) => void;
  description?: string;
  changeDescription?: (newDescription: string) => void;
  thumbnailValue?: string;
  changeThumbnailValue?: (newValue: string) => void;
  thumbnailFile?: File | null;
  changeThumbnailFile?: (newFile: File | null) => void;
  thumbnailURL?: string;
  changeThumbnailURL?: (newUrl: string) => void;
  dishArchive?: () => void;
  dishReplace?: () => void;
  deleteDish?: () => void;
};

const Dish = ({
  count = 0,
  title = "",
  changeTitle = () => {},
  subtitle = "",
  changeSubtitle = () => {},
  description = "",
  changeDescription = () => {},
  thumbnailValue = "",
  changeThumbnailValue = () => {},
  thumbnailFile = null,
  changeThumbnailFile = () => {},
  thumbnailURL = "",
  changeThumbnailURL = () => {},
  dishArchive = () => {},
  dishReplace = () => {},
  deleteDish = () => {},
}: DishProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [subtitleInput, setSubtitleInput] = useState(subtitle);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [thumbnailInputValue, setThumbnailInputValue] = useState(thumbnailValue); // prettier-ignore
  const [thumbnailInputFile, setThumbnailInputFile] = useState(thumbnailFile); // prettier-ignore
  const [thumbnailInputUrl, setThumbnailInputUrl] = useState(thumbnailURL); // prettier-ignore
  const [isDishOpen, setIsDishOpen] = useState(false);

  const dishAccordion = isDishOpen
    ? "grid-rows-[1fr] visible opacity-100"
    : "grid-rows-[0fr] invisible opacity-0";

  const dishExpand = () => {
    setIsDishOpen(!isDishOpen);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitleInput(newTitle);
    if (changeTitle) {
      changeTitle(newTitle);
    }
  };

  const handleSubtitleChange = (newSubtitle: string) => {
    setSubtitleInput(newSubtitle);
    if (changeSubtitle) {
      changeSubtitle(newSubtitle);
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescriptionInput(newDescription);
    if (changeDescription) {
      changeDescription(newDescription);
    }
  };

  const handleThumbnailValueChange = (newValue: string) => {
    setThumbnailInputValue(newValue);
    console.log(newValue);
    if (changeThumbnailValue) {
      changeThumbnailValue(newValue);
    }
  };

  const handleThumbnailFileChange = (newFile: File | null) => {
    setThumbnailInputFile(newFile);
    console.log(newFile);
    if (changeThumbnailFile) {
      changeThumbnailFile(newFile);
    }
  };

  const handleThumbnailUrlChange = (newUrl: string) => {
    setThumbnailInputUrl(newUrl);
    console.log(newUrl);
    if (changeThumbnailURL) {
      changeThumbnailURL(newUrl);
    }
  };

  useEffect(() => {
    setTitleInput(title);
    setSubtitleInput(subtitle);
    setDescriptionInput(description);
    setThumbnailInputValue(thumbnailValue);
    setThumbnailInputFile(thumbnailFile);
  }, [title, subtitle, description, thumbnailValue, thumbnailFile]);

  return (
    <li
      aria-label={titleInput}
      className="grid w-full flex-shrink-0 animate-fade-up grid-rows-autoX1 overflow-hidden rounded border-2 border-dark-500 bg-dark-100 animate-ease-in-out"
    >
      <section className="flex items-center justify-between pl-3">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">#{count}</h3>
          <p className="text-grey">{titleInput}</p>
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
            toggle={deleteDish}
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
        className={`grid bg-dark-300 transition-all duration-300 ease-in-out ${dishAccordion}`}
      >
        <div className="overflow-hidden">
          <ul className="grid w-full grid-cols-2 gap-6 p-6">
            <li>
              <TextInput
                variant="text"
                label="Click to change the title of the dish"
                name="Title"
                placeholder="Title"
                valueChange={handleTitleChange}
                value={titleInput}
                required
              />
            </li>
            <li>
              <TextInput
                variant="text"
                label="Click to change the subtitle of the dish"
                name="Subtitle"
                placeholder="Subtitle"
                valueChange={handleSubtitleChange}
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
              <UploadThumbnail
                uploadThumbnailTitle="Thumbnail"
                uploadThumbnailDescription="Upload Thumbnail"
                uploadThumbnailId={count}
                uploadThumbnailValue={thumbnailInputValue}
                uploadThumbnailValueChange={handleThumbnailValueChange}
                uploadThumbnailFile={thumbnailInputFile}
                uploadThumbnailFileChange={handleThumbnailFileChange}
                uploadThumbnailUrl={thumbnailInputUrl}
                uploadThumbnailUrlChange={handleThumbnailUrlChange}
              />
            </li>
          </ul>
        </div>
      </section>
    </li>
  );
};

export default Dish;
