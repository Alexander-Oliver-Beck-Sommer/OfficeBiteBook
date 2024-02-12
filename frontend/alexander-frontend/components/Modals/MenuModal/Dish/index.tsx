"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import TextArea from "@/components/Inputs/TextArea";
import UploadThumbnail from "@/components/Inputs/UploadThumbnail";
import Accordion from "@/components/Accordion";

type DishProps = {
  count?: number;
  title?: string;
  setTitle?: (newTitle: string) => void;
  subtitle?: string;
  setSubtitle?: (newSubtitle: string) => void;
  description?: string;
  setDescription?: (newDescription: string) => void;
  name?: string;
  setName?: (newName: string) => void;
  file?: File;
  setFile?: (newFile: File) => void;
  url?: string;
  setUrl?: (newUrl: string) => void;
  removeDishFromMenu?: () => void;
  recipe?: string;
  setRecipe?: (newRecipe: string) => void;
  menuId?: string;
};

const Dish = ({
  count = 0,
  title = "",
  setTitle = () => {},
  subtitle = "",
  setSubtitle = () => {},
  description = "",
  setDescription = () => {},
  name = "",
  setName = () => {},
  file = null,
  setFile = () => {},
  url = "",
  setUrl = () => {},
  removeDishFromMenu = () => {},
  recipe = "",
  setRecipe = () => {},
  menuId = "",
  accordionState,
  handleAccordion,
}: DishProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [subtitleInput, setSubtitleInput] = useState(subtitle);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [thumbnailName, setThumbnailName] = useState<string>(name);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(file);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(url);
  const [recipeInput, setRecipeInput] = useState(recipe);
  const [isDishOpen, setIsDishOpen] = useState(false);

  const dishExpand = () => {
    setIsDishOpen(!isDishOpen);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitleInput(newTitle);
    if (setTitle) {
      setTitle(newTitle);
    }
  };

  const handleSubtitleChange = (newSubtitle: string) => {
    setSubtitleInput(newSubtitle);
    if (setSubtitle) {
      setSubtitle(newSubtitle);
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescriptionInput(newDescription);
    console.log(newDescription);
    if (setDescription) {
      setDescription(newDescription);
    }
  };

  const handleRecipeChange = (newRecipe: string) => {
    setRecipeInput(newRecipe);
    console.log(newRecipe);
    if (setRecipe) {
      setRecipe(newRecipe);
    }
  };

  const changeThumbnail = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      let processedFile = file;
      if (file.type === "image/png") {
        processedFile = await convertPNGtoJPG(file);
      }
      const fileExtension = processedFile.type.split("/").pop();
      const fileName = `${menuId}.${fileExtension}`;
      setThumbnailFile(processedFile);
      setThumbnailName(fileName);
      setThumbnailUrl(URL.createObjectURL(processedFile));
    } else {
      alert("Please select a JPEG or PNG image.");
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailName("");
    setThumbnailUrl("");

    // Update parent component
    if (setFile) setFile(null);
    if (setName) setName("");
    if (setUrl) setUrl("");
  };

  const convertPNGtoJPG = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(new File([blob], `${menuId}.jpg`, { type: "image/jpeg" }));
          }, "image/jpeg");
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setTitleInput(title);
    setSubtitleInput(subtitle);
    setDescriptionInput(description);
    setRecipeInput(recipe);
  }, [title, subtitle, description, recipe]);

  // It works. But it's not the best way to do it.
  useEffect(() => {
    if (thumbnailFile && setFile && file !== thumbnailFile) {
      setFile(thumbnailFile);
    }
    if (thumbnailName && setName && name !== thumbnailName) {
      setName(thumbnailName);
    }
    if (thumbnailUrl && setUrl && url !== thumbnailUrl) {
      setUrl(thumbnailUrl);
    }
  }, [
    thumbnailFile,
    thumbnailName,
    thumbnailUrl,
    file,
    name,
    url,
    setFile,
    setName,
    setUrl,
  ]);

  return (
    <Accordion
      variant="dish"
      text={titleInput}
      count={count}
      deleteToggle={removeDishFromMenu}
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
