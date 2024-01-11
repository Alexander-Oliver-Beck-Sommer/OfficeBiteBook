import { useState } from "react";
import ImageIcon from "@/components/Icons/ImageIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import { v4 as uuidv4 } from "uuid";

type ThumbnailInputProps = {
  thumbnailInputTitle?: string;
  thumbnailInputId?: number;
  onValueChange?: (file: File | null) => void; 
  value?: string; 
};

const ThumbnailInput = ({
  thumbnailInputTitle = "",
  thumbnailInputId,
  onValueChange,
  value,
}: ThumbnailInputProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    value || null,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const uuid = uuidv4();
      const newFileName = `${uuid}.${file.type.split("/")[1]}`; 
      const newFile = new File([file], newFileName, { type: file.type }); 

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        if (onValueChange) onValueChange(newFile); 
      };
      reader.readAsDataURL(file);
    } else {
      if (onValueChange) onValueChange(null);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    const fileInput = document.getElementById(
      `dropzone-file-${thumbnailInputId}`,
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    if (onValueChange) onValueChange(null);
  };

  return (
    <section className="grid h-full grid-rows-autoX1 gap-4">
      <div>
        <p>{thumbnailInputTitle}</p>
      </div>
      <section className="flex gap-4">
        <div className="relative flex aspect-square h-full items-center justify-center rounded border-2 border-arsenic bg-eerie_black fill-arsenic">
          {uploadedImage ? (
            <div
              className="absolute flex h-full w-full flex-col justify-end bg-cover bg-center"
              style={{
                backgroundImage: `url(${uploadedImage})`,
              }}
            >
              <button
                className="flex h-8 w-8 items-center justify-center rounded-tr border-r-2 border-t-2 border-arsenic bg-eerie_black hover:border-sunset_orange hover:bg-sunset_orange"
                onClick={removeImage}
              >
                <DeleteIcon className="h-4 fill-ghost_white" />
              </button>
            </div>
          ) : (
            <>
              <ImageIcon className="h-14 w-14" />
            </>
          )}
        </div>
        <div className="flex w-full items-center justify-center">
          <label
            role="button"
            htmlFor={`dropzone-file-${thumbnailInputId}`}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-arsenic bg-eerie_black fill-arsenic outline outline-2 outline-transparent transition-all duration-300 ease-in-out hover:bg-raisin_black hover:fill-cool_grey focus-visible:outline-cool_grey"
            tabIndex={1}
          >
            <UploadIcon className="h-14 w-14" />
            <h5>Click to Upload</h5>
            <p className="text-xs">PNG or JPG</p>
            <input
              id={`dropzone-file-${thumbnailInputId}`}
              accept="image/png, image/jpeg"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </section>
    </section>
  );
};

export default ThumbnailInput;
