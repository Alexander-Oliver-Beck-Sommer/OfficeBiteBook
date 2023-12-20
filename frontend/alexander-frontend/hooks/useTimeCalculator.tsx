import { useState, useEffect } from "react";
import rawWeekSettings from "@/data/weekSettings";

type LocaleSettings = {
  country: string;
  weekDays: string[];
  timeFormat: TimeFormat; // Ensure this matches the type in WeekGrid
};

type TimeFormat = "24-hour" | "12-hour";

type WeekSettings = {
  [key: string]: LocaleSettings;
};

// Explicitly type weekSettings as WeekSettings
const weekSettings: WeekSettings = rawWeekSettings as WeekSettings;

const useTimeCalculator = (locale: string = "da-DK") => {
  const settings: LocaleSettings =
    weekSettings[locale] || weekSettings["da-DK"];
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateHourCells = (timeFormat: TimeFormat) => {
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

  const getDates = () => {
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
    const pastDaysOfYear =
      (currentDate.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return {
    currentDate,
    setCurrentDate,
    generateHourCells,
    getDates,
    getCurrentWeekNumber,
    settings,
  };
};

export default useTimeCalculator;
