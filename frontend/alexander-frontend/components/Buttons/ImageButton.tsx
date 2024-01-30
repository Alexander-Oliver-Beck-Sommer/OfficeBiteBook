import ImageIcon from "@/components/Icons/ImageIcon";

const sizes = (size) => {
  switch (size) {
    case "normal":
      return { button: "h-20 w-20", icon: "h-10 w-10" };
    case "small":
      return { button: "h-12 w-12", icon: "h-6 w-6" };
    default:
      return { button: "h-20 w-20", icon: "h-10 w-10" };
  }
};

type ImageButtonPros = {
  toggle?: () => void;
  url?: string;
  label?: string;
  size?: string;
};

const ImageButton = ({
  toggle = () => {},
  url = "",
  label = "",
  size = "",
}: ImageButtonPros) => {
  const sizeValue = sizes(size);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className={`flex items-center justify-center rounded border-2 border-dark-500 bg-dark-100 bg-cover bg-center fill-dark-500 ${sizeValue.button}`}
      style={{ backgroundImage: `url(${url})` }}
    >
      {!url && <ImageIcon className={sizeValue.icon} />}
    </button>
  );
};

export default ImageButton;
