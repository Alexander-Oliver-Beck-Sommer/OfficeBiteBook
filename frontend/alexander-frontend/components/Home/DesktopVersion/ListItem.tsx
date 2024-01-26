import UserAddIcon from "@/components/Icons/UserAddIcon";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";
import CheckboxInput from "@/components/Inputs/CheckboxInput";

type ListItemProps = {
  menu?: Array<string>;
};

const ListItem = ({ menu = null }: ListItemProps) => {
  return (
    <div className="group/menu-item flex flex-col gap-4">
      <div className="grid grid-cols-autoX1 items-center gap-3 text-cool_grey xl:gap-6">
        <div className="flex grid-cols-2 flex-col gap-4 xl:grid">
          <CheckboxInput />
          <button className="flex h-8 w-8 items-center justify-center rounded border-2 border-arsenic fill-cool_grey outline-0 transition-all duration-300 ease-in-out hover:border-apple hover:bg-apple hover:fill-eerie_black focus-visible:border-apple focus-visible:bg-apple focus-visible:fill-eerie_black">
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
            <button className="group/dish-button relative flex items-center justify-center gap-1 bg-eerie_black fill-apple px-4 py-2 outline-none transition-all duration-300 ease-in-out hover:bg-apple hover:fill-eerie_black hover:text-eerie_black focus-visible:bg-apple focus-visible:fill-eerie_black focus-visible:text-eerie_black md:bg-transparent md:fill-cool_grey md:p-0 md:text-cool_grey md:hover:bg-transparent md:hover:fill-apple md:hover:text-ghost_white">
              <p>More</p>
              <RightArrowIcon />
              <div className="pointer-events-none absolute -bottom-[7px] left-0 hidden h-[3px] w-0 rounded-full bg-arsenic opacity-0 transition-all duration-300 ease-in-out group-hover/dish-button:w-full group-hover/dish-button:bg-apple group-hover/dish-button:opacity-100 md:block"></div>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[2px] rounded-full bg-raisin_black group-last/menu-item:hidden"></div>
    </div>
  );
};

export default ListItem;
