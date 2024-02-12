import { useState, useEffect } from "react";

interface UseDishProps {
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
  menuId?: string;
}

const useDish = ({
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
}: UseDishProps) => {
  const [titleInput, setTitleInput] = useState<string | null>(title);
  const [subtitleInput, setSubtitleInput] = useState<string | null>(subtitle);
  const [descriptionInput, setDescriptionInput] = useState<string | null>(description); // prettier-ignore
  const [thumbnailName, setThumbnailName] = useState<string | null>(name);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(file);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(url);
  const [recipeInput, setRecipeInput] = useState<string | null>(recipe);

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

  const convertPNGtoJPG = async (file: File) => {
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

  useEffect(() => {
    setTitleInput(title);
    setSubtitleInput(subtitle);
    setDescriptionInput(description);
    setRecipeInput(recipe);
  }, [title, subtitle, description, recipe]);

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

  return {
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
  };
};

export default useDish;
