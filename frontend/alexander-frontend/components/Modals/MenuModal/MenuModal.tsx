import { useEffect, useRef } from "react";
import TitleClose from "@/components/Modals/MenuModal/TitleClose/TitleClose";
import MenuOptions from "@/components/Modals/MenuModal/MenuOptions/MenuOptions";
import LocationSettings from "@/components/Modals/MenuModal/LocationSettings/LocationSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import CreateImport from "@/components/Modals/MenuModal/CreateImport/CreateImport";
import CancelCreate from "@/components/Modals/MenuModal/CancelCreate/CancelCreate";

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

  useEffect(() => {
    if (!visible && scrollToTop.current) {
      scrollToTop.current.scrollTop = 0;
    }
  }, [visible]);

  const ignoreParentClick = (event) => {
    event.stopPropagation();
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
        className="flex max-h-menu w-full max-w-menu_width flex-col gap-20 overflow-y-auto overflow-x-hidden rounded border-2 border-arsenic bg-raisin_black px-12 py-12"
      >
        <li className="flex flex-col gap-6">
          <TitleClose closeMenu={toggle} />
          <MenuOptions
            selectTemplate={selectTemplate}
            saveTemplate={saveTemplate}
            selectMenu={selectMenu}
            saveMenu={saveMenu}
            deleteMenu={deleteMenu}
          />
          <LocationSettings
            location={location}
            date={date}
            startTime={startTime}
            endTime={endTime}
          />
        </li>
        <Dish dishCount={1} />
        <CreateImport createDish={createDish} importDish={importDish} />
        <CancelCreate cancelMenu={toggle} acceptMenu={acceptMenu} />
      </ul>
    </section>
  );
};

export default MenuModal;
