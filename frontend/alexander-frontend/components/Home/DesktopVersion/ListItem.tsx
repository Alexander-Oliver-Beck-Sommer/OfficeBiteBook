import UserAddIcon from "@/components/Icons/UserAddIcon";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";
import CheckboxInput from "@/components/Inputs/CheckboxInput";

type ListItemProps = {
  menu?: Array<string>;
  checkboxToggle?: () => void;
  dishesToggle?: () => void;
};

const ListItem = ({
  menu = null,
  checkboxToggle = () => {},
  dishesToggle = () => {},
}: ListItemProps) => {
  return (
    <div className="group/menu-item flex flex-col gap-4">
      <div className="text-grey grid grid-cols-autoX1 items-center gap-3">
        <div className="grid grid-cols-2 gap-3">
          <CheckboxInput onChange={checkboxToggle} />
          <button className="border-dark-500 fill-grey hover:border-primary hover:bg-primary focus-visible:border-primary focus-visible:bg-primary flex h-8 w-8 items-center justify-center rounded border-2 outline-0 transition-all duration-300 ease-in-out hover:fill-dark-100 focus-visible:fill-dark-100">
            <UserAddIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <p className="truncate">{menu.menu_title}</p>
          <p className="truncate">{menu.menu_location}</p>
          <p className="truncate">{menu.menu_date}</p>
          <p className="truncate">
            {menu.menu_start_time} - {menu.menu_end_time}
          </p>
          <div className="flex items-center justify-between">
            <p>{menu.menu_dishes_amount} items</p>
            <button
              onClick={dishesToggle}
              className="group/dish-button md:fill-grey md:text-grey md:hover:text-white fill-primary hover:bg-primary focus-visible:bg-primary md:hover:fill-primary relative flex items-center justify-center gap-1 bg-dark-100 px-4 py-2 outline-none transition-all duration-300 ease-in-out hover:fill-dark-100 hover:text-dark-100 focus-visible:fill-dark-100 focus-visible:text-dark-100 md:bg-transparent md:p-0 md:hover:bg-transparent"
            >
              <p>More</p>
              <RightArrowIcon />
              <div className="bg-dark-500 group-hover/dish-button:bg-primary pointer-events-none absolute -bottom-[7px] left-0 hidden h-[3px] w-0 rounded-full opacity-0 transition-all duration-300 ease-in-out group-hover/dish-button:w-full group-hover/dish-button:opacity-100 md:block"></div>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-dark-300 h-[2px] rounded-full group-last/menu-item:hidden"></div>
    </div>
  );
};

export default ListItem;
