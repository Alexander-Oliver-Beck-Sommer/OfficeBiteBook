import React, { useState, useEffect } from "react";
import ImageIcon from "@/components/Icons/ImageIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import { v4 as uuidv4 } from "uuid";

type ThumbnailInputProps = {
  thumbnailInputTitle?: string;
  thumbnailInputId?: number;
  onThumbnailChange: (newThumbnailFile: File | null) => void;
  thumbnailInputUrl?: string;
  onThumbnailUrlChange?: (newThumbnailUrl: string) => void;
};

const ThumbnailInput = ({
  thumbnailInputTitle = "",
  thumbnailInputId = 0,
  onThumbnailChange,
  thumbnailInputUrl = "",
  onThumbnailUrlChange,
}: ThumbnailInputProps) => {
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);

  useEffect(() => {
    // Set the initial thumbnail image from the URL if it exists
    if (thumbnailInputUrl) {
      setThumbnailImage(thumbnailInputUrl);
    }
  }, [thumbnailInputUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailImage(reader.result as string);
        onThumbnailChange(file);
        // Reset the URL when a new file is uploaded
        if (onThumbnailUrlChange) {
          onThumbnailUrlChange("");
        }
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailImage(null);
      onThumbnailChange(null);
    }
  };

  const deleteThumbnail = () => {
    setThumbnailImage(null);
    onThumbnailChange(null);
    if (onThumbnailUrlChange) {
      onThumbnailUrlChange("");
    }
  };

  return (
    <section className="grid h-full grid-rows-autoX1 gap-4">
      <div>
        <p>{thumbnailInputTitle}</p>
      </div>
      <div className="flex gap-4">
        <div className="relative flex aspect-square h-full items-center justify-center rounded border-2 border-arsenic bg-eerie_black fill-arsenic">
          {thumbnailImage ? (
            <div
              className="absolute flex h-full w-full flex-col justify-end bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailImage})` }}
            >
              <button
                className="flex h-8 w-8 items-center justify-center rounded-tr border-r-2 border-t-2 border-arsenic bg-eerie_black hover:border-sunset_orange hover:bg-sunset_orange"
                onClick={deleteThumbnail}
              >
                <DeleteIcon className="h-4 fill-ghost_white" />
              </button>
            </div>
          ) : (
            <ImageIcon className="h-14 w-14" />
          )}
        </div>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor={`dropzone-file-${thumbnailInputId}`}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-arsenic bg-eerie_black fill-arsenic outline outline-2 outline-transparent transition-all duration-300 ease-in-out hover:bg-raisin_black hover:fill-cool_grey focus-visible:outline-cool_grey"
          >
            <UploadIcon className="h-14 w-14" />
            <h5>Click to Upload</h5>
            <p className="text-xs">PNG or JPG</p>
            <input
              id={`dropzone-file-${thumbnailInputId}`}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default ThumbnailInput;
