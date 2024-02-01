import { useState } from "react";
import CheckboxInput from "@/components/Inputs/CheckboxInput";
import ActionButton from "@/components/Buttons/ActionButton";
import Dish from "@/components/Home/MobileVersion/child-components/Dish";
import Menu from "@/components/Home/MobileVersion/child-components/Menu";

type MobileVersionProps = {
  menus?: Array<any>;
  checkAll?: () => void;
  checkIndividual?: () => void;
  guestToggle?: () => void;
  accordionId?: string | null;
  handleAccordion?: (id: string) => void;
};

const MobileVersion = ({
  menus = [],
  checkAll = () => {},
  allChecked = false,
  checkIndividual = () => {},
  checked = false,
  guestToggle = () => {},
  accordionId = null,
  handleAccordion = () => {},
}: MobileVersionProps) => {
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
    <section className="block lg:hidden">
      <ul className="flex flex-col gap-6 px-4 py-6 md:px-12">
        <li className="flex animate-fade-up items-center gap-4 text-grey animate-ease-in-out">
          <CheckboxInput onChange={checkAll} label="Select all" />
          <h4>Select all</h4>
        </li>
        {menus.map((menu, index) => (
          <Menu
            key={`menu-${index}`}
            checkIndividual={checkIndividual}
            checked={menu.checked}
            guestToggle={guestToggle}
            id={menu.menu_id}
            title={menu.menu_title}
            location={menu.menu_location}
            date={menu.menu_date}
            startTime={menu.menu_start_time}
            endTime={menu.menu_end_time}
            dishesAmount={menu.menu_dishes_amount}
            modalToggle={() => openModal(menu)}
            accordionId={accordionId}
            accordionToggle={() => handleAccordion(menu.menu_id)}
          />
        ))}
      </ul>
      <section
        aria-hidden={!visibility}
        className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out animate-duration-300 ${
          visibility ? "visible opacity-100" : "invisible opacity-0"
        } `}
      >
        <div className="relative flex h-full w-full items-center justify-center px-4 py-6 md:p-12">
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
                <header className="flex items-center justify-between bg-dark-300 p-4 md:px-12">
                  <div className="flex flex-col gap-1">
                    <h4>{selectedMenu.menu_title}</h4>
                    <h5 className="font-normal text-grey">
                      {selectedMenu.menu_location}
                    </h5>
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
                <ul className="flex flex-col gap-6 overflow-y-scroll px-4 py-6 md:px-12">
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
    </section>
  );
};

export default MobileVersion;
