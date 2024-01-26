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
          <DesktopVersion menu={menusAndDishes} />
        </section>
      </section>
    </>
  );
};

export default HomeComponent;
