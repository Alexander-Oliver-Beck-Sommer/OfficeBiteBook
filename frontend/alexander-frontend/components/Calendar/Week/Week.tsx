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
    menuModalTitle,
    menuModalTitleChange,
    menuModalTitleValid,
    menuModalLocation,
    menuModalLocationChange,
    menuModalLocationValid,
    menuModalDate,
    menuModalDateChange,
    menuModalDateValid,
    menuModalStartTime,
    menuModalStartTimeChange,
    menuModalStartTimeValid,
    menuModalEndTime,
    menuModalEndTimeChange,
    menuModalEndTimeValid,
    menuModalVisibility,
    menuModalCreate,
    menuModalCancel,
    menuModalDelete,
    menuModalDeleteDisabled,
    dishCreate,
    dishUpdate,
    dishesErase,
    dishesEraseDisabled,
    dishDelete,
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
          const dayCellDate = day.date.split("-")[2];
          const cardButtons = menus.filter((menu) =>
            menu.menu_date.startsWith(day.date),
          );
          return (
            <li
              key={`${day.name}-${day.date}`}
              className="flex-1 border-r border-r-dark-500"
            >
              <DayCell
                dayCellDate={dayCellDate}
                dayCellDay={day.name}
                dayCellCurrent={isCurrentDay}
              />
              <SettingsCell />
              <ul className="relative flex flex-col bg-dark-400">
                <li className="relative flex flex-col  bg-dark-400">
                  {hours.map((hour) => (
                    <HourCell
                      key={`${day.name}-${hour.fullHour}`}
                      hourCellDate={day.date}
                      hourCellFullValue={hour.fullHour}
                      hourCellFullToggle={() =>
                        hourCellToggle(hour.fullHour, day.date)
                      }
                      hourCellHalfValue={hour.halfHour}
                      hourCellHalfToggle={() =>
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
        menuModalTitle={menuModalTitle}
        menuModalTitleChange={menuModalTitleChange}
        menuModalTitleValid={menuModalTitleValid}
        menuModalLocation={menuModalLocation}
        menuModalLocationChange={menuModalLocationChange}
        menuModalLocationValid={menuModalLocationValid}
        menuModalDate={menuModalDate}
        menuModalDateChange={menuModalDateChange}
        menuModalDateValid={menuModalDateValid}
        menuModalStartTime={menuModalStartTime}
        menuModalStartTimeChange={menuModalStartTimeChange}
        menuModalStartTimeValid={menuModalStartTimeValid}
        menuModalEndTime={menuModalEndTime}
        menuModalEndTimeChange={menuModalEndTimeChange}
        menuModalEndTimeValid={menuModalEndTimeValid}
        menuModalVisibility={menuModalVisibility}
        menuModalCancel={menuModalCancel}
        menuModalCreate={menuModalCreate}
        menuModalDelete={menuModalDelete}
        menuModalDeleteDisabled={menuModalDeleteDisabled}
        menuModalDishCreate={dishCreate}
        menuModalDishUpdate={dishUpdate}
        menuModalEraseDishes={dishesErase}
        menuModalEraseDishesDisabled={dishesEraseDisabled}
        menuModalDishDelete={dishDelete}
        menuModalDishes={dishes}
      />
    </>
  );
};

export default Week;
