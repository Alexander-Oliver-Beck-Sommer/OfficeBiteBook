import { useEffect, useState } from "react";
import useDateCalculator from "./useDateCalculator";
import useMenus from "./useMenus"; // Assuming useMenus is in the right path

const useHome = (userId: string, userEmail: string) => {
  const { getDayNameFromDate, getCurrentWeekNumber } = useDateCalculator();
  const { getMenusFromGivenWeek } = useMenus();
  const [menus, setMenus] = useState([]);
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
    decreaseWeek,
    increaseWeek,
    resetWeek,
  };
};

export default useHome;
