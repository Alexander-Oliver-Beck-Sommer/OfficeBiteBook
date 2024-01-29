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
      className="md:fill-grey md:text-grey md:hover:text-white fill-primary hover:bg-primary focus-visible:bg-primary md:hover:fill-primary group relative flex items-center justify-center gap-2 bg-dark-100 px-4 py-2 outline-none transition-all duration-300 ease-in-out hover:fill-dark-100 hover:text-dark-100 focus-visible:fill-dark-100 focus-visible:text-dark-100 md:bg-transparent md:p-0 md:hover:bg-transparent"
    >
      {iconValue}
      <p>{title}</p>
      <div className="bg-dark-500 group-hover:bg-primary pointer-events-none absolute -bottom-[7px] left-0 hidden h-[3px] w-0 rounded-full opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:opacity-100 md:block"></div>
    </button>
  );
};

export default ButtonItem;
