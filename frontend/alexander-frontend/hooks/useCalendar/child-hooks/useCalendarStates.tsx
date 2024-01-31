import { useState } from "react";

type Menu = {
  menu_id?: string; // UUID
  user_id?: string; // UUID
  menu_title?: string; // text
  menu_location?: string; // text
  menu_date?: string; // date
  menu_start_time?: string; // text
  menu_end_time?: string; // text
  menu_week?: number; // int8
  menu_dishes_amount?: number; // int8
};

type Dish = {
  dish_id?: string; // UUID
  menus_id?: string[]; // jsonb (array containing ids of menus this dish is in)
  dish_title?: string; // text
  dish_subtitle?: string; // text
  dish_description?: string; // text
  dish_thumbnail?: string; // text
};

const useCalendarStates = () => {
  const [menuSource, setMenuSource] = useState<string>(""); // The source of the menu can be either "create" or "update"
  const [menus, setMenus] = useState<Menu[]>([]);
  const [fetchedMenus, setFetchedMenus] = useState<Menu[]>([]);
  const [menuId, setMenuId] = useState<typeof Menu.prototype.menu_id>("");
  const [title, setTitle] = useState<typeof Menu.prototype.menu_title>("");
  const [location, setLocation] = useState<typeof Menu.prototype.menu_location>(""); // prettier-ignore
  const [date, setDate] = useState<typeof Menu.prototype.menu_date>("");
  const [startTime, setStartTime] = useState<typeof Menu.prototype.menu_start_time>(""); // prettier-ignore
  const [endTime, setEndTime] = useState<typeof Menu.prototype.menu_end_time>(""); // prettier-ignore
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dishesToRemove, setDishesToRemove] = useState<string[]>([]);
  const [fetchedDishes, setFetchedDishes] = useState<Dish[]>([]);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false); // FALSE = closed, TRUE = open

  return {
    menuSource,
    setMenuSource,
    menus,
    setMenus,
    fetchedMenus,
    setFetchedMenus,
    dishes,
    setDishes,
    dishesToRemove,
    setDishesToRemove,
    fetchedDishes,
    setFetchedDishes,
    modalVisibility,
    setModalVisibility,
    menuId,
    setMenuId,
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
  };
};

export default useCalendarStates;
