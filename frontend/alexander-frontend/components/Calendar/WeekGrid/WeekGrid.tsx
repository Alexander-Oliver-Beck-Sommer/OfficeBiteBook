import React, { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import DayCell from "@/components/Calendar/WeekGrid/child-components/DayCell";
import SettingsCell from "@/components/Calendar/WeekGrid/child-components/SettingsCell";
import VisibilityCell from "@/components/Calendar/WeekGrid/child-components/VisibilityCell";
import HourCell from "@/components/Calendar/WeekGrid/child-components/HourCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";

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

type Menu = {
  menu_title: string;
  menu_date: string;
  menu_start_time: string;
  menu_end_time: string;
};

type WeekGridProps = {
  generateTimeSlots: (timeFormat: TimeFormat) => TimeSlot[];
  getWeekDates: () => Date[];
  settings: Settings;
};

const WeekGrid: React.FC<WeekGridProps> = ({
  generateTimeSlots,
  getWeekDates,
  settings,
}) => {
  const timeSlots = generateTimeSlots(settings.timeFormat);
  const weekDates = getWeekDates();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuDate, setMenuDate] = useState("");
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        let { data: menusData, error } = await supabase
          .from("menus")
          .select("*");
        if (error) throw error;
        setMenus(menusData);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const toggleMenu = (startTime: string, date: string) => {
    setMenuStartTime(startTime);
    setMenuDate(date);
    setIsMenuOpen(!isMenuOpen);
  };

  const calculateTopPosition = (startTime) => {
    const baseTime = new Date();
    baseTime.setHours(8, 0, 0);

    const menuTime = new Date();
    const [hours, minutes] = startTime.split(":");
    menuTime.setHours(parseInt(hours), parseInt(minutes), 0);

    const halfHourCount = (menuTime - baseTime) / (1000 * 60 * 30);
    return halfHourCount * 48;
  };

  const calculateHeight = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0);

    const halfHourCount = (endDate - startDate) / (1000 * 60 * 30);
    return halfHourCount * 48;
  };

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
                          dateValue={dateValue}
                          fullValue={slot.fullHour}
                          fullLabel={`Click and create a new menu at ${slot.fullHour}`}
                          fullToggle={() =>
                            toggleMenu(slot.fullHour, dateValue)
                          }
                          halfValue={slot.halfHour}
                          halfLabel={`Click and create a new menu at ${slot.halfHour}`}
                          halfToggle={() =>
                            toggleMenu(slot.halfHour, dateValue)
                          }
                        />
                      ))}
                      {dayMenus.map((menu, menuIndex) => (
                        <section
                          key={`menu-card-${menuIndex}`}
                          aria-label="card"
                          style={{
                            top: `${calculateTopPosition(
                              menu.menu_start_time,
                            )}px`,
                            height: `${calculateHeight(
                              menu.menu_start_time,
                              menu.menu_end_time,
                            )}px`,
                          }}
                          className="absolute left-0 flex w-11/12 flex-col justify-between  overflow-auto rounded border-l-4 border-l-true_blue bg-eerie_black p-2"
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
        date={menuDate}
        startTime={menuStartTime}
        menuVisible={isMenuOpen}
        toggle={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default WeekGrid;
