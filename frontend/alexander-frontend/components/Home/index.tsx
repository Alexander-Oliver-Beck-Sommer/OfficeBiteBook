"use client";
import { useState } from "react";
import useHome from "@/hooks/useHome";
import CheckboxInput from "../Inputs/CheckboxInput";
import IconButton from "../Buttons/IconButton";
import UnderlineButton from "../Buttons/UnderlineButton";
import Modal from "./Modal";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const {
    menus,
    organizedMenus,
    loading,
    decreaseWeek,
    increaseWeek,
    resetWeek,
    weekNumber,
  } = useHome(userId, userEmail);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMenuData, setCurrentMenuData] = useState(null);

  const handleMenuClick = (menu) => {
    setCurrentMenuData(menu);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentMenuData(null);
  };

  return (
    <>
      <section className="fill-body pattern flex flex-col">
        <section className="flex justify-center border-b border-dark-400 bg-dark-200 p-4 md:px-12 md:py-6">
          <div className="flex w-full max-w-screen-xl items-center justify-between">
            <div>
              <h2>WEEK {weekNumber}</h2>
            </div>
            <div className="flex gap-4">
              <IconButton
                size="small"
                toggle={decreaseWeek}
                icon="arrow-left"
                label="Rewind one week"
                title="Rewind one week"
              />
              <IconButton
                size="small"
                toggle={increaseWeek}
                icon="arrow-right"
                label="Fast forward one week"
                title="Fast forward one week"
              />
              <IconButton
                size="small"
                toggle={resetWeek}
                icon="reset"
                label="Reset week"
                title="Reset week"
              />
            </div>
          </div>
        </section>
        <section className="flex w-full justify-center px-4 pt-6 md:px-12">
          <div className="flex w-full max-w-screen-xl gap-4">
            <li className="flex w-full gap-4">
              <CheckboxInput />
            </li>
          </div>
        </section>
        <section className=" flex flex-1 justify-center px-4 pb-4 md:px-12">
          <ul className="flex w-full max-w-screen-xl flex-col gap-14">
            {menus.length > 0 ? (
              Object.entries(organizedMenus).map(
                ([dayName, { menus, date }]) =>
                  menus.length > 0 && (
                    <li
                      key={dayName}
                      className="group flex flex-col items-end gap-4"
                    >
                      <h5 className="font-semibold uppercase text-grey">
                        {dayName} | {date}
                      </h5>
                      <div className="h-0.5 w-full rounded-full bg-dark-400"></div>
                      <ul className="flex w-full max-w-screen-xl flex-col gap-8">
                        {menus.map((menu) => (
                          <li key={menu.menu_id} className="flex gap-4">
                            <CheckboxInput />
                            <div className="grid flex-1 grid-cols-1Xauto items-center gap-4 text-grey sm:grid-cols-3 md:grid-cols-5 md:gap-8">
                              <p className="truncate">{menu.menu_title}</p>
                              <p className="hidden truncate sm:block">
                                {menu.menu_location}
                              </p>
                              <p className="hidden truncate md:block">
                                {menu.menu_start_time} - {menu.menu_end_time}
                              </p>
                              <p className="hidden truncate md:block">
                                {menu.menu_dishes_amount} Dishes
                              </p>
                              <div className="flex justify-end">
                                <UnderlineButton
                                  toggle={() => handleMenuClick(menu)}
                                  icon="arrow-right"
                                  label="Details"
                                  direction="right"
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
              )
            ) : (
              <li className="flex flex-1 flex-col items-center justify-center gap-2">
                <h3 className="uppercase text-grey">0 menus found</h3>
              </li>
            )}
          </ul>
        </section>
      </section>
      <Modal
        isVisible={isModalVisible}
        menu={currentMenuData}
        onClose={handleModalClose}
      />
    </>
  );
};

export default HomeComponent;
