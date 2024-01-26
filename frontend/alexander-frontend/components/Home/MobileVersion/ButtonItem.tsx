import UserAddIcon from "@/components/Icons/UserAddIcon";
import ZoomIcon from "@/components/Icons/ZoomIcon";

const icons = (icon: string) => {
  switch (icon) {
    case "guest":
      return <UserAddIcon className="h-5 w-5" />;
    case "zoom":
      return <ZoomIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

type ButtonItemProps = {
  toggle?: () => void;
  icon?: string;
  title?: string;
};

const ButtonItem = ({
  toggle = () => {},
  icon = "",
  title = "",
}: ButtonItemProps) => {
  const iconValue = icons(icon);

  return (
    <button
      onClick={toggle}
      className="group relative flex items-center justify-center gap-2 bg-eerie_black fill-apple px-4 py-2 outline-none transition-all duration-300 ease-in-out hover:bg-apple hover:fill-eerie_black hover:text-eerie_black focus-visible:bg-apple focus-visible:fill-eerie_black focus-visible:text-eerie_black md:bg-transparent md:fill-cool_grey md:p-0 md:text-cool_grey md:hover:bg-transparent md:hover:fill-apple md:hover:text-ghost_white"
    >
      {iconValue}
      <p>{title}</p>
      <div className="pointer-events-none absolute -bottom-[7px] left-0 hidden h-[3px] w-0 rounded-full bg-arsenic opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-apple group-hover:opacity-100 md:block"></div>
    </button>
  );
};

export default ButtonItem;
