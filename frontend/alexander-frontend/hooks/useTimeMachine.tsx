import React, { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { toast } from "react-toastify";
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
  const [weekEndTime, setWeekEndTime] = useState("16:00");

  const getCurrentWeekNumber = () => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = Math.floor(
      (currentDate - startOfYear) / (24 * 60 * 60 * 1000),
    );
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    getCurrentWeekNumber(),
  );

  const goToNextWeek = () => {
    const nextWeek = currentWeekNumber + 1;
    setCurrentWeekNumber(nextWeek > 52 ? 1 : nextWeek); // Assuming 52 weeks in a year
  };

  const goToPreviousWeek = () => {
    const prevWeek = currentWeekNumber - 1;
    setCurrentWeekNumber(prevWeek < 1 ? 52 : prevWeek); // Assuming 52 weeks in a year
  };

  const getWeekStartAndEndDates = (weekNumber) => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const weekStart = new Date(
      startOfYear.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000,
    );
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Adjust to start from Monday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // End on Sunday

    return { weekStart, weekEnd };
  };

  const hourCellsGeneration = () => {
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
    console.log("Current week state:", week);
  }, [week]);

  useEffect(() => {
    const { weekStart } = getWeekStartAndEndDates(currentWeekNumber);
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
    setWeekType,
    hourCellsGeneration,
    currentWeekNumber,
    setWeekStartTime,
    setWeekEndTime,
    goToNextWeek,
    goToPreviousWeek,
  };
};

export default useTimeMachine;
