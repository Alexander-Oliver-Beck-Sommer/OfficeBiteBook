import React, { useState } from "react";
import MenuItem from "./MenuItem";
import ListItem from "./ListItem";
import RestaurantIcon from "@/components/Icons/RestaurantIcon";
import ImageIcon from "@/components/Icons/ImageIcon";

type DesktopVersionProps = {
  menu?: Array<string>;
};

const DesktopVersion = ({ menu = [] }: DesktopVersionProps) => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menuItem: any) => {
    setSelectedMenu(menuItem);
    if (menuItem.menu_id === selectedMenu?.menu_id) {
      setSelectedMenu(null);
    }
  };

  return (
    <>
      <section className="hidden justify-center lg:flex">
        <div className="border-dark-500 relative flex w-full max-w-screen-xl flex-col gap-4 overflow-hidden rounded border-2 bg-dark-100 px-6 py-8">
          <MenuItem />
          <div className="bg-primary h-[2px] rounded-full"></div>
          <div className="grid grid-rows-9 gap-4">
            {menu.map((menu) => (
              <ListItem
                menu={menu}
                dishesToggle={() => handleMenuClick(menu)}
              />
            ))}
          </div>
          <section
            className={`pattern absolute bottom-0 right-0 top-0 bg-dark-100 px-6 py-8 transition-all duration-300 ease-in-out ${
              selectedMenu
                ? "w-full overflow-auto opacity-100"
                : "w-0 overflow-hidden opacity-0"
            }`}
          >
            {selectedMenu && (
              <section className="flex flex-col gap-4">
                <div className="flex h-8 justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="animate-fade font-semibold animate-ease-in-out">
                      {selectedMenu.menu_title}
                    </h3>
                    <h4 className="text-grey animate-fade animate-ease-in-out">
                      {selectedMenu.menu_date}
                    </h4>
                  </div>
                  <div>
                    <button onClick={() => handleMenuClick(selectedMenu)}>
                      <p>Close</p>
                    </button>
                  </div>
                </div>
                <div className="bg-primary h-[2px] rounded-full"></div>
                <ul className="grid grid-cols-2 gap-8 pt-4">
                  {selectedMenu.dishes.map((dish, index) => (
                    <li className="bg-dark-300 border-dark-500 animate-fade rounded border-2 animate-ease-in-out">
                      <header className="fill-primary grid grid-cols-auto1Xauto items-center gap-3 bg-dark-100 p-4">
                        <h3 className="font-semibold">#{index + 1}</h3>
                        <p className="text-grey truncate">{dish.dish_title}</p>
                        <button
                          className="border-dark-500 flex h-16 w-16 items-center justify-center rounded border-2 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${dish.dish_thumbnail})`,
                          }}
                        >
                          {!dish.dish_thumbnail && (
                            <ImageIcon className="fill-dark-500 h-8 w-8" />
                          )}
                        </button>
                      </header>
                      <section className="flex flex-col gap-4 p-4 pb-8">
                        <div className="flex items-center justify-between gap-1">
                          <h4>Subtitle</h4>
                          <p className="text-grey">{dish.dish_subtitle}</p>
                        </div>
                        <div className="bg-dark-400 h-[2px] rounded-full"></div>
                        <div className="flex flex-col gap-1">
                          <h4>Description</h4>
                          <p className="text-grey">{dish.dish_description}</p>
                        </div>
                      </section>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default DesktopVersion;
