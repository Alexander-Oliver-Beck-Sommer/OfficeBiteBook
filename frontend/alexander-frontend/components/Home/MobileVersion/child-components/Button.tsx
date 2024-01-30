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

type ButtonProps = {
  toggle?: () => void;
  icon?: string;
  title?: string;
};

const Button = ({
  toggle = () => {},
  icon = "",
  title = "",
}: ButtonProps) => {
  const iconValue = icons(icon);

  return (
    <button
      onClick={toggle}
      className="group relative  flex items-center justify-center gap-2 bg-dark-100 fill-white px-4 py-2 text-grey outline-none transition-all duration-300 ease-in-out hover:bg-primary hover:fill-dark-100 hover:text-dark-100 focus-visible:bg-primary focus-visible:fill-dark-100 focus-visible:text-dark-100 md:bg-transparent md:fill-grey md:p-0 md:text-grey md:hover:bg-transparent md:hover:fill-primary md:hover:text-white"
    >
      {iconValue}
      <p>{title}</p>
      <div className="pointer-events-none absolute -bottom-2 left-0 hidden h-[3px] w-0 bg-dark-500 opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-primary group-hover:opacity-100 md:block"></div>
    </button>
  );
};

export default Button;
