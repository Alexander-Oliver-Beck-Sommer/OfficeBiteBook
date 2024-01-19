import { supabase } from "@/components/Supabase/supabaseClient";
import { useEffect, useState } from "react";

const useHome = (userId, userEmail) => {
  const [weekNumber, setWeekNumber] = useState(0);
  const [menus, setMenus] = useState([]);
  const [menusAndDishes, setMenusAndDishes] = useState([]);

  const fetchDishesForMenu = async (menuId) => {
    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .eq("menu_id", menuId);
    if (error) throw error;
    return data;
  };

  useEffect(() => {
    const calculateWeekNumber = () => {
      const currentDate = new Date();
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const pastDaysOfYear = Math.floor(
        (currentDate - startOfYear) / (24 * 60 * 60 * 1000),
      );
      return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    const fetchMenusData = async () => {
      try {
        const calculatedWeekNumber = calculateWeekNumber();
        const { data: menusData, error } = await supabase
          .from("menus")
          .select("*")
          .eq("menu_week", calculatedWeekNumber);

        if (error) {
          throw error;
        }

        const combinedMenusAndDishes = await Promise.all(
          menusData.map(async (menu) => {
            const dishes = await fetchDishesForMenu(menu.menu_id);
            return { ...menu, dishes };
          }),
        );

        setMenusAndDishes(combinedMenusAndDishes);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    if (userId && userEmail) {
      setWeekNumber(calculateWeekNumber());
      fetchMenusData();
    }
  }, [userId, userEmail]);

  return { menusAndDishes, weekNumber };
};

export default useHome;
