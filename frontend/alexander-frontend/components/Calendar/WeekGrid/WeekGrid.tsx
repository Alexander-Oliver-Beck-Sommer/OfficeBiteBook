import DayCell from "@/components/Calendar/WeekGrid/child-components/DayCell";
import SettingsCell from "@/components/Calendar/WeekGrid/child-components/SettingsCell";
import VisibilityCell from "@/components/Calendar/WeekGrid/child-components/VisibilityCell";
import HourCell from "@/components/Calendar/WeekGrid/child-components/HourCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import useWeekGrid from "@/hooks/useWeekGrid"; // This is where the magic happens

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
                        <section
                          key={`menu-card-${menuIndex}`}
                          aria-label={menu.menu_title}
                          style={{
                            top: `${calculateTopPosition(
                              menu.menu_start_time,
                            )}px`,
                            height: `${calculateHeight(
                              menu.menu_start_time,
                              menu.menu_end_time,
                            )}px`,
                          }}
                          onClick={() => openMenuWithDetails(menu)}
                          className="absolute left-0 flex w-11/12 flex-col justify-between overflow-auto rounded border-l-4 border-l-true_blue bg-eerie_black p-2"
                        >
                          <div>
                            <h4>{menu.menu_title}</h4>
                            <p className="pt-1 text-sm">
                              {menu.menu_start_time} - {menu.menu_end_time}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm">{menu.menu_location}</p>
                          </div>
                        </section>
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
