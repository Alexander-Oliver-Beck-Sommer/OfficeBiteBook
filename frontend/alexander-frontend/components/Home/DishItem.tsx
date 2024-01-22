import ActionButton from "@/components/Buttons/ActionButton";
import ImageIcon from "@/components/Icons/ImageIcon";

type DishItemProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnail: string;
  toggle?: () => void;
};

const DishItem = ({
  title = "",
  subtitle = "",
  description = "",
  thumbnail = "",
  toggle = () => {},
}: DishItemProps) => {
  return (
    <li className="flex items-center justify-between p-3 even:bg-strange_black">
      <div className="grid w-full grid-cols-auto1Xauto gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded border border-arsenic bg-eerie_black">
          <ImageIcon className="h-6 w-6 fill-arsenic" />
        </div>
        <div className="flex w-full items-center overflow-hidden">
          <p className="truncate">{title}</p>
        </div>
        <div className="flex w-full items-center overflow-hidden">
          <p className="truncate">{subtitle}</p>
        </div>
        <ActionButton toggle={toggle} variant="icon-border-small" icon="info" />
      </div>
    </li>
  );
};

export default DishItem;
