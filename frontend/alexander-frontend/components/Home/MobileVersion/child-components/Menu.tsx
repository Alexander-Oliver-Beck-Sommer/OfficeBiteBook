import CheckboxInput from "@/components/Inputs/CheckboxInput";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import Button from "@/components/Home/MobileVersion/child-components/Button";
import LocationIcon from "@/components/Icons/LocationIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import TimeIcon from "@/components/Icons/TimeIcon";
import RestaurantIcon from "@/components/Icons/RestaurantIcon";

type MenuProps = {
  checkIndividual?: () => void;
  checked?: boolean;
  guestToggle?: () => void;
  id?: string;
  title?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  dishesAmount?: number;
  modalToggle?: () => void;
  accordionToggle?: () => void;
  accordionId?: string;
};

const Menu = ({
  checkIndividual = () => {},
  checked = false,
  guestToggle = () => {},
  id = "",
  title = "",
  location = "",
  date = "",
  startTime = "",
  endTime = "",
  dishesAmount = 0,
  modalToggle = () => {},
  accordionToggle = () => {},
  accordionId = "",
}) => {
  const menuSections = [
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
    <li className="animate-fade-up overflow-hidden rounded border-2 border-dark-500 animate-ease-in-out">
      <div className="grid grid-cols-autoX1 items-center gap-4 bg-dark-100 p-4 md:px-12">
        <CheckboxInput
          label={title}
          initialChecked={checked}
          onChange={checkIndividual}
        />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h4>{title}</h4>
            <h6 className="text-grey">{date}</h6>
          </div>
          <button onClick={accordionToggle}>
            <ArrowIcon
              variant="right"
              className={` transition-all duration-300 ease-in-out ${
                accordionId === id ? "rotate-90 fill-white" : "fill-grey"
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          accordionId === id
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-[1px] overflow-hidden">
          {menuSections.map(({ Icon, text }, index) => (
            <li
              key={index}
              className="flex items-center justify-center bg-dark-300 p-4 md:px-12"
            >
              <div className="flex w-full items-center gap-2">
                <Icon className="h-5 w-5 fill-white" />
                <p className="truncate text-grey">{text}</p>
              </div>
            </li>
          ))}
          <li className="bg-dark-100 fill-white p-4 text-white md:px-12">
            <div className="grid grid-cols-2 gap-[1px] overflow-hidden rounded border border-dark-500 bg-dark-500 md:flex md:justify-end md:gap-8 md:overflow-visible md:rounded-none md:border-none md:bg-transparent">
              <Button title="Guestlist" icon="guest" toggle={guestToggle} />
              <Button title="Read More" icon="zoom" toggle={modalToggle} />
            </div>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default Menu;
