"use client";
import useHome from "@/hooks/useHome";
import QuestionIcon from "@/components/Icons/QuestionIcon";
import ActionButton from "@/components/Buttons/ActionButton";
import ToggleInput from "@/components/Inputs/ToggleInput";
import DishItem from "@/components/Home/DishItem";
import ContentModal from "@/components/Modals/ContentModal/ContentModal";
import ListItem from "@/components/Modals/ContentModal/ListItem/ListItem";
import ImageItem from "@/components/Modals/ContentModal/ImageItem/ImageItem";
import HeaderItem from "./HeaderItem";
import CheckboxInput from "../Inputs/CheckboxInput";
import DownArrowIcon from "../Icons/DownArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import LocationIcon from "../Icons/LocationIcon";
import TimeIcon from "../Icons/TimeIcon";
import RestaurantIcon from "../Icons/RestaurantIcon";
import InfoIcon from "../Icons/InfoIcon";
import UserAddIcon from "../Icons/UserAddIcon";
import ZoomIcon from "../Icons/ZoomIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import TextIcon from "../Icons/TextIcon";
import BookIcon from "../Icons/BookIcon";
import MobileVersion from "./MobileVersion/MobileVersion";
import DesktopVersion from "./DesktopVersion/DesktopVersion";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const {
    menusAndDishes,
    weekNumber,
    handleMenuSelect,
    selectedMenuId,
    handleModalOpen,
    handleModalClose,
    modalContent,
    isModalOpen,
  } = useHome(userId, userEmail);

  const handleCheckboxChange = (checked: boolean) => {
    console.log(checked);
  };

  return (
    <>
      <section className="h-full w-full">
        <HeaderItem
          subtitle="Previewing:"
          weekNumber={weekNumber}
          title="Week"
        />
        <section className="px-4 py-6 md:px-12">
          <ul className="flex flex-col gap-6 lg:hidden">
            {menusAndDishes.map((menu) => (
              <MobileVersion
                key={`mobile-${menu.menu_id}`}
                menu={menu}
                checkboxToggle={handleCheckboxChange}
                accordionToggle={() => handleMenuSelect(menu.menu_id)}
                selectedMenuId={selectedMenuId}
              />
            ))}
          </ul>
          {/* <section className="col-span-3 hidden bg-strange_black p-12 lg:block">
            <ul className="flex flex-col gap-4">
              <li className="grid grid-cols-autoX1 items-center gap-4 xl:gap-6">
                <div className="grid-cols-2 gap-3 xl:grid">
                  <CheckboxInput className="h-5 w-5" />
                  <div className="hidden h-8 w-8 xl:block"></div>
                </div>
                <div className="grid grid-cols-5 gap-3 fill-apple uppercase">
                  <div className="flex items-center gap-1 xl:gap-2">
                    <TextIcon className="h-5 w-5" />
                    <p>Title</p>
                  </div>
                  <div className="flex items-center gap-1 xl:gap-2">
                    <LocationIcon className="h-5 w-5" />
                    <h4>Location</h4>
                  </div>
                  <div className="flex items-center gap-1 xl:gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <h4>Date</h4>
                  </div>
                  <div className="flex items-center gap-1 xl:gap-2">
                    <TimeIcon className="h-5 w-5" />
                    <h4>Hours</h4>
                  </div>
                  <div className="flex items-center gap-1 xl:gap-2">
                    <RestaurantIcon className="h-5 w-5" />
                    <h4>Dishes</h4>
                  </div>
                </div>
              </li>
              <li className="h-[2px] rounded-full bg-apple"></li>
              {menusAndDishes.map((menu) => (
                <li
                  key={`desktop-menu-${menu.menu_id}`}
                  className="group/menu-item flex flex-col gap-4"
                >
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
                </li>
              ))}
            </ul>
          </section>
          <section className="pattern col-span-2 hidden lg:block"></section> */}
          <DesktopVersion menu={menusAndDishes} />
        </section>
      </section>
    </>
  );
};

export default HomeComponent;
