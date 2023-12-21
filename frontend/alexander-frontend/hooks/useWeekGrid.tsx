import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";

type Menu = {
  menu_title: string;
  menu_date: string;
  menu_start_time: string;
  menu_end_time: string;
};

const useWeekGrid = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuModalVisibility, setMenuModalVisibility] = useState(false);
  const [menuModalTitle, setMenuModalTitle] = useState("");
  const [menuModalLocation, setMenuModalLocation] = useState("");
  const [menuModalDate, setMenuModalDate] = useState("");
  const [menuModalStartTime, setMenuModalStartTime] = useState("");
  const [menuModalEndTime, setMenuModalEndTime] = useState("");

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

  const hourCellToggleMenu = (startTime: string, date: string): void => {
    setMenuModalTitle("");
    setMenuModalLocation("");
    setMenuModalDate(date);
    setMenuModalStartTime(startTime);
    setMenuModalEndTime("");
    setMenuModalVisibility(!menuModalVisibility);
  };

  const cardButtonToggle = (menu: Menu): void => {
    setMenuModalTitle(menu.menu_title);
    setMenuModalLocation(menu.menu_location);
    setMenuModalDate(menu.menu_date);
    setMenuModalStartTime(menu.menu_start_time);
    setMenuModalEndTime(menu.menu_end_time);
    setMenuModalVisibility(!menuModalVisibility);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const calculateTopPosition = (startTime: string): number => {
    const baseTime = new Date();
    baseTime.setHours(8, 0, 0);

    const menuTime = new Date();
    const [hours, minutes] = startTime.split(":");
    menuTime.setHours(parseInt(hours), parseInt(minutes), 0);

    return ((menuTime - baseTime) / (1000 * 60 * 30)) * 48;
  };

  const calculateHeight = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0);

    return ((endDate - startDate) / (1000 * 60 * 30)) * 48;
  };

  return {
    menus,
    calculateTopPosition,
    calculateHeight,
    menuModalVisibility,
    setMenuModalVisibility,
    hourCellToggleMenu,
    menuModalTitle,
    menuModalLocation,
    menuModalDate,
    menuModalStartTime,
    menuModalEndTime,
    cardButtonToggle,
    isToday,
  };
};

export default useWeekGrid;
