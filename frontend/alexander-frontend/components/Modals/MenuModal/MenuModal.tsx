import { supabase } from "@/components/Supabase/supabaseClient";
import { toast } from "react-toastify";
import { useEffect } from "react";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuSettings from "@/components/Modals/MenuModal/MenuSettings/MenuSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import FooterBar from "@/components/Modals/MenuModal/FooterBar/FooterBar";
import useMenuModal from "@/hooks/useMenuModal";

type MenuModalProps = {
  visible: boolean;
  title?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  toggle: () => void;
};

const MenuModal = ({
  visible = false,
  title,
  location,
  date,
  startTime,
  endTime,
  toggle,
}: MenuModalProps) => {
  const {
    dishes,
    menuTitle,
    menuLocation,
    menuDate,
    menuStartTime,
    menuEndTime,
    createDish,
    deleteDish,
    clearAllDishes,
    onTitleChange,
    onLocationChange,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange,
    scrollToTop,
    cancelMenu,
    toggleDish,
    expandedDish,
  } = useMenuModal(date, startTime, visible, toggle);

  const acceptMenu = async () => {
    try {
      const { data, error } = await supabase.from("menus").insert([
        {
          menu_title: menuTitle,
          menu_location: menuLocation,
          menu_date: menuDate,
          menu_start_time: menuStartTime,
          menu_end_time: menuEndTime,
        },
      ]);

      if (error) {
        throw error;
      } else {
        toast.success("Menu saved");
        toggle();
      }
    } catch (error) {
      toast.error("Menu couldn't be saved");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (visible) {
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
  }, [visible]);

  return (
    <section
      aria-hidden={!visible}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      <div className="relative flex h-full w-full items-center justify-center px-10 py-10 lg:px-12 lg:py-12">
        <section
          className="absolute inset-0 z-40 cursor-pointer bg-eerie_black opacity-95 transition-all duration-300 ease-in-out hover:bg-strange_black"
          onClick={toggle}
        ></section>
        <section
          className={`relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 border-arsenic bg-eerie_black ${
            visible ? "animate-fade-up animate-ease-in-out" : ""
          } `}
        >
          <HeaderBar
            deleteToggle={toggle}
            title={menuTitle}
            cleanToggle={clearAllDishes}
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
