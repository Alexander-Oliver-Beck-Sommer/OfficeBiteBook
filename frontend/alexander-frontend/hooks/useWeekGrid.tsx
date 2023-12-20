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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");
  const [menuLocation, setMenuLocation] = useState("");
  const [menuDate, setMenuDate] = useState("");
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuEndTime, setMenuEndTime] = useState("");

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

  const toggleMenu = (startTime: string, date: string): void => {
    setMenuStartTime(startTime);
    setMenuDate(date);
    setIsMenuOpen(!isMenuOpen);
  };

  const openMenuWithDetails = (menu: Menu): void => {
    setMenuTitle(menu.menu_title);
    setMenuLocation(menu.menu_location);
    setMenuDate(menu.menu_date);
    setMenuStartTime(menu.menu_start_time);
    setMenuEndTime(menu.menu_end_time);
    setIsMenuOpen(!isMenuOpen);
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
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    menuTitle,
    menuLocation,
    menuDate,
    menuStartTime,
    menuEndTime,
    openMenuWithDetails,
    isToday,
  };
};

export default useWeekGrid;
