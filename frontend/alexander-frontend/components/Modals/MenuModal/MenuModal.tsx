import { useEffect, useRef, useState } from "react";
import TitleClose from "@/components/Modals/MenuModal/TitleClose/TitleClose";
import MenuOptions from "@/components/Modals/MenuModal/MenuOptions/MenuOptions";
import LocationSettings from "@/components/Modals/MenuModal/LocationSettings/LocationSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import CreateImport from "@/components/Modals/MenuModal/CreateImport/CreateImport";
import CancelCreate from "@/components/Modals/MenuModal/CancelCreate/CancelCreate";
import { supabase } from "@/components/Supabase/supabaseClient";

const visibilities = (visible) => {
  return visible ? "opacity-100 visible" : "opacity-0 invisible";
};

type MenuModalProps = {
  visible: boolean;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  toggle: () => void;
  selectTemplate: () => void;
  saveTemplate: () => void;
  selectMenu: () => void;
  saveMenu: () => void;
  deleteMenu: () => void;
  createDish: () => void;
  importDish: () => void;
  acceptMenu: () => void;
};

const MenuModal = ({
  visible = false,
  location,
  date,
  startTime,
  endTime,
  selectTemplate,
  saveTemplate,
  selectMenu,
  saveMenu,
  deleteMenu,
  toggle,
  createDish,
  importDish,
  acceptMenu,
}: MenuModalProps) => {
  const visibleValue = visibilities(visible);
  const scrollToTop = useRef(null);
  const [menuTitle, setMenuTitle] = useState("");
  const [menuLocation, setMenuLocation] = useState("");
  const [menuEndTime, setMenuEndTime] = useState("");
  const [menuDate, setMenuDate] = useState(date);
  const [menuStartTime, setMenuStartTime] = useState(startTime);

  useEffect(() => {
    setMenuDate(date);
    setMenuStartTime(startTime);
    if (!visible && scrollToTop.current) {
      scrollToTop.current.scrollTop = 0;
    }
  }, [visible, date, startTime]);

  const ignoreParentClick = (event) => {
    event.stopPropagation();
  };

  const onTitleChange = (newTitle: string) => {
    setMenuTitle(newTitle);
  };

  const onLocationChange = (newLocation: string) => {
    setMenuLocation(newLocation);
  };

  const onEndTimeChange = (newEndTime: string) => {
    setMenuEndTime(newEndTime);
  };

  const handleAcceptMenu = async () => {
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

      if (error) throw error;
      console.log("Data submitted successfully", data);
    } catch (error) {
      console.error("Error submitting data", error);
    }

    toggle(); // Close the modal after submission
  };

  return (
    <section
      aria-hidden={!visible}
      onClick={toggle}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-all duration-300 ease-in-out ${visibleValue}`}
    >
      <ul
        ref={scrollToTop}
        onClick={ignoreParentClick}
        className="flex max-h-[80%] w-11/12 flex-col gap-20 overflow-y-auto overflow-x-hidden rounded border-2 border-arsenic bg-raisin_black px-12 py-12 lg:w-full lg:max-w-7xl"
      >
        <li className="flex flex-col gap-6">
          <TitleClose closeMenu={toggle} onTitleChange={onTitleChange} />
          <MenuOptions
            selectTemplate={selectTemplate}
            saveTemplate={saveTemplate}
            selectMenu={selectMenu}
            saveMenu={saveMenu}
            deleteMenu={deleteMenu}
          />
          <LocationSettings
            location={location}
            onLocationChange={onLocationChange}
            date={date}
            startTime={startTime}
            endTime={endTime}
            onEndTimeChange={onEndTimeChange}
          />
        </li>
        <Dish dishCount={1} />
        <CreateImport createDish={createDish} importDish={importDish} />
        <CancelCreate cancelMenu={toggle} acceptMenu={handleAcceptMenu} />
      </ul>
    </section>
  );
};

export default MenuModal;
