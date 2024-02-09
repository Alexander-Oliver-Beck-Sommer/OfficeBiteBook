"use client";
import useHome from "@/hooks/useHome";
import CheckboxInput from "../Inputs/CheckboxInput";
import Header from "./Header";
import Menu from "./Menu";
import Modal from "./Modal";
import IconButton from "../IconButton";
import Guest from "./Guest";

type HomeComponentProps = {
  userId?: string;
};

const HomeComponent = ({ userId = "" }: HomeComponentProps) => {
  const {
    menus,
    organizedMenus,
    decreaseWeek,
    increaseWeek,
    resetWeek,
    weekNumber,
    handleModalOpen,
    handleModalClose,
    modalStatus,
    modalData,
    checkAllMenus,
    checkMenu,
    handleGuest,
    guestOpen,
  } = useHome(userId);

  return (
    <>
      <section className="fill-body pattern flex flex-col">
        <Header
          weekNumber={weekNumber}
          decreaseWeek={decreaseWeek}
          increaseWeek={increaseWeek}
          resetWeek={resetWeek}
          handleGuest={handleGuest}
        />

        <section className="flex flex-1 justify-center px-4 py-8 md:px-12">
          <ul className="flex w-full max-w-screen-xl flex-col gap-10">
            <li className="-mb-10 flex w-full max-w-screen-xl items-center gap-4">
              <div className="flex flex-col gap-4">
                <CheckboxInput onChange={checkAllMenus} />
              </div>
              <div className="grid w-full grid-cols-1Xauto items-center gap-4 border-dark-500 group-first/menu:border-t-2 sm:grid-cols-3 md:grid-cols-5 md:gap-8">
                <h4 className="truncate">TITLE</h4>
                <h4 className="hidden truncate sm:block">LOCATION</h4>
                <h4 className="hidden truncate md:block">HOURS</h4>
                <h4 className="hidden truncate md:block">DISHES</h4>
              </div>
            </li>
            {menus.length > 0 ? (
              Object.entries(organizedMenus).map(
                ([dayName, { menus, date }]) =>
                  menus.length > 0 && (
                    <li key={dayName} className="group flex flex-col gap-3">
                      <h6 className="text-right font-semibold uppercase text-grey">
                        {dayName} | {date}
                      </h6>
                      <ul className="flex w-full max-w-screen-xl flex-col gap-5">
                        {menus.map((menu) => (
                          <Menu
                            key={menu.menu_id}
                            title={menu.menu_title}
                            location={menu.menu_location}
                            startTime={menu.menu_start_time}
                            endTime={menu.menu_end_time}
                            dishesAmount={menu.menu_dishes_amount}
                            modalToggle={() => handleModalOpen(menu)}
                            checkboxState={menu.menu_checked}
                            checkboxToggle={() =>
                              checkMenu(menu.menu_id, !menu.menu_checked)
                            }
                          />
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
        isVisible={modalStatus}
        menu={modalData}
        onClose={handleModalClose}
      />
      <Guest
        isVisible={guestOpen}
        toggle={handleGuest}
        weekNumber={weekNumber}
        userId={userId}
      />
    </>
  );
};

export default HomeComponent;
