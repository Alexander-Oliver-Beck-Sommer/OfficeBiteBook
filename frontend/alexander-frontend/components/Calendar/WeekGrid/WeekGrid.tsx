"use client";
import { useState } from "react";
import DayCell from "@/components/Calendar/WeekGrid/child-components/DayCell";
import SettingsCell from "@/components/Calendar/WeekGrid/child-components/SettingsCell";
import VisibilityCell from "@/components/Calendar/WeekGrid/child-components/VisibilityCell";
import HourCell from "@/components/Calendar/WeekGrid/child-components/HourCell";
import weekSettings from "@/data/weekSettings";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import TransparentBackground from "@/components/TransparentBackground";

const WeekGrid = ({ generateTimeSlots, getWeekDates, settings }) => {
  const timeSlots = generateTimeSlots(settings.timeFormat);
  const weekDates = getWeekDates();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuDate, setMenuDate] = useState("");
  const [dayVisibility, setDayVisibility] = useState({});

  const handleVisibilityToggle = (day) => {
    setDayVisibility((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

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
          <ul className="grid grid-cols-7 gap-grid">
            {Object.entries(settings.weekDays).map(([day, dayName], index) => {
              const date = weekDates[index];
              const isCurrentDay = isToday(date);
              const dateValue = date.toISOString().split("T")[0];
              return (
                <li key={`week-day-${day}`} className="overflow-hidden">
                  <ul className="flex flex-col gap-grid">
                    <li className="flex w-full flex-row flex-wrap gap-grid">
                      <DayCell
                        day={dayName}
                        date={date.getDate()}
                        isCurrentDay={isCurrentDay}
                      />
                      <SettingsCell />
                      <VisibilityCell
                        toggle={() => handleVisibilityToggle(day)}
                      />
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
                        isVisible={dayVisibility[day]}
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
