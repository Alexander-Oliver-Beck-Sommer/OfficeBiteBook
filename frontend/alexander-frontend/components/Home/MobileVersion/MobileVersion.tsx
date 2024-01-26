import CheckboxInput from "@/components/Inputs/CheckboxInput";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";
import ListItem from "@/components/Home/MobileVersion/ListItem";
import ButtonItem from "@/components/Home/MobileVersion/ButtonItem";

type MobileVersionProps = {
  menu?: Array<string>;
  checkboxToggle?: (checked: boolean) => void;
  accordionToggle?: () => void;
  selectedMenuId?: string;
  guestlistToggle?: () => void;
  readMoreToggle?: () => void;
};

const MobileVersion = ({
  menu = null,
  checkboxToggle = () => {},
  accordionToggle = () => {},
  selectedMenuId = "",
  guestlistToggle = () => {},
  readMoreToggle = () => {},
}: MobileVersionProps) => {
  return (
    <li className="overflow-hidden rounded border-2 border-arsenic">
      <div className="grid grid-cols-autoX1 items-center gap-4 bg-eerie_black p-4 md:px-8">
        <CheckboxInput
          label={menu.menu_title}
          initialChecked={false}
          onChange={checkboxToggle}
        />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h6 className="text-cool_grey">{menu.menu_date}</h6>
            <h4>{menu.menu_title}</h4>
          </div>
          <button onClick={accordionToggle}>
            <RightArrowIcon
              className={` transition-all duration-300 ease-in-out ${
                selectedMenuId === menu.menu_id
                  ? "rotate-90 fill-ghost_white"
                  : "fill-cool_grey"
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          selectedMenuId === menu.menu_id
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="flex flex-col gap-[1px] overflow-hidden">
          <ListItem
            title="Location"
            icon="location"
            text={menu.menu_location}
          />
          <ListItem title="Date" icon="date" text={menu.menu_date} />
          <ListItem
            title="Hours"
            icon="time"
            text={`${menu.menu_start_time} - ${menu.menu_end_time}`}
          />
          <ListItem
            title="Dishes"
            icon="restaurant"
            text={`${menu.menu_dishes_amount} items`}
          />
          <li className="bg-eerie_black fill-ghost_white p-4 text-ghost_white md:px-8 ">
            <div className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-full border border-arsenic bg-arsenic md:flex md:justify-end md:gap-8 md:overflow-visible md:rounded-none md:border-none md:bg-transparent">
              <ButtonItem
                title="Guestlist"
                icon="guest"
                toggle={guestlistToggle}
              />
              <ButtonItem
                title="Read More"
                icon="zoom"
                toggle={readMoreToggle}
              />
            </div>
          </li>
        </div>
      </div>
    </li>
  );
};

export default MobileVersion;
