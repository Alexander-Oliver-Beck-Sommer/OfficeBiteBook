import DayCell from "@/components/Calendar/WeekGrid/child-components/DayCell";
import SettingsCell from "@/components/Calendar/WeekGrid/child-components/SettingsCell";
import VisibilityCell from "@/components/Calendar/WeekGrid/child-components/VisibilityCell";
import HourCell from "@/components/Calendar/WeekGrid/child-components/HourCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import useWeekGrid from "@/hooks/useWeekGrid"; // This is where the magic happens
import CardButton from "@/components/Buttons/CardButton";

type TimeSlot = {
  fullHour: string;
  halfHour: string;
};

type TimeFormat = "24-hour" | "12-hour";

type Settings = {
  timeFormat: TimeFormat;
  country: string;
  weekDays: string[];
};

type WeekGridProps = {
  generateTimeSlots: (timeFormat: TimeFormat) => TimeSlot[];
  getWeekDates: () => Date[];
  settings: Settings;
};

const WeekGrid = ({
  generateTimeSlots,
  getWeekDates,
  settings,
}: WeekGridProps) => {
  const {
    menus,
    calculateTopPosition,
    calculateHeight,
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    menuTitle,
    menuLocation,
    menuDate,
    menuStartTime,
    menuEndTime,
    openMenuWithDetails,
    isToday,
  } = useWeekGrid();

  const timeSlots = generateTimeSlots(settings.timeFormat);
  const weekDates = getWeekDates();

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
            {timeSlots.map((slot, slotIndex) => (
              <li
                key={`sidebar-slots-${slotIndex}`}
                className="flex h-24 w-full items-start justify-center"
              >
                <p>{slot.fullHour}</p>
              </li>
            ))}
          </ul>
        </li>
        <li className="bg-arsenic">
          <ul className="grid grid-cols-7">
            {weekDates.map((date, index) => {
              const dayName = settings.weekDays[index];
              const isCurrentDay = isToday(date);
              const dateValue = date.toISOString().split("T")[0];
              const dayMenus = menus.filter((menu) =>
                menu.menu_date.startsWith(dateValue),
              );

              return (
                <li
                  key={`week-day-${dayName}`}
                  className="overflow-hidden border-r border-r-arsenic"
                >
                  <ul className="flex flex-col">
                    <li className="flex w-full flex-row flex-wrap">
                      <DayCell
                        day={dayName}
                        date={date.getDate()}
                        isCurrentDay={isCurrentDay}
                      />
                      <SettingsCell />
                      <VisibilityCell />
                    </li>
                    <li className="relative flex flex-col border-t border-t-arsenic bg-dark_charcoal">
                      {timeSlots.map((slot, slotIndex) => (
                        <HourCell
                          key={`${dayName}-hours-${slotIndex}`}
                          hourCellDateValue={dateValue}
                          hourCellFullValue={slot.fullHour}
                          hourCellFullLabel={`Click and create a new menu at ${slot.fullHour}`}
                          hourCellFullToggle={() =>
                            toggleMenu(slot.fullHour, dateValue)
                          }
                          hourCellHalfValue={slot.halfHour}
                          hourCellHalfLabel={`Click and create a new menu at ${slot.halfHour}`}
                          hourCellHalfToggle={() =>
                            toggleMenu(slot.halfHour, dateValue)
                          }
                        />
                      ))}
                      {dayMenus.map((menu, menuIndex) => (
                        <CardButton
                          key={`menu-card-${menuIndex}`}
                          cardButtonTitle={menu.menu_title}
                          cardButtonStartTime={menu.menu_start_time}
                          cardButtonEndTime={menu.menu_end_time}
                          cardButtonLocation={menu.menu_location}
                          cardButtonLabel={`Click to open the menu for ${menu.menu_title}`}
                          cardButtonToggle={() => openMenuWithDetails(menu)}
                          cardButtonStyle={{
                            top: `${calculateTopPosition(
                              menu.menu_start_time,
                            )}px`,
                            height: `${calculateHeight(
                              menu.menu_start_time,
                              menu.menu_end_time,
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
        menuModalTitle={menuTitle}
        menuModalLocation={menuLocation}
        menuModalDate={menuDate}
        menuModalStartTime={menuStartTime}
        menuModalEndTime={menuEndTime}
        menuModalVisibility={isMenuOpen}
        menuModalToggle={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default WeekGrid;
