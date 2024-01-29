import LocationIcon from "@/components/Icons/LocationIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import TimeIcon from "@/components/Icons/TimeIcon";
import RestaurantIcon from "@/components/Icons/RestaurantIcon";

const icons = (icon: string) => {
  switch (icon) {
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

type ListItemProps = {
  title?: string;
  icon?: string;
  text?: string;
};

const ListItem = ({ title = "", icon = "", text = "" }: ListItemProps) => {
  const iconValue = icons(icon);

  return (
    <li className="bg-dark-200 fill-primary grid grid-cols-2 p-4 md:px-8">
      <h4>{title}</h4>
      <div className="grid grid-cols-autoX1 items-center gap-2">
        {iconValue}
        <p className="text-grey truncate">{text}</p>
      </div>
    </li>
  );
};

export default ListItem;
