"use client";
import React, { useState } from "react";
import weekSettings from "@/data/weekSettings";
import HourCell from "./cell-components/HourCell";
import DayCell from "./cell-components/DayCell";
import SettingsCell from "./cell-components/SettingsCell";
import VisibilityCell from "./cell-components/VisibilityCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import TransparentBackground from "@/components/TransparentBackground";

const WeekGrid = ({ generateTimeSlots, getWeekDates, settings }) => {
  const timeSlots = generateTimeSlots(settings.timeFormat);
  const weekDates = getWeekDates();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuDate, setMenuDate] = useState("");

  const toggleMenu = (startTime, date) => {
    setMenuStartTime(startTime);
    setMenuDate(date);
    setIsMenuOpen(!isMenuOpen);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <ul className="gap-grid grid grid-cols-autoX1">
        <li className="w-20 bg-eerie_black">
          <ul className="gap-grid flex flex-col">
            <li className="gap-grid flex flex-col">
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
          <ul className="gap-grid grid grid-cols-7">
            {Object.entries(settings.weekDays).map(([day, dayName], index) => {
              const date = weekDates[index];
              const isCurrentDay = isToday(date);
              const dateValue = date.toISOString().split("T")[0];
              return (
                <li key={`week-day-${day}`} className="overflow-hidden">
                  <ul className="gap-grid flex flex-col">
                    <li className="gap-grid flex w-full flex-row flex-wrap">
                      <DayCell
                        dayName={dayName}
                        dayDate={date.getDate()}
                        isCurrentDay={isCurrentDay}
                      />
                      <SettingsCell />
                      <VisibilityCell />
                    </li>
                    {timeSlots.map((slot, slotIndex) => (
                      <HourCell
                        key={`${day}-hours-${slotIndex}`}
                        fullValue={slot.fullHour}
                        fullLabel={`Click and create a new menu at ${slot.fullHour}`}
                        fullToggle={() => toggleMenu(slot.fullHour, dateValue)}
                        halfValue={slot.halfHour}
                        halfLabel={`Click and create a new menu at ${slot.halfHour}`}
                        halfToggle={() => toggleMenu(slot.halfHour, dateValue)}
                        dateValue={dateValue}
                      />
                    ))}
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
        visible={isMenuOpen}
        toggle={() => setIsMenuOpen(false)}
      />
      <TransparentBackground
        visible={isMenuOpen}
        toggle={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default WeekGrid;
