"use client";
import { useEffect, useState } from "react";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import WeekGrid from "@/components/Calendar/WeekGrid/WeekGrid";
import useTimeCalculator from "@/hooks/useTimeCalculator";
import { supabase } from "../Supabase/supabaseClient";

export default function Calendar() {
  const {
    currentDate,
    setCurrentDate,
    generateTimeSlots,
    getWeekDates,
    getCurrentWeekNumber,
    settings,
  } = useTimeCalculator();

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

  return (
    <section aria-label="Calendar">
      <NavigationBar
        setCurrentDate={setCurrentDate}
        getCurrentWeekNumber={getCurrentWeekNumber}
      />
      <WeekGrid
        generateTimeSlots={generateTimeSlots}
        getWeekDates={getWeekDates}
        settings={settings}
        menus={menus}
      />
    </section>
  );
}
