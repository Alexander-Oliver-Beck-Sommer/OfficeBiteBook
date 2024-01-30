import ImageButton from "@/components/Buttons/ImageButton";

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
      <ImageButton
        toggle={avatarToggle}
        url={avatarURL}
        label={originalUserName}
      />
    </>
  );
};

export default ThumbnailButton;
