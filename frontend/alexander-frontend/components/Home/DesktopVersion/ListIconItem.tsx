import TextIcon from "@/components/Icons/TextIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import TimeIcon from "@/components/Icons/TimeIcon";
import RestaurantIcon from "@/components/Icons/RestaurantIcon";

const icons = (icon: string) => {
  switch (icon) {
    case "title":
      return <TextIcon className="h-5 w-5" />;
    case "location":
      return <LocationIcon className="h-5 w-5" />;
    case "date":
      return <CalendarIcon className="h-5 w-5" />;
    case "time":
      return <TimeIcon className="h-5 w-5" />;
    case "restaurant":
      return <RestaurantIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

type ListIconItemProps = {
  icon?: string;
  text?: string;
};

const ListIconItem = ({ icon = "", text = "" }: ListIconItemProps) => {
  const iconValue = icons(icon);

  return (
    <li className="fill-primary flex items-center gap-2 uppercase">
      {iconValue}
      <p>{text}</p>
    </li>
  );
};

export default ListIconItem;
