import { useEffect, useState } from "react";
import useDateCalculator from "./useDateCalculator";
import useMenus from "./useMenus";

const useHome = (userId: string, userEmail: string) => {
  const { getDayNameFromDate, getCurrentWeekNumber, formatDate } =
    useDateCalculator();
  const { getMenusFromGivenWeek, getDishesFromMenu } = useMenus();
  const [menus, setMenus] = useState([]);
  const [organizedMenus, setOrganizedMenus] = useState({});
  const [week, setWeek] = useState(0);
  const [weekNumber, setWeekNumber] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      const weekNumber = getCurrentWeekNumber(week);
      setWeekNumber(weekNumber);
      const retrievedMenus = await getMenusFromGivenWeek(weekNumber);
      setMenus(retrievedMenus);

      if (retrievedMenus.length > 0) {
        const menusWithDishes = await Promise.all(
          retrievedMenus.map(async (menu) => {
            const dishes = await getDishesFromMenu(menu.menu_id);
            return { ...menu, dishes };
          }),
        );
        setMenus(menusWithDishes);
      }
    };

    fetchMenus();
  }, [week]);

  useEffect(() => {
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
        (acc, day) => ({ ...acc, [day]: { menus: [], date: "" } }),
        {},
      );

      menus.forEach((menu) => {
        const dayName = getDayNameFromDate(menu.menu_date);
        const date = formatDate(menu.menu_date);
        if (organized[dayName]) {
          organized[dayName].menus.push(menu);
          if (!organized[dayName].date) {
            organized[dayName].date = date;
          }
        }
      });

      setOrganizedMenus(organized);
    };

    if (menus.length > 0) {
      organizeMenusByDay();
    }
  }, [menus, getDayNameFromDate, formatDate]);

  const decreaseWeek = () => {
    setWeek(week - 1);
  };

  const increaseWeek = () => {
    setWeek(week + 1);
  };

  const resetWeek = () => {
    setWeek(1);
  };

  const handleModalOpen = (menu) => {
    setModalData(menu);
    setModalStatus(true);
  };

  const handleModalClose = () => {
    setModalData(null);
    setModalStatus(false);
  };

  return {
    getCurrentWeekNumber,
    weekNumber,
    menus,
    organizedMenus,
    decreaseWeek,
    increaseWeek,
    resetWeek,
    handleModalOpen,
    handleModalClose,
    modalStatus,
    modalData,
  };
};

export default useHome;
