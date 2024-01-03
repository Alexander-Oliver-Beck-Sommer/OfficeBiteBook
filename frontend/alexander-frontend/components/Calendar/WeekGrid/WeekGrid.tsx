import DayCell from "@/components/Calendar/WeekGrid/child-components/DayCell";
import SettingsCell from "@/components/Calendar/WeekGrid/child-components/SettingsCell";
import VisibilityCell from "@/components/Calendar/WeekGrid/child-components/VisibilityCell";
import HourCell from "@/components/Calendar/WeekGrid/child-components/HourCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import CardButton from "@/components/Buttons/CardButton";
import useCalendar from "@/hooks/useCalendar";

type TimeSlot = {
  fullHour: string;
  halfHour: string;
};

type TimeFormat = "24-hour" | "12-hour";

type WeekGridSettingsProps = {
  timeFormat: TimeFormat;
  country: string;
  weekDays: string[];
};

type WeekGridProps = {
  weekGridHours: (timeFormat: TimeFormat) => TimeSlot[];
  weekGridDates: () => dayCellDate[];
  weekGridSettings: WeekGridSettingsProps;
};

const WeekGrid = ({
  weekGridHours,
  weekGridDates,
  weekGridSettings,
}: WeekGridProps) => {
  const {
    menus,
    dishes,
    menuModalTitle,
    menuModalTitleChange,
    menuModalLocation,
    menuModalLocationChange,
    menuModalDate,
    menuModalDateChange,
    menuModalStartTime,
    menuModalStartTimeChange,
    menuModalEndTime,
    menuModalEndTimeChange,
    menuModalVisibility,
    setMenuModalVisibility,
    menuModalCreate,
    menuModalDelete,
    dishCreate,
    dishUpdate,
    dishDelete,
    dayCellHighlight,
    hourCellToggle,
    cardButtonToggle,
    cardButtonPosition,
    cardButtonHeight,
  } = useCalendar();

  const hourCells = weekGridHours(weekGridSettings.timeFormat);
  const weekDates = weekGridDates();

  return (
    <>
      <ul className="grid grid-cols-autoX1">
        <li className="w-20 bg-eerie_black">
          <ul className="flex flex-col">
            <li className="flex flex-col">
              <section className="h-20"></section>
              <section className="h-12"></section>
              <section className="h-14"></section>
            </li>
            {hourCells.map((sidebarCell, sidebarCellIndex) => (
              <li
                key={`sidebar-slots-${sidebarCellIndex}`}
                className="flex h-24 w-full items-start justify-center"
              >
                <p>{sidebarCell.fullHour}</p>
              </li>
            ))}
          </ul>
        </li>
        <li className="bg-arsenic">
          <ul className="grid grid-cols-7">
            {weekDates.map((dayCellDate, dayCellDateIndex) => {
              const dayCellDay = weekGridSettings.weekDays[dayCellDateIndex];
              const dayCellCurrent = dayCellHighlight(dayCellDate);
              const hourCellDate = dayCellDate.toISOString().split("T")[0];
              const cardButtons = menus.filter((menu) =>
                menu.menu_date.startsWith(hourCellDate),
              );

              return (
                <li
                  key={`day-${dayCellDay}`}
                  className="overflow-hidden border-r border-r-arsenic"
                >
                  <ul className="flex flex-col">
                    <li className="flex w-full flex-row flex-wrap">
                      <DayCell
                        dayCellDay={dayCellDay}
                        dayCellDate={dayCellDate.getDate()}
                        dayCellCurrent={dayCellCurrent}
                      />
                      <SettingsCell />
                      <VisibilityCell />
                    </li>
                    <li className="relative flex flex-col border-t border-t-arsenic bg-dark_charcoal">
                      {hourCells.map((hourCell, hourCellIndex) => (
                        <HourCell
                          key={`${dayCellDay}-hourCell-${hourCellIndex}`}
                          hourCellDate={hourCellDate}
                          hourCellFullValue={hourCell.fullHour}
                          hourCellFullLabel={`Click and create a new menu at ${hourCell.fullHour}`}
                          hourCellFullToggle={() =>
                            hourCellToggle(hourCell.fullHour, hourCellDate)
                          }
                          hourCellHalfValue={hourCell.halfHour}
                          hourCellHalfLabel={`Click and create a new menu at ${hourCell.halfHour}`}
                          hourCellHalfToggle={() =>
                            hourCellToggle(hourCell.halfHour, hourCellDate)
                          }
                        />
                      ))}
                      {cardButtons.map((cardButton, cardButtonIndex) => (
                        <CardButton
                          key={`cardButton-${cardButtonIndex}`}
                          cardButtonTitle={cardButton.menu_title}
                          cardButtonLocation={cardButton.menu_location}
                          cardButtonStartTime={cardButton.menu_start_time}
                          cardButtonEndTime={cardButton.menu_end_time}
                          cardButtonLabel={`Click to open the menu for ${cardButton.menu_title}`}
                          cardButtonToggleMenu={() =>
                            cardButtonToggle(cardButton)
                          }
                          cardButtonStyle={{
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
        </li>
      </ul>
      <MenuModal
        menuModalTitle={menuModalTitle}
        menuModalTitleChange={menuModalTitleChange}
        menuModalLocation={menuModalLocation}
        menuModalLocationChange={menuModalLocationChange}
        menuModalDate={menuModalDate}
        menuModalDateChange={menuModalDateChange}
        menuModalStartTime={menuModalStartTime}
        menuModalStartTimeChange={menuModalStartTimeChange}
        menuModalEndTime={menuModalEndTime}
        menuModalEndTimeChange={menuModalEndTimeChange}
        menuModalVisibility={menuModalVisibility}
        menuModalClose={() => setMenuModalVisibility(false)}
        menuModalCreate={menuModalCreate}
        menuModalDelete={menuModalDelete}
        menuModalDishCreate={dishCreate}
        menuModalDishUpdate={dishUpdate}
        menuModalDishDelete={dishDelete}
        menuModalDishes={dishes}
      />
    </>
  );
};

export default WeekGrid;
