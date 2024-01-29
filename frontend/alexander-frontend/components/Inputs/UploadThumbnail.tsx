import React, { useState, useEffect } from "react";
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
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(uploadThumbnailUrl); // prettier-ignore

  useEffect(() => {
    setBackgroundImageUrl(uploadThumbnailUrl);
  }, [uploadThumbnailUrl]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const uuid = uuidv4();
      const fileExtension = file.name.split(".").pop();
      const fileName = `${uuid}.${fileExtension}`;

      const newFile = new File([file], fileName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      uploadThumbnailUrlChange("");
      setBackgroundImageUrl(URL.createObjectURL(newFile));
      uploadThumbnailValueChange(fileName);
      uploadThumbnailFileChange(newFile);
    }
  };

  const deleteThumbnail = () => {
    uploadThumbnailValueChange("");
    uploadThumbnailFileChange(null);
    uploadThumbnailUrlChange("");
    setBackgroundImageUrl("");
  };

  return (
    <section className="grid h-full grid-rows-autoX1 gap-4">
      <div>
        <p>{uploadThumbnailTitle}</p>
      </div>
      <div className="flex gap-4">
        <div className="border-dark-500 fill-dark-500 relative flex aspect-square h-full items-center justify-center rounded border-2 bg-dark-100">
          {backgroundImageUrl ? (
            <div
              className="absolute flex h-full w-full flex-col justify-end bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            >
              <button
                className="border-dark-500 hover:border-red hover:bg-red flex h-8 w-8 items-center justify-center rounded-tr border-r-2 border-t-2 bg-dark-100"
                onClick={deleteThumbnail}
              >
                <DeleteIcon className="fill-white h-4" />
              </button>
            </div>
          ) : (
            <ImageIcon className="h-14 w-14" />
          )}
        </div>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor={`dropzone-file-${uploadThumbnailId}`}
            className="hover:bg-dark-300 border-dark-500 fill-dark-500 hover:fill-grey focus-visible:outline-grey flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 bg-dark-100 outline outline-2 outline-transparent transition-all duration-300 ease-in-out"
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
