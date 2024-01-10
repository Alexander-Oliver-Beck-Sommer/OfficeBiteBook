import { useState, useEffect } from "react";
import weekData from "@/data/weekData";

type Week = {
  week_number: number;
  week_location: string;
  week_days: string[];
};

type HourCell = {
  fullHour: string;
  halfHour: string;
};

const useTimeMachine = () => {
  const [week, setWeek] = useState<Week[]>([]);
  const [weekType, setWeekType] = useState(true);
  const [weekStartTime, setWeekStartTime] = useState("08:00");
  const [weekEndTime, setWeekEndTime] = useState("17:00");
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCurrentWeekNumber = () => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = Math.floor(
      (currentDate - startOfYear) / (24 * 60 * 60 * 1000),
    );
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  const [weekHighlighter, setWeekHighlighter] = useState(
    getCurrentWeekNumber(),
  );
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    getCurrentWeekNumber(),
  );

  // Function, if executed, will update the current week number to one week back
  const weekBackward = () => {
    const previousWeek = currentWeekNumber - 1;
    setCurrentWeekNumber(previousWeek < 1 ? 52 : previousWeek);
  };

  // Function, if executed, will update the current week number to one week forward
  const weekForward = () => {
    const nextWeek = currentWeekNumber + 1;
    setCurrentWeekNumber(nextWeek > 52 ? 1 : nextWeek);
  };

  const weekDates = (weekNumber) => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const weekStart = new Date(
      startOfYear.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000,
    );
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return { weekStart, weekEnd };
  };

  const weekReset = () => {
    setCurrentWeekNumber(getCurrentWeekNumber());
  };

  const weekTypeSwitcher = () => {
    setWeekType(!weekType);
  };

  const weekHours = () => {
    const startHour = parseInt(weekStartTime.split(":")[0], 10);
    const endHour = parseInt(weekEndTime.split(":")[0], 10);
    const hourCells: HourCell[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      const fullHour = hour.toString().padStart(2, "0") + ":00";
      const halfHour = hour.toString().padStart(2, "0") + ":30";
      hourCells.push({ fullHour, halfHour });
    }

    return hourCells;
  };

  useEffect(() => {
    const { weekStart } = weekDates(currentWeekNumber);
    const language = weekData[navigator.language] ? navigator.language : "en";
    const weekSettings = weekData[language];
    const weekDays = weekType ? weekSettings.workWeek : weekSettings.fullWeek;

    const formattedWeekDays = weekDays.map((dayName, index) => {
      const date = new Date(weekStart.getTime());
      date.setDate(date.getDate() + index);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      return { name: dayName, date: formattedDate };
    });

    setWeek({
      week_number: currentWeekNumber,
      week_location: language,
      week_days: formattedWeekDays,
    });
  }, [currentWeekNumber, weekType]);

  return {
    week,
    weekType,
    weekTypeSwitcher,
    weekHours,
    weekHighlighter,
    currentWeekNumber,
    setWeekStartTime,
    setWeekEndTime,
    weekForward,
    weekBackward,
    weekReset,
  };
};

export default useTimeMachine;
