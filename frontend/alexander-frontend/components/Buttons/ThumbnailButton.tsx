import ImageIcon from "../Icons/ImageIcon";
import UploadIcon from "../Icons/UploadIcon";

type ThumbnailButtonProps = {
  title: string;
};

const ThumbnailButton = ({ title }: ThumbnailButtonProps) => {
  return (
    <section className="grid grid-rows-autoX1 gap-4">
      <div>
        <p>{title}</p>
      </div>
      <section className="flex gap-4">
        <div className="flex aspect-square h-full items-center justify-center rounded border-2 border-arsenic bg-eerie_black fill-arsenic">
          <ImageIcon className="h-14 w-14" />
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <label
            role="button"
            htmlFor="dropzone-file"
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-arsenic bg-eerie_black fill-arsenic outline outline-2 outline-transparent transition-all duration-300 ease-in-out hover:bg-raisin_black focus-visible:outline-cool_grey"
            tabIndex="0"
          >
            <UploadIcon className="h-14 w-14" />
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs">PNG or JPG (MAX. 800x400px)</p>
            <input
              id="dropzone-file"
              accept="image/png, image/jpeg"
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </section>
    </section>
  );
};

export default ThumbnailButton;
