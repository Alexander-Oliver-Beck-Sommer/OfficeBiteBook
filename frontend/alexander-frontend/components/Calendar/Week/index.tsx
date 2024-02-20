import Hour from "./Hour";
import MenuEditor from "../MenuEditor";
import MenuCard from "./CardButton";
import useMenuCreator from "@/hooks/useMenuCreator";
import Day from "./Day";

type WeekProps = {
  userId?: string;
  days?: string[];
  type?: boolean;
  hours?: string[];
  lockDay?: (date: string, locked: boolean) => void;
  togglePublished?: () => void;
};

const Week = ({
  userId = "",
  days = [],
  type = true,
  hours = [],
  lockDay = () => {},
  togglePublished = () => {},
}: WeekProps) => {
  const {
    createMenu,
    createDish,
    editMenu,
    saveMenu,
    closeMenu,
    visibility,
    loading,
    menus,
    dishes,
    title,
    setTitle,
    location,
    setLocation,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    calculateCardButtonPosition,
    calculateCardButtonHeight,
    deleteMenu,
    deleteDish,
  } = useMenuCreator(userId);

  return (
    <>
      <ul className="flex">
        <li className="w-sidebar_width bg-dark-100">
          <ul className="flex flex-col">
            <li className="flex flex-col">
              <section className="h-12"></section>
              <section className="h-12"></section>
            </li>
            {hours.map((hour) => (
              <li
                key={`sidebar-${hour.fullHour}`}
                className="flex h-20 w-full items-start justify-center"
              >
                <h5>{hour.fullHour}</h5>
              </li>
            ))}
          </ul>
        </li>
        {days.map((day) => {
          const getTodaysDate = new Date();
          const todaysDate = getTodaysDate.toISOString().split("T")[0];
          const dayDate = day.date;
          const currentDate = todaysDate === dayDate;
          const date = day.date.split("-")[2];
          const menuCards = menus.filter((menu) =>
            menu.date.startsWith(day.date),
          );
          return (
            <li
              key={`${day.name}-${day.date}`}
              className={`flex-1 border-r border-dark-500 transition-all duration-300 ease-in-out last:border-r-0 ${
                day.published ? "bg-dark-300" : "bg-dark-400"
              }`}
            >
              <Day
                date={date}
                day={day.name}
                currentDate={currentDate}
                lockToggle={() => lockDay(day.date, day.locked)}
                locked={day.locked}
                publishToggle={() => togglePublished(day.date, day.published)}
                published={day.published}
              />
              <div className="relative flex flex-col">
                {hours.map((hour) => (
                  <Hour
                    key={`${day.name}-${hour.fullHour}`}
                    locked={day.locked}
                    date={day.date}
                    halfHour={hour.halfHour}
                    halfHourToggle={() =>
                      createMenu(day.date, hour.halfHour, day.locked)
                    }
                    fullHour={hour.fullHour}
                    fullHourToggle={() =>
                      createMenu(day.date, hour.fullHour, day.locked)
                    }
                  />
                ))}
                {menuCards.map((menuCard) => (
                  <MenuCard
                    key={`menu-${menuCard.menu_id}`}
                    title={menuCard.title}
                    location={menuCard.location}
                    accepted={menuCard.accepted_participants?.length}
                    declined={menuCard.declined_participants?.length}
                    toggle={() => editMenu(menuCard)}
                    disabled={day.published}
                    locked={day.locked}
                    positioning={{
                      top: `${calculateCardButtonPosition(
                        menuCard.start_time,
                      )}px`,
                      height: `${calculateCardButtonHeight(
                        menuCard.start_time,
                        menuCard.end_time,
                      )}px`,
                    }}
                  />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <MenuEditor
        removeDishFromMenu={deleteDish}
        removeMenu={deleteMenu}
        visibility={visibility}
        loading={loading}
        title={title}
        setTitle={setTitle}
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        closeToggle={closeMenu}
        saveToggle={saveMenu}
        dishes={dishes}
        addNewDishToMenu={createDish}
      />
    </>
  );
};

export default Week;
