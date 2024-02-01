import { useState } from "react";
import CheckboxInput from "@/components/Inputs/CheckboxInput";
import ActionButton from "@/components/Buttons/ActionButton";
import Menu from "@/components/Home/DesktopVersion/child-components/Menu";
import Dish from "@/components/Home/DesktopVersion/child-components/Dish";

type MenuListProps = {
  menus?: Array<any>;
  checkAll?: () => void;
  checkIndividual?: () => void;
};

const MenuList = ({
  menus = [],
  checkAll = () => {},
  checkIndividual = () => {},
}: MenuListProps) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const openModal = (menu) => {
    setSelectedMenu(menu);
    setVisibility(!visibility);
    if (selectedMenu === menu) {
      setSelectedMenu(null);
      setVisibility(!visibility);
    }
  };

  const closeModal = () => {
    setSelectedMenu(null);
    setVisibility(!visibility);
  };

  return (
    <>
      <ul className="flex flex-col items-center gap-6 p-4 md:p-12">
        <li className=" w-full max-w-screen-xl animate-fade-up animate-ease-in-out">
          <div className="flex items-center gap-6 text-grey">
            <CheckboxInput
              onChange={checkAll}
              label="Participate on all menus"
            />
            <h4>Select all</h4>
          </div>
        </li>
        {menus.map((menu, index) => (
          <Menu
            key={`menu-${index}`}
            checkToggle={() => checkIndividual(menu.menu_id)}
            checked={menu.checked}
            title={menu.menu_title}
            location={menu.menu_location}
            date={menu.menu_date}
            startTime={menu.menu_start_time}
            endTime={menu.menu_end_time}
            dishesAmount={menu.menu_dishes_amount}
            modalToggle={() => openModal(menu)}
          />
        ))}
      </ul>
      <section
        aria-hidden={!visibility}
        className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out animate-duration-300 ${
          visibility ? "visible opacity-100" : "invisible opacity-0"
        } `}
      >
        <div className="relative flex h-full w-full items-center justify-center px-10 py-10 lg:px-12 lg:py-12">
          <section
            className="absolute inset-0 z-40 bg-dark-100 opacity-95 transition-all duration-300 ease-in-out hover:bg-dark-200"
            onClick={closeModal}
          ></section>
          <section
            className={`pattern relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-hidden rounded border-2 border-dark-500 animate-ease-in-out ${
              visibility ? "visible animate-fade-up" : "invisible opacity-0"
            } `}
          >
            {selectedMenu && (
              <>
                <header className="flex items-center justify-between bg-dark-300 px-6 py-4">
                  <div className="flex items-end gap-3">
                    <h2>{selectedMenu.menu_title}</h2>
                    <p className="font-normal text-grey">
                      {selectedMenu.menu_location} - {selectedMenu.menu_date}
                    </p>
                  </div>
                  <div>
                    <ActionButton
                      title="Close menu"
                      icon="cancel"
                      variant="icon-border"
                      label="Close menu"
                      toggle={closeModal}
                    />
                  </div>
                </header>
                <ul className="grid auto-rows-max grid-cols-2 gap-6 overflow-y-scroll p-6">
                  {selectedMenu.dishes.map((dish, index) => (
                    <Dish
                      key={`dish-${index}`}
                      dishCount={index + 1}
                      title={dish.dish_title}
                      subtitle={dish.dish_subtitle}
                      description={dish.dish_description}
                      thumbnail={dish.dish_thumbnail_url}
                    />
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default MenuList;
