import ImageIcon from "@/components/Icons/ImageIcon";
import EditIcon from "@/components/Icons/EditIcon";

type ThumbnailButtonProps = {
  fileRef?: React.MutableRefObject<HTMLInputElement>;
  changeAvatar?: (file: File) => void;
  avatarToggle?: () => void;
  avatarURL?: string;
  originalUserName?: string;
};

const ThumbnailButton = ({
  fileRef = React.createRef<HTMLInputElement>(),
  changeAvatar = () => {},
  avatarToggle = () => {},
  avatarURL = "",
  originalUserName = "",
}: ThumbnailButtonProps) => {
  return (
    <>
      {/* The input in this case is hidden. 
      The only thing we want from it, is the built-in functionality that comes along with "type=file". 
      If something is awry, mess with the button instead!!! */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileRef}
        onChange={changeAvatar}
        className="hidden"
      />
      <button
        onClick={avatarToggle}
        className="group relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded border-2 border-dark-400 bg-dark-100 bg-cover bg-center shadow-lg md:h-28 md:w-28"
        style={{ backgroundImage: `url(${avatarURL})` }}
      >
        {!avatarURL && (
          <ImageIcon className="h-8 w-8 fill-dark-500 md:h-10 md:w-10" />
        )}
        <div className="invisible absolute inset-0 z-20 bg-primary opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-85"></div>
        <div className="invisible absolute inset-0 z-30 flex items-center justify-center fill-transparent transition-all duration-300 ease-in-out group-hover:visible group-hover:fill-dark-100">
          <EditIcon className="h-8 w-8 md:h-8 md:w-8" />
        </div>
      </button>
    </>
  );
};

export default ThumbnailButton;
