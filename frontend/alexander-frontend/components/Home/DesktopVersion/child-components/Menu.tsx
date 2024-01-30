import CheckboxInput from "@/components/Inputs/CheckboxInput";
import TextIcon from "@/components/Icons/TextIcon";
import UserAddIcon from "@/components/Icons/UserAddIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import TimeIcon from "@/components/Icons/TimeIcon";
import RestaurantIcon from "@/components/Icons/RestaurantIcon";
import UnderlineButton from "@/components/Buttons/UnderlineButton";

type MenuProps = {
  checkToggle?: () => void;
  checked?: boolean;
  guestToggle?: () => void;
  title?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  dishesAmount?: number;
  modalToggle?: () => void;
};

const Menu = ({
  checkToggle = () => {},
  checked = false,
  guestToggle = () => {},
  title = "",
  location = "",
  date = "",
  startTime = "",
  endTime = "",
  dishesAmount = 0,
  modalToggle = () => {},
}: MenuProps) => {
  const menuSections = [
    {
      Icon: TextIcon,
      text: title,
    },
    {
      Icon: LocationIcon,
      text: location,
    },
    {
      Icon: CalendarIcon,
      text: date,
    },
    {
      Icon: TimeIcon,
      text: `${startTime} - ${endTime}`,
    },
    {
      Icon: RestaurantIcon,
      text: `${dishesAmount} dishes`,
    },
  ];

  return (
    <li className="grid w-full max-w-screen-xl animate-fade-up grid-cols-autoX1 gap-6">
      <div className="flex flex-col gap-2">
        <CheckboxInput
          onChange={checkToggle}
          initialChecked={checked}
          label="Participate menu"
        />
        <button className="flex h-8 w-8 items-center justify-center rounded border-2 border-dark-500 fill-grey outline-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:fill-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:fill-dark-100">
          <UserAddIcon className="h-5 w-5" />
        </button>
      </div>
      <ul className="grid w-full grid-cols-6 rounded border-2 border-dark-500 bg-dark-100 fill-white text-grey">
        {menuSections.map(({ Icon, text }, index) => (
          <li key={index} className="flex items-center justify-center p-4">
            <div className="flex w-full items-center gap-2 border-r-2 border-dark-400">
              <Icon className="h-5 w-5" />
              <p className="truncate">{text}</p>
            </div>
          </li>
        ))}
        <li className="flex items-center justify-center p-4">
          <div className="flex w-full items-center justify-end gap-2">
            <UnderlineButton
              toggle={modalToggle}
              label="Read more"
              icon="arrow-right"
              direction="right"
            />
          </div>
        </li>
      </ul>
    </li>
  );
};

export default Menu;
