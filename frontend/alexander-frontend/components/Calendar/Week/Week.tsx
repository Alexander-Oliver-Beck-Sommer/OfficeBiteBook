import DayCell from "@/components/Calendar/Week/child-components/DayCell";
import SettingsCell from "@/components/Calendar/Week/child-components/SettingsCell";
import HourCell from "@/components/Calendar/Week/child-components/HourCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import CardButton from "@/components/Buttons/CardButton";
import useCalendar from "@/hooks/useCalendar";
import useCalendarSystem from "@/hooks/useCalendar/useCalendarSystem";

type WeekProps = {
  userId?: string;
  days?: string[];
  type?: boolean;
  hours?: string[];
  weekNumber?: number;
};

const Week = ({
  userId = "",
  days = [],
  type = true,
  hours = [],
  weekNumber = 0,
}: WeekProps) => {
  const {
    updateDish,
    createDish,
    uploadMenu,
    modalVisibility,
    closeModal,
    createMenu,
    menus,
    setMenus,
    fetchedMenus,
    dishes,
    fetchedDishes,
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
    cardButtonPosition,
    cardButtonHeight,
  } = useCalendarSystem(userId);

  return (
    <>
      <ul className="flex">
        <li className="w-sidebar_width bg-dark-100">
          <ul className="flex flex-col">
            <li className="flex flex-col">
              <section className="h-[70px]"></section>
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
          const isCurrentDay = todaysDate === dayDate;
          const date = day.date.split("-")[2];
          const cardButtons = fetchedMenus.filter((menu) =>
            menu.menu_date.startsWith(day.date),
          );
          return (
            <li
              key={`${day.name}-${day.date}`}
              className="flex-1 border-r border-r-dark-500 last:border-r-0"
            >
              <DayCell date={date} day={day.name} currentDay={isCurrentDay} />
              <SettingsCell />
              <ul className="relative flex flex-col bg-dark-400">
                <li className="relative flex flex-col  bg-dark-400">
                  {hours.map((hour) => (
                    <HourCell
                      key={`${day.name}-${hour.fullHour}`}
                      date={day.date}
                      fullHour={hour.fullHour}
                      fullHourToggle={() => createMenu(hour.fullHour, day.date)}
                      halfHour={hour.halfHour}
                      halfHourToggle={() => createMenu(hour.halfHour, day.date)}
                    />
                  ))}
                  {cardButtons.map((cardButton) => (
                    <CardButton
                      key={`cardButton-${cardButton.menu_id}`}
                      title={cardButton.menu_title}
                      location={cardButton.menu_location}
                      dishesAmount={cardButton.menu_dishes_amount}
                      toggle={() => cardButtonToggle(cardButton)}
                      className={{
                        top: `${cardButtonPosition(
                          cardButton.menu_start_time,
                        )}px`,
                        height: `${cardButtonHeight(
                          cardButton.menu_start_time,
                          cardButton.menu_end_time,
                        )}px`,
                      }}
                    />
                  ))}
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
      <MenuModal
        modalVisibility={modalVisibility}
        closeToggle={closeModal}
        uploadToggle={uploadMenu}
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
        dishes={dishes}
        createDishToggle={createDish}
        updateDishToggle={updateDish}
      />
    </>
  );
};

export default Week;
