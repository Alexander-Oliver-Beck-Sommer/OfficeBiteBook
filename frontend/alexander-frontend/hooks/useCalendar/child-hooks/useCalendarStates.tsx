import { useState } from "react";

type Menu = {
  menu_id?: string;
  user_id?: string; // Used to identify the user who created the menu
  menu_title?: string;
  menu_location?: string;
  menu_date?: string;
  menu_start_time?: string;
  menu_end_time?: string;
  menu_dishes_amount?: number;
  menu_week_number?: number;
  menu_participants?: string[];
};

type Dish = {
  dish_id?: string;
  menus_id?: string[]; // Used to identify the menus that the dish is tied to - could be multiple
  dish_title?: string;
  dish_subtitle?: string;
  dish_description?: string;
  dish_saved?: boolean;
  dish_thumbnail_value?: string;
};

const useCalendarStates = () => {
  const [generatedMenuUUID, setGeneratedMenuUUID] = useState<string>("");
  const [menus, setMenus] = useState<Menu[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false); // FALSE = closed, TRUE = open
  const [menuId, setMenuId] = useState<typeof Menu.prototype.menu_id>("");
  const [title, setTitle] = useState<typeof Menu.prototype.menu_title>("");
  const [location, setLocation] = useState<typeof Menu.prototype.menu_location>(""); // prettier-ignore
  const [date, setDate] = useState<typeof Menu.prototype.menu_date>("");
  const [startTime, setStartTime] = useState<typeof Menu.prototype.menu_start_time>(""); // prettier-ignore
  const [endTime, setEndTime] = useState<typeof Menu.prototype.menu_end_time>(""); // prettier-ignore

  return {
    generatedMenuUUID,
    setGeneratedMenuUUID,
    menus,
    setMenus,
    dishes,
    setDishes,
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
