import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useMenus from "./useMenus";
import useDateCalculator from "./useDateCalculator";
import useUtilities from "./useUtilities";
import { MenuProps } from "@/types/MenuProps";
import { DishProps } from "@/types/DishProps";

type MenuSource = "create" | "edit" | "";

const useMenuCreator = (userId: string) => {
  // States:
  const [menuSource, setMenuSource] = useState<MenuSource>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<string>("");
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [dishes, setDishes] = useState<DishProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  // Hooks:
  const { uploadMenu, getMenusFromUser, updateMenu } = useMenus();
  const {
    getCurrentWeekNumber,
    getWeekNumberFromDate,
    convertStringToMinutes,
  } = useDateCalculator();
  const { calculateCardButtonPosition, calculateCardButtonHeight } =
    useUtilities();

  // Utility Functions:
  const verifyMenu = () => {
    if (!title || !location || !date || !startTime || !endTime) {
      return false;
    }

    const startTimeInMinutes = convertStringToMinutes(startTime);
    const endTimeInMinutes = convertStringToMinutes(endTime);

    const isEndTimeValid = endTimeInMinutes - startTimeInMinutes >= 60;

    return isEndTimeValid;
  };

  const prepareNewMenu = (date: string, hour: string) => {
    setMenuSource("create");
    setVisibility(true);
    setMenuId(uuidv4());
    setDate(date);
    setStartTime(hour);
    setEndTime(hour);
  };

  const saveNewMenu = async () => {
    setLoading(true);

    if (menuSource === "create") {
      if (!verifyMenu()) {
        setLoading(false);
        console.log("Invalid menu data.");
        return;
      }

      const menu: MenuProps = {
        menu_id: menuId,
        user_id: userId,
        title: title,
        location: location,
        date: date,
        start_time: startTime,
        end_time: endTime,
        week: getCurrentWeekNumber(),
      };
      await uploadMenu(menu);
      setVisibility(false);
    }

    if (menuSource === "edit") {
      const menu: MenuProps = {
        title: title,
        location: location,
        date: date,
        start_time: startTime,
        end_time: endTime,
        week: getWeekNumberFromDate(date),
        dishes: dishes,
      };
      await updateMenu(menuId, menu);
      setVisibility(false);
    }
  };

  const editMenu = (menu: MenuProps) => {
    setMenuSource("edit");
    setVisibility(true);
    setMenuId(menu.menu_id);
    setTitle(menu.title);
    setLocation(menu.location);
    setDate(menu.date);
    setStartTime(menu.start_time);
    setEndTime(menu.end_time);
  };

  const closeMenu = () => {
    setVisibility(false);
  };

  const loadMenus = async () => {
    const fetchedMenus = await getMenusFromUser(userId);
    setMenus(fetchedMenus);
  };

  // useEffect Hooks:
  useEffect(() => {
    console.log("Menu ID:", menuId);
    console.log("Menu Source:", menuSource);
  }, [menuId]);

  useEffect(() => {
    if (visibility === false) {
      setMenuSource("");
      loadMenus();
      setDishes([]);
      setLoading(false);
      setMenuId("");
      setTitle("");
      setLocation("");
      setDate("");
      setStartTime("");
      setEndTime("");
    }
  }, [visibility]);

  return {
    prepareNewMenu,
    editMenu,
    saveNewMenu,
    closeMenu,
    visibility,
    loading,
    menus,
    dishes,
    title,
    setTitle,
    location,
    setLocation,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    calculateCardButtonPosition,
    calculateCardButtonHeight,
  };
};

export default useMenuCreator;
