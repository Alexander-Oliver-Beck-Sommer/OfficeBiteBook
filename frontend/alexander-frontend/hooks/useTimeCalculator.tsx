import { useState, useEffect } from "react";
import weekSettings from "@/data/weekSettings";

const useTimeCalculator = (locale = "da-DK") => {
  const settings = weekSettings[locale] || weekSettings["da-DK"];
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateTimeSlots = (timeFormat) => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      let hourFormatted =
        timeFormat === "24-hour"
          ? hour.toString().padStart(2, "0")
          : hour % 12 === 0
            ? 12
            : hour % 12;
      let amPm = hour < 12 ? "AM" : "PM";

      const fullHour =
        `${hourFormatted}:00` + (timeFormat === "12-hour" ? ` ${amPm}` : "");
      const halfHour =
        `${hourFormatted}:30` + (timeFormat === "12-hour" ? ` ${amPm}` : "");

      slots.push({ fullHour, halfHour });
    }
    return slots;
  };

  const getWeekDates = () => {
    const today = new Date(currentDate);
    const firstDayOfWeek =
      today.getDate() -
      today.getDay() +
      (settings.country === "United States" ? 0 : 1);
    const startDate = new Date(today.setDate(firstDayOfWeek));
    const weekDates = settings.weekDays.map((_, idx) => {
      const day = new Date(startDate);
      day.setDate(day.getDate() + idx);
      return day;
    });
    return weekDates;
  };

  const getCurrentWeekNumber = () => {
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return {
    currentDate,
    setCurrentDate,
    generateTimeSlots,
    getWeekDates,
    getCurrentWeekNumber,
    settings,
  };
};

export default useTimeCalculator;
