import React, { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { toast } from "react-toastify";
import weekData from "@/data/weekData";

type Week = {
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

  useEffect(() => {
    const browserLanguage = navigator.language;
    const language = weekData[browserLanguage] ? browserLanguage : "en";
    const weekSettings = weekData[language];
    setWeek(weekType ? weekSettings.workWeek : weekSettings.fullWeek);
  }, [weekType]);

  const hourCellsGeneration = () => {
    const hourCells: HourCell[] = [];
    for (let hour = 0; hour < 24; hour++) {
      const fullHour = hour.toString().padStart(2, "0") + ":00";
      const halfHour = hour.toString().padStart(2, "0") + ":30";
      hourCells.push({ fullHour, halfHour });
    }
    return hourCells;
  };

  useEffect(() => {
    console.log("Current week state:", week);
  }, [week]);

  return { week, setWeekType, hourCellsGeneration };

  return week;
};

export default useTimeMachine;
