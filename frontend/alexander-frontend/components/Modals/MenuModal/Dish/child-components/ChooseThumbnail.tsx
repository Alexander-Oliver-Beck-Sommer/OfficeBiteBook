import ActionButton from "@/components/Buttons/ActionButton";
import ImageIcon from "@/components/Icons/ImageIcon";

const ChooseThumbnail = () => {
  return (
    <section className="flex">
      <div className="flex aspect-square h-full items-center justify-center rounded border-2 border-davys_grey bg-dark_gunmetal">
        <ImageIcon className="h-75 w-75 fill-cool_grey" />
      </div>
      <div className="flex items-center justify-center px-48">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <h3>Thumbnail (Optional)</h3>
            <p className="text-cool_grey">
              Upload an image to reflect your delicious dish!
            </p>
          </div>
          <ActionButton label="Click to upload a thumbnail for the dish" icon="upload" variant="filled" name="Upload File" />
        </div>
      </div>
    </section>
  );
};

export default ChooseThumbnail;
