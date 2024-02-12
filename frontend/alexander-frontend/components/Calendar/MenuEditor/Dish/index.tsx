"use client";
import React from "react";
import Accordion from "@/components/Accordion";
import TextInput from "@/components/Inputs/TextInput";
import TextArea from "@/components/Inputs/TextArea";
import UploadThumbnail from "@/components/Inputs/UploadThumbnail";
import useDish from "./useDish";

interface DishProps {
  count?: number;
  menuId?: string;
  accordionState?: boolean;
  handleAccordion?: (state: boolean) => void;
  removeToggle?: () => void;
  title?: string;
  setTitle?: (newTitle: string) => void;
  subtitle?: string;
  setSubtitle?: (newSubtitle: string) => void;
  description?: string;
  setDescription?: (newDescription: string) => void;
  recipe?: string;
  setRecipe?: (newRecipe: string) => void;
  name?: string;
  setName?: (newName: string) => void;
  file?: File | null;
  setFile?: (newFile: File | null) => void;
  url?: string;
  setUrl?: (newUrl: string) => void;
}

const Dish: React.FC<DishProps> = ({
  count = 0,
  menuId,
  accordionState,
  handleAccordion,
  removeToggle,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  description,
  setDescription,
  recipe,
  setRecipe,
  name,
  setName,
  file,
  setFile,
  url,
  setUrl,
}) => {
  const {
    titleInput,
    handleTitleChange,
    subtitleInput,
    handleSubtitleChange,
    descriptionInput,
    handleDescriptionChange,
    thumbnailUrl,
    changeThumbnail,
    removeThumbnail,
    recipeInput,
    handleRecipeChange,
  } = useDish(
    title,
    setTitle,
    subtitle,
    setSubtitle,
    description,
    setDescription,
    recipe,
    setRecipe,
    name,
    setName,
    file,
    setFile,
    url,
    setUrl,
    menuId,
  );

  return (
    <Accordion
      variant="dish"
      text={titleInput}
      count={count}
      deleteToggle={removeToggle}
      accordionState={accordionState}
      setAccordionState={handleAccordion}
      id={`dish-${count}`}
    >
      <ul className="grid grid-cols-2 gap-5 p-5">
        <li>
          <TextInput
            variant="text"
            label="Click to change the title of the dish"
            name="Title"
            placeholder="Title"
            value={titleInput}
            valueChange={handleTitleChange}
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
            id={count}
            thumbnailURL={thumbnailUrl}
            changeThumbnail={changeThumbnail}
            removeThumbnail={removeThumbnail}
          />
        </li>
        <li className="col-span-2">
          <TextInput
            variant="link"
            label="Click to change the recipe of the dish"
            name="Recipe"
            placeholder="Recipe"
            valueChange={handleRecipeChange}
            value={recipeInput}
          />
        </li>
      </ul>
    </Accordion>
  );
};

export default Dish;
