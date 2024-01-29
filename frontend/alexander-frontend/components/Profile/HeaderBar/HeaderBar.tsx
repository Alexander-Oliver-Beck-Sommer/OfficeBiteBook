import ThumbnailButton from "@/components/Profile/HeaderBar/ThumbnailButton";

type HeaderBarProps = {
  fileRef?: React.MutableRefObject<HTMLInputElement>;
  changeAvatar?: (file: File) => void;
  avatarToggle?: () => void;
  avatarURL?: string;
  originalUserName?: string;
};

const HeaderBar = ({
  fileRef = React.createRef<HTMLInputElement>(),
  changeAvatar = () => {},
  avatarToggle = () => {},
  avatarURL = "",
  originalUserName = "",
}: HeaderBarProps) => {
  return (
    <header className="flex justify-center border-b border-dark-400 bg-dark-200 p-4 md:px-12 md:py-6">
      <div className="grid w-full max-w-screen-xl grid-cols-autoX1 gap-4 md:gap-6">
        <ThumbnailButton
          fileRef={fileRef}
          changeAvatar={changeAvatar}
          avatarToggle={avatarToggle}
          avatarURL={avatarURL}
          originalUserName={originalUserName}
        />
        <div className="flex flex-col justify-end overflow-hidden">
          <h4 className="text-sm text-grey md:text-base">Welcome back,</h4>
          <h2 className="w-full truncate font-semibold md:text-2xl">
            {originalUserName ? originalUserName : "Unnamed account"}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
