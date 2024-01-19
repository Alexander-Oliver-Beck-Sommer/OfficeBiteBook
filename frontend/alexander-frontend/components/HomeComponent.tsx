"use client";
import { useState } from "react";
import useHome from "@/hooks/useHome";
import QuestionIcon from "./Icons/QuestionIcon";
import ActionButton from "./Buttons/ActionButton";
import ToggleInput from "./Inputs/ToggleInput";
import ImageIcon from "./Icons/ImageIcon";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const { menusAndDishes, weekNumber } = useHome(userId, userEmail);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const handleMenuSelect = (menuId) => {
    setSelectedMenuId(selectedMenuId === menuId ? null : menuId); // Toggle selected state
  };

  return (
    <section className="full-height flex animate-fade-up items-stretch justify-center px-4 py-8 animate-ease-in-out md:px-12">
      <section className="flex w-full max-w-3xl flex-col gap-6">
        <div className="border-b-2 border-b-apple px-1 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-end gap-1">
              <h4 className="font-light text-cool_grey">Presenting:</h4>
              <h3>WEEK {weekNumber}</h3>
            </div>
            <button
              className="fill-apple"
              title="Open and learn more"
              aria-label="Open and learn more"
            >
              <QuestionIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {menusAndDishes.map((menu) => (
            <li
              key={menu.menu_id}
              className="animate-fade-down overflow-hidden rounded border border-arsenic bg-dark_charcoal shadow-sm animate-ease-in-out"
            >
              <header className="grid grid-cols-autoX1 gap-4 bg-eerie_black px-3 py-3">
                <div className="flex h-12 w-6 items-center justify-center">
                  <ToggleInput className="-rotate-90" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <h4>{menu.menu_title}</h4>
                    <h6 className="text-cool_grey">{menu.menu_date}</h6>
                  </div>
                  <ActionButton
                    variant="icon-small"
                    icon="downArrow"
                    toggle={() => handleMenuSelect(menu.menu_id)}
                  />
                </div>
              </header>
              <section
                className={`grid bg-raisin_black transition-all duration-300 ease-in-out ${
                  selectedMenuId === menu.menu_id
                    ? "visible grid-rows-[1fr] opacity-100"
                    : "invisible grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul>
                    {menu.dishes.map((dish) => (
                      <li
                        key={dish.dish_id}
                        className="flex items-center justify-between p-3 even:bg-strange_black"
                      >
                        <div className="grid-cols-auto1Xauto grid w-full gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded border border-arsenic bg-eerie_black">
                            <ImageIcon className="h-6 w-6 fill-arsenic" />
                          </div>
                          <div className="flex w-full items-center overflow-hidden">
                            <p className="truncate">{dish.dish_title}</p>
                          </div>
                          <div className="flex w-full items-center overflow-hidden">
                            <p className="truncate">{dish.dish_subtitle}</p>
                          </div>
                          <ActionButton
                            variant="icon-border-small"
                            icon="info"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default HomeComponent;
