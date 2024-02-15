import { useState } from "react";
import { MenuProps } from "@/types/MenuProps";
import { DishProps } from "@/types/DishProps";

type Mode = "create" | "edit" | "";

const states = () => {
  const [mode, setMode] = useState<Mode>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuID, setMenuID] = useState<string>("");
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [dishes, setDishes] = useState<DishProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  return {
    mode,
    setMode,
    visibility,
    setVisibility,
    loading,
    setLoading,
    menuID,
    setMenuID,
    menus,
    setMenus,
    dishes,
    setDishes,
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

export default states;
