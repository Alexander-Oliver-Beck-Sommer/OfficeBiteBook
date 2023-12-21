import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/components/Supabase/supabaseClient";

type Menus = {
  menu_id?: number;
  menu_title?: string;
  menu_location?: string;
  menu_date?: string;
  menu_start_time?: string;
  menu_end_time?: string;
  menu_published?: boolean;
};

type Dishes = {
  dish_id?: number;
  menu_id?: number;
  dish_title?: string;
  dish_subtitle?: string;
  dish_description?: string;
  dish_thumbnail?: string;
};

type DishFields = {
  dish_title?: string;
  dish_subtitle?: string;
  dish_description?: string;
  dish_thumbnail?: string;
};

const useCalendar = (initialDate: string, initialStartTime: string) => {
  // Menu States
  const [menus, setMenus] = useState<Menus[]>([]);
  const [menuModalVisibility, setMenuModalVisibility] = useState(false);
  const [menuModalTitle, setMenuModalTitle] = useState("");
  const [menuModalLocation, setMenuModalLocation] = useState("");
  const [menuModalDate, setMenuModalDate] = useState("");
  const [menuModalStartTime, setMenuModalStartTime] = useState("");
  const [menuModalEndTime, setMenuModalEndTime] = useState("");

  // Menu on Change Handlers
  const onMenuModalTitleChange = (newMenuModalTitle: string) =>
    setMenuModalTitle(newMenuModalTitle);
  const onMenuModalLocationChange = (newMenuModalLocation: string) =>
    setMenuModalLocation(newMenuModalLocation);
  const onMenuModalDateChange = (newMenuModalDate: string) =>
    setMenuModalDate(newMenuModalDate);
  const onMenuModalStartTimeChange = (newMenuModalStartTime: string) =>
    setMenuModalStartTime(newMenuModalStartTime);
  const onMenuModalEndTimeChange = (newMenuModalEndTime: string) =>
    setMenuModalEndTime(newMenuModalEndTime);

  // Dish States
  const [dishes, setDishes] = useState<Dishes[]>([]);
  const [dishTitle, setDishTitle] = useState("");
  const [dishSubtitle, setDishSubtitle] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishThumbnail, setDishThumbnail] = useState("");
  const [expandedDish, setExpandedDish] = useState<number | null>(null);

  // Dish on Change Handlers
  const onDishTitleChange = (newDishTitle: string) =>
    setDishTitle(newDishTitle);
  const onDishSubtitleChange = (newDishSubtitle: string) =>
    setDishSubtitle(newDishSubtitle);
  const onDishDescriptionChange = (newDishDescription: string) =>
    setDishDescription(newDishDescription);
  const onDishThumbnailChange = (newDishThumbnail: string) =>
    setDishThumbnail(newDishThumbnail);

  // Retrieve Menus and Dishes from Supabase
  useEffect(() => {
    const fetchMenusAndDishes = async () => {
      try {
        let { data: menusData, error: menusError } = await supabase
          .from("menus")
          .select("*");
        if (menusError) throw menusError;

        const menusDishes = await Promise.all(
          menusData.map(async (menu) => {
            let { data: dishesData, error: dishesError } = await supabase
              .from("dishes")
              .select("*")
              .eq("menu_id", menu.menu_id);

            if (dishesError) throw dishesError;

            return { ...menu, dishes: dishesData };
          }),
        );

        setMenus(menusDishes);
      } catch (error) {
        console.error(
          "Error occured in fetching menus and dishes from Supabase",
          error,
        );
      }
    };

    fetchMenusAndDishes();
  }, []);

  // Inject initialDate and initialStartTime into Menu Modal
  useEffect(() => {
    setMenuDate(initialDate);
    setMenuStartTime(initialStartTime);
  }, [initialDate, initialStartTime]);

  // Function to highlight today's date in the calendar
  const dateCellHighlight = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };


  // Function to create dishes 
  const dishCreate = () => {
    const newDish: Dishes = {
        dish_id: Date.now(),
        dish_title: "",
        dish_subtitle: "",
        dish_description: "",
        dish_thumbnail: "",
      };
      setDishes([...dishes, newDish]);
  }

  // Function to update dishes
  const dishUpdate = (dishId: number, updatedFields: DishFields) => {
    setDishes(
      dishes.map((dish) => {
        return dish.id === dishId ? { ...dish, ...updatedFields } : dish;
      }),
    );
  };

  // TODO: Function to save dishes to the archive (supabase)
  const dishSave = () => {

  }

  const dishDelete = (dishId: number) => {
    setDishes(dishes.filter((dish) => dish.id !== dishId));
  };

  const dishClear = () => {
    if (dishes.length === 0) {
        toast.warn("No dishes to remove");
      } else if (
        window.confirm(
          "Are you sure you want to remove all dishes? All changes will be lost.",
        )
      ) {
        toast.success("All dishes removed");
        setDishes([]);
      }
  }

  const dishAccordion = () => {

  }

  // Function that will be fired when clicking on a HourCell
  const hourCellToggleMenu = (
    menuStartTime: string,
    menuDate: string,
  ): void => {
    setMenuModalTitle("");
    setMenuModalLocation("");
    setMenuModalDate(menuDate);
    setMenuModalStartTime(menuStartTime);
    setMenuModalEndTime("");
    setMenuModalVisibility(!menuModalVisibility);
    setDishes([]);
  };

  // Function that will be fired when clicking on a CardButton
  const cardButtonToggleMenu = (menu: Menus): void => {
    setMenuModalTitle(menu.menu_title);
    setMenuModalLocation(menu.menu_location);
    setMenuModalDate(menu.menu_date);
    setMenuModalStartTime(menu.menu_start_time);
    setMenuModalEndTime(menu.menu_end_time);
    setMenuModalVisibility(!menuModalVisibility);
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

  return {
    // Menus
    menus,
    menuModalVisibility
    menuModalTitle,
    menuModalLocation,
    menuModalDate,
    menuModalStartTime,
    menuModalEndTime,
    onMenuModalTitleChange,
    onMenuModalLocationChange,
    onMenuModalDateChange,
    onMenuModalStartTimeChange,
    onMenuModalEndTimeChange,
    // Dishes
    dishes,
    dishTitle,
    dishSubtitle,
    dishDescription,
    dishThumbnail,
    onDishTitleChange,
    onDishSubtitleChange,
    onDishDescriptionChange,
    onDishThumbnailChange,
    dishCreate,
    dishUpdate,
    dishSave,
    dishDelete,
    dishClear,
    // Hour Cell
    hourCellToggleMenu,
    // Card Button
    cardButtonToggleMenu,
    cardButtonPosition,
    cardButtonHeight,
  };
};

export default useCalendar;
