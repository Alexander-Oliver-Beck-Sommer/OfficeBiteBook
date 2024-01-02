import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { Toast } from "react-toastify/dist/components";

type Menu = {
  menu_title: string;
  menu_location: string;
  menu_date: string;
  menu_start_time: string;
  menu_end_time: string;
};

type Dish = {
  dish_id: number;
  dish_title: string;
  dish_subtitle: string;
  dish_description: string;
  dish_thumbnail: string;
};

const useCalendar = () => {
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [menuModalTitle, setMenuModalTitle] = useState("");
  const [menuModalLocation, setMenuModalLocation] = useState("");
  const [menuModalDate, setMenuModalDate] = useState("");
  const [menuModalStartTime, setMenuModalStartTime] = useState("");
  const [menuModalEndTime, setMenuModalEndTime] = useState("");
  const [menuModalVisibility, setMenuModalVisibility] = useState(false);
  const [menuModalSource, setMenuModalSource] = useState("");

  // Fetch data from Supabase (menus and dishes)
  useEffect(() => {
    const fetchMenusAndDishes = async () => {
      try {
        let { data: menusData, error: menusError } = await supabase
          .from("menus")
          .select("*");
        if (menusError) throw menusError;

        const menusWithDishes = await Promise.all(
          menusData.map(async (menu) => {
            let { data: dishesData, error: dishesError } = await supabase
              .from("dishes")
              .select("*")
              .eq("menu_id", menu.menu_id);

            if (dishesError) throw dishesError;

            return { ...menu, dishes: dishesData };
          }),
        );

        setMenus(menusWithDishes);
      } catch (error) {
        console.error("Error fetching menus and dishes:", error);
      }
    };

    fetchMenusAndDishes();
  }, []);

  // Clear the menu modal when it is closed
  useEffect(() => {
    if (menuModalVisibility === false) {
      setMenuModalTitle("");
      setMenuModalLocation("");
      setMenuModalDate("");
      setMenuModalStartTime("");
      setMenuModalEndTime("");
      setMenuModalSource("");
      setDishes([]);
    }
  }, [menuModalVisibility]);

  // Remove this useEffect when the menu modal is finished
  useEffect(() => {
    if (menuModalSource === "hourCell") {
      console.log("The Menu Modal was opened from an Hour Cell");
    } else if (menuModalSource === "cardButton") {
      console.log("The Menu Modal was opened from a Card Button");
    } else {
      console.log("The Menu modal was closed");
    }
  }, [menuModalSource]);

  const dayCellHighlight = (date: Date): boolean => {
    const currentDay = new Date();
    return (
      date.getDate() === currentDay.getDate() &&
      date.getMonth() === currentDay.getMonth() &&
      date.getFullYear() === currentDay.getFullYear()
    );
  };

  const hourCellToggle = (startTime: string, date: string): void => {
    setMenuModalDate(date);
    setMenuModalStartTime(startTime);
    setMenuModalVisibility(true);
    setMenuModalSource("hourCell");
  };

  const cardButtonToggle = (menu: Menu): void => {
    setMenuModalTitle(menu.menu_title);
    setMenuModalLocation(menu.menu_location);
    setMenuModalDate(menu.menu_date);
    setMenuModalStartTime(menu.menu_start_time);
    setMenuModalEndTime(menu.menu_end_time);
    setMenuModalVisibility(true);
    setMenuModalSource("cardButton");
    setDishes(menu.dishes);
  };

  const cardButtonPosition = (startTime: string): number => {
    const baseTime = new Date();
    baseTime.setHours(8, 0, 0);

    const menuTime = new Date();
    const [hours, minutes] = startTime.split(":");
    menuTime.setHours(parseInt(hours), parseInt(minutes), 0);

    return ((menuTime - baseTime) / (1000 * 60 * 30)) * 48;
  };

  const cardButtonHeight = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0);

    return ((endDate - startDate) / (1000 * 60 * 30)) * 48;
  };

  const dishCreate = () => {
    // if (menuModalSource === "hourCell") {
    //   console.log("Create a dish from an hour cell");
    // }
    const newDish: Dish = {
      dish_id: Date.now(),
      dish_title: "",
      dish_subtitle: "",
      dish_description: "",
      dish_thumbnail: "",
    };
    setDishes([...dishes, newDish]); 
  };

  return {
    menus,
    dishes,
    menuModalTitle,
    menuModalLocation,
    menuModalDate,
    menuModalStartTime,
    menuModalEndTime,
    menuModalVisibility,
    setMenuModalVisibility,
    dishCreate,
    dayCellHighlight,
    hourCellToggle,
    cardButtonToggle,
    cardButtonPosition,
    cardButtonHeight,
  };
};

export default useCalendar;
