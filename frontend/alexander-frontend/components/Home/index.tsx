"use client";
import useHome from "@/hooks/useHome";
import Header from "./Header";
import CheckboxInput from "../Inputs/CheckboxInput";
import Menu from "./Menu";
import Modal from "./Modal";
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
            <li className="-mb-10 flex items-center gap-4">
              <CheckboxInput />
              <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-5 md:gap-8">
                <h4>TITLE</h4>
                <h4 className="hidden sm:block">LOCATION</h4>
                <h4 className="hidden md:block">HOURS</h4>
                <h4 className="hidden md:block">DISHES</h4>
              </div>
            </li>
            {menus && menus.length > 0 ? (
              Object.entries(organizedMenus).map(
                ([dayName, { menus, date }]) =>
                  menus.length > 0 && (
                    <li key={dayName} className="group flex flex-col gap-3">
                      <h6 className="text-right font-semibold uppercase text-grey">
                        {dayName} | {date}
                      </h6>
                      <ul className="flex w-full flex-col gap-5">
                        {menus.map((menu) => (
                          <Menu
                            key={menu.menu_id}
                            title={menu.title}
                            location={menu.location}
                            startTime={menu.start_time}
                            endTime={menu.end_time}
                            dishesAmount={menu.dishes.length}
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
              <li className="flex flex-1 items-center justify-center uppercase text-grey">
                <h3>no menus found</h3>
              </li>
            )}
          </ul>
        </section>
      </section>
      <Modal
        visibility={modalStatus}
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
