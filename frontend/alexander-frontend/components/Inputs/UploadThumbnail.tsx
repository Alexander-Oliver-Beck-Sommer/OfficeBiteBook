import React, { useState } from "react";
import ImageIcon from "@/components/Icons/ImageIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import { v4 as uuidv4 } from "uuid";

type UploadThumbnailProps = {
  uploadThumbnailTitle?: string;
  uploadThumbnailDescription?: string;
  uploadThumbnailId?: number;
  uploadThumbnailValue?: string;
  uploadThumbnailValueChange?: (newValue: string) => void;
  uploadThumbnailFile?: File | null;
  uploadThumbnailFileChange?: (newFile: File | null) => void;
  uploadThumbnailUrl?: string;
  uploadThumbnailUrlChange?: (newUrl: string) => void;
};

const UploadThumbnail = ({
  uploadThumbnailTitle = "",
  uploadThumbnailDescription = "",
  uploadThumbnailId = 0,
  uploadThumbnailValue = "",
  uploadThumbnailValueChange = () => {},
  uploadThumbnailFile = null,
  uploadThumbnailFileChange = () => {},
  uploadThumbnailUrl = "",
  uploadThumbnailUrlChange = () => {},
}: UploadThumbnailProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const uuid = uuidv4();
      const fileExtension = file.name.split(".").pop();
      const fileName = `${uuid}.${fileExtension}`;

      // Create a new file object with the new name
      const newFile = new File([file], fileName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      uploadThumbnailValueChange(fileName);
      uploadThumbnailFileChange(newFile);
    }
  };

  return (
    <section className="grid h-full grid-rows-autoX1 gap-4">
      <div>
        <p>{uploadThumbnailTitle}</p>
      </div>
      <div className="flex gap-4">
        <div className="relative flex aspect-square h-full items-center justify-center rounded border-2 border-arsenic bg-eerie_black fill-arsenic">
          {/* {backgroundImageUrl ? (
            <div
              className="absolute flex h-full w-full flex-col justify-end bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
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
          )} */}
        </div>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor={`dropzone-file-${uploadThumbnailId}`}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-arsenic bg-eerie_black fill-arsenic outline outline-2 outline-transparent transition-all duration-300 ease-in-out hover:bg-raisin_black hover:fill-cool_grey focus-visible:outline-cool_grey"
          >
            <UploadIcon className="h-14 w-14" />
            <h5>{uploadThumbnailDescription}</h5>
            <p className="text-xs">PNG or JPG</p>
            <input
              id={`dropzone-file-${uploadThumbnailId}`}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default UploadThumbnail;
