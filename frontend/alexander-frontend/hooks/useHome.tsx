import { useEffect, useState } from "react";
import useDateCalculator from "./useDateCalculator";
import useMenus from "./useMenus"; // Assuming useMenus is in the right path

const useHome = (userId: string, userEmail: string) => {
  const { getDayNameFromDate, getCurrentWeekNumber, formatDateToDDMMYYYY } =
    useDateCalculator();
  const { getMenusFromGivenWeek } = useMenus();
  const [menus, setMenus] = useState([]);
  const [organizedMenus, setOrganizedMenus] = useState({});
  const [week, setWeek] = useState(1);
  const [weekNumber, setWeekNumber] = useState(0);

  useEffect(() => {
    const fetchMenus = async () => {
      const weekNumber = getCurrentWeekNumber(week);
      setWeekNumber(weekNumber);
      const retrievedMenus = await getMenusFromGivenWeek(weekNumber);
      setMenus(retrievedMenus);
    };

    fetchMenus();
  }, [week]);

  useEffect(() => {
    // Organize menus by day names
    const organizeMenusByDay = () => {
      const dayOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const organized = dayOrder.reduce(
        (acc, day) => ({ ...acc, [day]: { menus: [], date: "" } }), // Initialize each day with menus and a date
        {},
      );

      menus.forEach((menu) => {
        const dayName = getDayNameFromDate(menu.menu_date);
        const date = formatDateToDDMMYYYY(menu.menu_date);
        if (organized[dayName]) {
          organized[dayName].menus.push(menu);
          if (!organized[dayName].date) {
            organized[dayName].date = date; // Assuming all menus of the same day have the same date
          }
        }
      });

      setOrganizedMenus(organized);
    };

    if (menus.length > 0) {
      organizeMenusByDay();
    }
  }, [menus, getDayNameFromDate, formatDateToDDMMYYYY]);

  useEffect(() => {
    console.log(menus);
  }, [menus]);

  const decreaseWeek = () => {
    setWeek(week - 1);
  };

  const increaseWeek = () => {
    setWeek(week + 1);
  };

  const resetWeek = () => {
    setWeek(1);
  };

  return {
    getCurrentWeekNumber,
    weekNumber,
    menus,
    organizedMenus, // Make sure to return this
    decreaseWeek,
    increaseWeek,
    resetWeek,
  };
};

export default useHome;
