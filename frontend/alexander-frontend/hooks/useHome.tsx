import { useEffect, useState } from "react";
import useDateCalculator from "./useDateCalculator";
import useMenus from "./useMenus";
import { supabase } from "@/components/Supabase/supabaseClient";

const useHome = (userId: string) => {
  const { getDayNameFromDate, getCurrentWeekNumber, formatDate } =
    useDateCalculator();
  const { getMenusFromGivenWeek, getDishesFromMenu } = useMenus();
  const [checkedMenus, setCheckedMenus] = useState([]);
  const [menus, setMenus] = useState([]);
  const [organizedMenus, setOrganizedMenus] = useState({});
  const [week, setWeek] = useState(1);
  const [weekNumber, setWeekNumber] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [guestOpen, setGuestOpen] = useState(false);

  useEffect(() => {
    const fetchMenus = async () => {
      const weekNumber = getCurrentWeekNumber(week);
      setWeekNumber(weekNumber);
      const retrievedMenus = await getMenusFromGivenWeek(weekNumber);
      setMenus(retrievedMenus);

      if (retrievedMenus.length > 0) {
        const menusWithDishesAndChecked = await Promise.all(
          retrievedMenus.map(async (menu) => {
            const dishes = await getDishesFromMenu(menu.menu_id);
            const menu_declined = menu.menu_declined || [];
            const menu_accepted = menu.menu_accepted || [];
            const menu_checked = menu_accepted.includes(userId)
              ? true
              : menu_declined.includes(userId)
                ? false
                : null;
            return { ...menu, dishes, menu_checked };
          }),
        );
        setMenus(menusWithDishesAndChecked);
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

  const handleGuest = () => {
    setGuestOpen(!guestOpen);
  };

  const checkAllMenus = async () => {
    console.log("Tired");
  };

  const checkMenu = async (menuId, checked) => {
    const updatedMenus = menus.map((menu) => {
      if (menu.menu_id === menuId) {
        return { ...menu, menu_checked: checked };
      }
      return menu;
    });

    let { data: menuData, error: menuError } = await supabase
      .from("menus")
      .select("menu_accepted, menu_declined")
      .eq("menu_id", menuId)
      .single();

    if (menuError) {
      console.error("Error fetching menu:", menuError);
      return;
    }

    let menu_accepted = menuData.menu_accepted || [];
    let menu_declined = menuData.menu_declined || [];

    if (checked) {
      if (!menu_accepted.includes(userId)) {
        menu_accepted.push(userId);
      }
      menu_declined = menu_declined.filter((id) => id !== userId);
    } else {
      if (!menu_declined.includes(userId)) {
        menu_declined.push(userId);
      }
      menu_accepted = menu_accepted.filter((id) => id !== userId);
    }

    const { data: updateData, error: updateError } = await supabase
      .from("menus")
      .update({
        menu_accepted: menu_accepted,
        menu_declined: menu_declined,
      })
      .eq("menu_id", menuId);

    if (updateError) {
      console.error("Error updating menu:", updateError);
      return;
    }
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
    checkAllMenus,
    checkMenu,
    handleGuest,
    guestOpen,
  };
};

export default useHome;
