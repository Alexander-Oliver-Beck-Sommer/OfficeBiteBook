"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import TextArea from "@/components/Inputs/TextArea";
import UploadThumbnail from "@/components/Inputs/UploadThumbnail";

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
  menuId = "",
}: DishProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [subtitleInput, setSubtitleInput] = useState(subtitle);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [thumbnailName, setThumbnailName] = useState<string>(name);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(file);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(url);
  const [isDishOpen, setIsDishOpen] = useState(false);

  const dishAccordion = isDishOpen
    ? "grid-rows-[1fr] visible opacity-100"
    : "grid-rows-[0fr] invisible opacity-0";

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
    if (setDescription) {
      setDescription(newDescription);
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
  }, [title, subtitle, description]);

  // I swear to god, if someone touches this useEffect, i will smash their both femurs with a sledgehammer
  // Why does it work? I don't know. I don't care. It works.
  // TOUCH IT (◎﹏◎) AND I CAN'T GURANTEE WHAT WILL COME NEXT
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
            icon="inventory"
            label="Click to save the dish to the archive"
            variant="icon"
            title="Save the dish to the archive"
            name="Save"
          />
          <ActionButton
            icon="replace"
            label="Click to replace the dish with a dish from the archive"
            variant="icon"
            title="Replace the dish with a dish from the archive"
            name="Replace"
          />
          <ActionButton
            toggle={removeDishFromMenu}
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
                id={count}
                thumbnailURL={thumbnailUrl}
                changeThumbnail={changeThumbnail}
                removeThumbnail={removeThumbnail}
              />
            </li>
          </ul>
        </div>
      </section>
    </li>
  );
};

export default Dish;
