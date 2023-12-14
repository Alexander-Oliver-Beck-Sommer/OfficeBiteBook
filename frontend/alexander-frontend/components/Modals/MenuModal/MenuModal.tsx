import { useEffect } from "react";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuSettings from "@/components/Modals/MenuModal/MenuSettings/MenuSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import FooterBar from "@/components/Modals/MenuModal/FooterBar/FooterBar";
import useMenuModal from "@/hooks/useMenuModal"; // <== This is where the magic happens

type MenuModalProps = {
  title?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  menuVisible: boolean;
  toggle: () => void;
};

const MenuModal = ({
  title,
  location,
  date,
  startTime,
  endTime,
  menuVisible = false,
  toggle,
}: MenuModalProps) => {
  const {
    menuTitle,
    onTitleChange,
    menuLocation,
    onLocationChange,
    menuDate,
    onDateChange,
    menuStartTime,
    onStartTimeChange,
    menuEndTime,
    onEndTimeChange,
    dishes,
    clearAllDishes,
    createDish,
    deleteDish,
    toggleDish,
    expandedDish,
    validationState,
    cancelMenu,
    acceptMenu,
  } = useMenuModal(date, startTime, menuVisible, toggle);

  // This useEffect hook is used to disable scrolling when the modal is open
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (menuVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [menuVisible]);

  return (
    <section
      aria-hidden={!menuVisible}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        menuVisible ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      <div className="relative flex h-full w-full items-center justify-center px-10 py-10 lg:px-12 lg:py-12">
        <section
          className="absolute inset-0 z-40 cursor-pointer bg-eerie_black opacity-95 transition-all duration-300 ease-in-out hover:bg-strange_black"
          onClick={toggle}
        ></section>
        <section
          className={`relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 border-arsenic bg-eerie_black ${
            menuVisible ? "animate-fade-up animate-ease-in-out" : ""
          } `}
        >
          {/* The HeaderBar component contains:
              - Entered menu title
              - Menu archive and save button
              - Template archive and save button
              - Clear all dishes button
              - Delete menu button
          */}
          <HeaderBar
            deleteToggle={toggle}
            title={menuTitle}
            clearToggle={clearAllDishes}
          />
          <section className="grid grid-cols-30X70">
            <MenuSettings
              title={menuTitle}
              onTitleChange={onTitleChange}
              location={location}
              onLocationChange={onLocationChange}
              date={date}
              onDateChange={onDateChange}
              startTime={startTime}
              onStartTimeChange={onStartTimeChange}
              endTime={endTime}
              onEndTimeChange={onEndTimeChange}
              validationState={validationState}
            />
            <div className="pattern relative overflow-scroll">
              <ul className="absolute inset-0 flex flex-col gap-8 px-8 py-8">
                {dishes.map((dish) => (
                  <Dish
                    key={dish.id}
                    dishCount={dishes.indexOf(dish) + 1}
                    isDishOpen={expandedDish === dish.id}
                    toggleDish={() => toggleDish(dish.id)}
                    deleteToggle={() => deleteDish(dish.id)}
                  />
                ))}
              </ul>
            </div>
          </section>
          <FooterBar
            cancelMenu={cancelMenu}
            createDish={createDish}
            acceptMenu={acceptMenu}
          />
        </section>
      </div>
    </section>
  );
};

export default MenuModal;
