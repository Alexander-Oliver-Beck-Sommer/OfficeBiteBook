import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type Menu = {
  menu_id: string;
  menu_title: string;
  menu_location: string;
  menu_date: string;
  menu_start_time: string;
  menu_end_time: string;
};

type Dish = {
  dish_id: number;
  menu_id: string;
  dish_title: string;
  dish_subtitle: string;
  dish_description: string;
  dish_thumbnail: string;
};

const useCalendar = () => {
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [originalMenuData, setOriginalMenuData] = useState<Menu | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [menuModalId, setMenuModalId] = useState("");
  const [menuModalTitle, setMenuModalTitle] = useState("");
  const [menuModalLocation, setMenuModalLocation] = useState("");
  const [menuModalDate, setMenuModalDate] = useState("");
  const [menuModalStartTime, setMenuModalStartTime] = useState("");
  const [menuModalEndTime, setMenuModalEndTime] = useState("");
  const [menuModalVisibility, setMenuModalVisibility] = useState(false);
  const [menuModalSource, setMenuModalSource] = useState("");
  const [menuModalChanged, setMenuModalChanged] = useState(false);
  const [dishTitle, setDishTitle] = useState("");
  const [dishSubtitle, setDishSubtitle] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishThumbnail, setDishThumbnail] = useState("");

  const menuModalTitleChange = (newTitle: string) => setMenuModalTitle(newTitle); // prettier-ignore
  const menuModalLocationChange = (newLocation: string) => setMenuModalLocation(newLocation); // prettier-ignore
  const menuModalDateChange = (newDate: string) => setMenuModalDate(newDate); // prettier-ignore
  const menuModalStartTimeChange = (newStartTime: string) => setMenuModalStartTime(newStartTime); // prettier-ignore
  const menuModalEndTimeChange = (newEndTime: string) => setMenuModalEndTime(newEndTime); // prettier-ignore
  const dishTitleChange = (newTitle: string) => setDishTitle(newTitle); // prettier-ignore
  const dishSubtitleChange = (newSubtitle: string) => setDishSubtitle(newSubtitle); // prettier-ignore
  const dishDescriptionChange = (newDescription: string) => setDishDescription(newDescription); // prettier-ignore
  const dishThumbnailChange = (newThumbnail: string) => setDishThumbnail(newThumbnail); // prettier-ignore

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

  useEffect(() => {
    console.log(menuModalId);
  }, [menuModalId]);

  useEffect(() => {
    console.log(dishes);
  }, [dishes, dishTitle]);

  // Clear the menu modal when it is closed
  useEffect(() => {
    if (menuModalVisibility === false) {
      setMenuModalId("");
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
    setMenuModalId(uuidv4());
    setMenuModalDate(date);
    setMenuModalStartTime(startTime);
    setMenuModalVisibility(true);
    setMenuModalSource("hourCell");
  };

  const cardButtonToggle = (menu: Menu): void => {
    setMenuModalId(menu.menu_id);
    setMenuModalTitle(menu.menu_title);
    setMenuModalLocation(menu.menu_location);
    setMenuModalDate(menu.menu_date);
    setMenuModalStartTime(menu.menu_start_time);
    setMenuModalEndTime(menu.menu_end_time);
    setOriginalMenuData(menu);
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

  const menuModalCreate = async () => {
    if (menuModalSource === "cardButton" && originalMenuData) {
      const hasChanges =
        menuModalTitle !== originalMenuData.menu_title ||
        menuModalLocation !== originalMenuData.menu_location ||
        menuModalDate !== originalMenuData.menu_date ||
        menuModalStartTime !== originalMenuData.menu_start_time ||
        menuModalEndTime !== originalMenuData.menu_end_time;
      if (hasChanges) {
        try {
          const { data: menuData, error: menuError } = await supabase
            .from("menus")
            .update({
              menu_title: menuModalTitle,
              menu_location: menuModalLocation,
              menu_date: menuModalDate,
              menu_start_time: menuModalStartTime,
              menu_end_time: menuModalEndTime,
            })
            .match({ menu_id: menuModalId });
          toast.success("Menu updated!");
          setMenuModalVisibility(false);
        } catch (error) {
          toast.error("Error updating menu!");
        }
      } else {
        toast.info("No changes to save!");
      }
    }

    if (menuModalSource === "hourCell") {
      const hasChanges =
        menuModalId !== "" &&
        menuModalTitle !== "" &&
        menuModalLocation !== "" &&
        menuModalDate !== "" &&
        menuModalStartTime !== "" &&
        menuModalEndTime !== "";
      if (hasChanges) {
        try {
          const { data: menuData, error: menuError } = await supabase
            .from("menus")
            .insert([
              {
                menu_id: menuModalId,
                menu_title: menuModalTitle,
                menu_location: menuModalLocation,
                menu_date: menuModalDate,
                menu_start_time: menuModalStartTime,
                menu_end_time: menuModalEndTime,
              },
            ]);
          toast.success("Menu created!");
          if (dishes.length > 0) {
            try {
              const { data: dishesData, error: dishesError } = await supabase
                .from("dishes")
                .insert(
                  dishes.map((dish) => ({
                    dish_id: dish.dish_id,
                    menu_id: menuModalId,
                    dish_title: dish.dish_title,
                    dish_subtitle: dish.dish_subtitle,
                    dish_description: dish.dish_description,
                    dish_thumbnail: dish.dish_thumbnail,
                  })),
                );
              toast.success("Dishes created!");
              setMenuModalVisibility(false);
            } catch (error) {
              toast.error("Error creating dishes!");
            }
          } else {
            setMenuModalVisibility(false);
          }
        } catch (error) {
          toast.error("Error creating menu!");
        }
      } else {
        toast.info("No data to save!");
      }
    }
  };

  const menuModalDelete = async () => {
    if (menuModalSource === "cardButton") {
      try {
        const { error } = await supabase
          .from("menus")
          .delete()
          .match({ menu_id: menuModalId });
        toast.success("Menu deleted!");
        setMenuModalVisibility(false);
      } catch (error) {
        toast.error("Error deleting menu!");
      }
    }
  };

  const dishCreate = () => {
    const newDish: Dish = {
      dish_id: Date.now(),
      menu_id: menuModalId,
      dish_title: "",
      dish_subtitle: "",
      dish_description: "",
      dish_thumbnail: "",
    };
    setDishes([...dishes, newDish]);
  };

  const dishUpdate = (dishId: number, dishFields: Dish) => {
    setDishes(
      dishes.map((dish) => {
        return dish.dish_id === dishId ? { ...dish, ...dishFields } : dish;
      }),
    );
  };

  return {
    menus,
    dishes,
    menuModalTitle,
    menuModalLocation,
    menuModalDate,
    menuModalStartTime,
    menuModalEndTime,
    menuModalTitleChange,
    menuModalLocationChange,
    menuModalDateChange,
    menuModalStartTimeChange,
    menuModalEndTimeChange,
    menuModalVisibility,
    setMenuModalVisibility,
    menuModalCreate,
    menuModalDelete,
    dishCreate,
    dishUpdate,
    dayCellHighlight,
    hourCellToggle,
    cardButtonToggle,
    cardButtonPosition,
    cardButtonHeight,
  };
};

export default useCalendar;
