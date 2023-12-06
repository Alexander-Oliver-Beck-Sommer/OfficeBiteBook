import ActionButton from "@/components/Buttons/ActionButton";
import ImageIcon from "@/components/Icons/ImageIcon";

const ChooseThumbnail = () => {
  return (
    <section className="flex">
      <div className="bg-eerie_black border-arsenic flex aspect-square h-full items-center justify-center rounded border-2">
        <ImageIcon className="h-20 w-20 fill-cool_grey" />
      </div>
      <div className="flex items-center justify-center px-12">
        <div className="flex flex-col gap-4">
          <div className="gap-2 flex flex-col">
            <h3>Thumbnail (Optional)</h3>
            <p className="text-cool_grey">
              Upload an image to reflect your delicious dish!
            </p>
          </div>
          <ActionButton
            label="Click to upload a thumbnail for the dish"
            icon="upload"
            variant="filled"
            name="Upload File"
          />
        </div>
      </div>
    </section>
  );
};

export default ChooseThumbnail;
