import DayCell from "@/components/Calendar/Week/child-components/DayCell";
import SettingsCell from "@/components/Calendar/Week/child-components/SettingsCell";
import HourCell from "@/components/Calendar/Week/child-components/HourCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import CardButton from "@/components/Buttons/CardButton";
import useCalendar from "@/hooks/useCalendar";

type WeekProps = {
  days?: string[];
  type?: boolean;
  hours?: string[];
  weekNumber?: number;
};

const Week = ({
  user = null,
  days = [],
  type = true,
  hours = [],
  weekNumber = 0,
}: WeekProps) => {
  const {
    menus,
    dishes,
    title,
    changeTitle,
    isTitleValid,
    location,
    changeLocation,
    isLocationValid,
    date,
    changeDate,
    isDateValid,
    startTime,
    changeStartTime,
    isStartTimeValid,
    endTime,
    changeEndTime,
    isEndTimeValid,
    visibility,
    createToggle,
    cancelToggle,
    deleteToggle,
    isDeleteDisabled,
    dishCreate,
    dishUpdate,
    dishesErase,
    dishesEraseDisabled,
    deleteDish,
    dayCellHighlight,
    hourCellToggle,
    cardButtonToggle,
    cardButtonPosition,
    cardButtonHeight,
  } = useCalendar(user, weekNumber);

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
          const cardButtons = menus.filter((menu) =>
            menu.menu_date.startsWith(day.date),
          );
          return (
            <li
              key={`${day.name}-${day.date}`}
              className="flex-1 border-r border-r-dark-500"
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
                      fullHourToggle={() =>
                        hourCellToggle(hour.fullHour, day.date)
                      }
                      halfHour={hour.halfHour}
                      halfHourToggle={() =>
                        hourCellToggle(hour.halfHour, day.date)
                      }
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
        title={title}
        changeTitle={changeTitle}
        isTitleValid={isTitleValid}
        location={location}
        changeLocation={changeLocation}
        isLocationValid={isLocationValid}
        date={date}
        changeDate={changeDate}
        isDateValid={isDateValid}
        startTime={startTime}
        changeStartTime={changeStartTime}
        isStartTimeValid={isStartTimeValid}
        endTime={endTime}
        changeEndTime={changeEndTime}
        isEndTimeValid={isEndTimeValid}
        visibility={visibility}
        cancelToggle={cancelToggle}
        createToggle={createToggle}
        deleteToggle={deleteToggle}
        isDeleteDisabled={isDeleteDisabled}
        createDish={dishCreate}
        updateDish={dishUpdate}
        eraseDishes={dishesErase}
        isEraseDishesDisabled={dishesEraseDisabled}
        deleteDish={deleteDish}
        dishes={dishes}
      />
    </>
  );
};

export default Week;
