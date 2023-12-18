"use client";
import React, { useState, useMemo } from "react";
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
  menus: Menu[];
};

const WeekGrid: React.FC<WeekGridProps> = ({
  generateTimeSlots,
  getWeekDates,
  settings,
  menus,
}) => {
  const timeSlots = generateTimeSlots(settings.timeFormat);
  const weekDates = getWeekDates();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuDate, setMenuDate] = useState("");

  const toggleMenu = (startTime: string, date: string) => {
    setMenuStartTime(startTime);
    setMenuDate(date);
    setIsMenuOpen(!isMenuOpen);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const menuMap = useMemo(() => {
    return menus.reduce((acc, menu) => {
      const date = menu.menu_date.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push({
        title: menu.menu_title,
        startTime: menu.menu_start_time,
        endTime: menu.menu_end_time,
      });
      return acc;
    }, {});
  }, [menus]);

  return (
    <>
      <ul className="grid grid-cols-autoX1 gap-grid">
        <li className="w-20 bg-eerie_black">
          <ul className="flex flex-col gap-grid">
            <li className="flex flex-col gap-grid">
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
              const dayMenus = menuMap[dateValue] || [];

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
                    {timeSlots.map((slot, slotIndex) => {
                      const fullCard = dayMenus.some((menu) => {
                        const menuStart = new Date(
                          `${dateValue}T${menu.startTime}`,
                        ).getTime();
                        const menuEnd = new Date(
                          `${dateValue}T${menu.endTime}`,
                        ).getTime();
                        const slotTime = new Date(
                          `${dateValue}T${slot.fullHour}`,
                        ).getTime();

                        return slotTime >= menuStart && slotTime < menuEnd;
                      });

                      const halfCard = dayMenus.some((menu) => {
                        const menuStart = new Date(
                          `${dateValue}T${menu.startTime}`,
                        ).getTime();
                        const menuEnd = new Date(
                          `${dateValue}T${menu.endTime}`,
                        ).getTime();
                        const slotTime = new Date(
                          `${dateValue}T${slot.halfHour}`,
                        ).getTime();

                        return (
                          slotTime < menuEnd &&
                          (slotTime >= menuStart ||
                            slot.fullHour === menu.startTime)
                        );
                      });

                      return (
                        <HourCell
                          key={`${dayName}-hours-${slotIndex}`}
                          dateValue={dateValue}
                          fullValue={slot.fullHour}
                          fullLabel={`Click and create a new menu at ${slot.fullHour}`}
                          fullToggle={() =>
                            toggleMenu(slot.fullHour, dateValue)
                          }
                          fullCard={fullCard}
                          halfValue={slot.halfHour}
                          halfLabel={`Click and create a new menu at ${slot.halfHour}`}
                          halfToggle={() =>
                            toggleMenu(slot.halfHour, dateValue)
                          }
                          halfCard={halfCard}
                        />
                      );
                    })}
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
