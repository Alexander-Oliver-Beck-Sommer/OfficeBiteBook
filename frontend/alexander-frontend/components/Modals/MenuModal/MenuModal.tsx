import { supabase } from "@/components/Supabase/supabaseClient";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuOptions from "@/components/Modals/MenuModal/MenuOptions/MenuOptions";
import LocationSettings from "@/components/Modals/MenuModal/LocationSettings/LocationSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import CreateImport from "@/components/Modals/MenuModal/CreateImport/CreateImport";
import CancelCreate from "@/components/Modals/MenuModal/CancelCreate/CancelCreate";
import useMenuModal from "@/hooks/useMenuModal";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
          className="hover:bg-strange_black absolute inset-0 z-40 cursor-pointer bg-eerie_black opacity-95 transition-all duration-300 ease-in-out"
          onClick={toggle}
        ></section>
        <section className="relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 border-arsenic bg-eerie_black">
          <header className="flex items-center justify-between bg-raisin_black px-6 py-4">
            <HeaderBar
              deleteToggle={toggle}
              title={menuTitle}
              cleanToggle={clearAllDishes}
            />
          </header>
          <section className="grid-cols-30X70 grid">
            <ul className="flex flex-col gap-5 border-y-2 border-eerie_black bg-raisin_black px-6 py-4">
              <LocationSettings
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
            </ul>
            <div className="pattern relative overflow-auto">
              <ul className="absolute inset-0">
                {dishes.map((dish) => (
                  <Dish
                    key={dish.id}
                    dishCount={dishes.indexOf(dish) + 1}
                    deleteToggle={() => deleteDish(dish.id)}
                  />
                ))}
              </ul>
            </div>
          </section>
          <footer className="flex items-center justify-between bg-raisin_black px-6 py-4">
            <div className="flex gap-5">
              <CreateImport createDish={createDish} />
            </div>
            <div className="flex gap-5">
              <CancelCreate cancel={cancelMenu} accept={acceptMenu} />
            </div>
          </footer>
        </section>
      </div>
    </section>
  );
};

export default MenuModal;
