import React, { useState } from "react";
import ImageIcon from "../Icons/ImageIcon";
import UploadIcon from "../Icons/UploadIcon";
import { toast } from "react-toastify";

type ThumbnailButtonProps = {
  title: string;
};

const ThumbnailButton = ({ title }: ThumbnailButtonProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        toast.warn("Image size is over 1MB");
        toast.info(
          "Try to use a different image, or compress the image to a smaller size",
        );
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (img.width > 1600 || img.height > 1600) {
          toast.warn("Image resolution is over 1600x1600");
          toast.info(
            "Try cropping the image to a smaller size, or use a different image",
          );
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <section className="grid h-full grid-rows-autoX1 gap-4">
      <div>
        <p>{title}</p>
      </div>
      <section className="flex gap-4">
        <div
          className={`flex aspect-square h-full items-center justify-center rounded border-2 border-arsenic bg-eerie_black fill-arsenic ${
            imageSrc ? "bg-cover bg-center" : ""
          }`}
          style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : "none" }}
        >
          {!imageSrc && <ImageIcon className="h-14 w-14" />}
        </div>
        <div className="flex w-full items-center justify-center">
          <label
            role="button"
            htmlFor="dropzone-file"
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-arsenic bg-eerie_black fill-arsenic outline outline-2 outline-transparent transition-all duration-300 ease-in-out hover:bg-raisin_black hover:fill-cool_grey focus-visible:outline-cool_grey"
            tabIndex="0"
          >
            <UploadIcon className="h-14 w-14" />
            <h5>Click to Upload</h5>
            <p className="text-xs">PNG or JPG (MAX. 1600x1600)</p>
            <input
              id="dropzone-file"
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

export default ThumbnailButton;
