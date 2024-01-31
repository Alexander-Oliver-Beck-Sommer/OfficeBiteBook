import { supabase } from "@/components/Supabase/supabaseClient";
import { useEffect, useState } from "react";

const useHome = (userId, userEmail) => {
  const [weekNumber, setWeekNumber] = useState(0);
  const [menusAndDishes, setMenusAndDishes] = useState([]);
  const [accordionId, setAccordionId] = useState(null);
  const [checkedMenus, setCheckedMenus] = useState([]);
  const [areAllMenusChecked, setAreAllMenusChecked] = useState(false);

  const fetchDishesForMenu = async (menuId) => {
    const { data: dishesData, error: dishesError } = await supabase
      .from("dishes")
      .select("*")
      .eq("menu_id", menuId);

    if (dishesError) {
      console.error("Error fetching dishes:", dishesError);
      return;
    }

    const dishesWithThumbnails = await Promise.all(
      dishesData.map(async (dish) => {
        if (dish.dish_thumbnail_value) {
          const { data: thumbnailData, error: thumbnailError } =
            supabase.storage
              .from("dishes_thumbnails")
              .getPublicUrl(dish.dish_thumbnail_value);

          if (thumbnailError) {
            console.error("Error fetching dish thumbnail:", thumbnailError);
            return dish;
          }

          return { ...dish, dish_thumbnail: thumbnailData.publicUrl };
        } else {
          return dish;
        }
      }),
    );

    return dishesWithThumbnails;
  };

  useEffect(() => {
    const calculateWeekNumber = () => {
      const currentDate = new Date();
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const pastDaysOfYear = Math.floor(
        (currentDate - startOfYear) / (24 * 60 * 60 * 1000),
      );
      return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    const fetchMenusData = async () => {
      try {
        const calculatedWeekNumber = calculateWeekNumber();
        const { data: menusData, error } = await supabase
          .from("menus")
          .select("*")
          .eq("menu_week", calculatedWeekNumber);

        if (error) {
          throw error;
        }

        const combinedMenusAndDishes = await Promise.all(
          menusData.map(async (menu) => {
            const dishes = await fetchDishesForMenu(menu.menu_id);
            return { ...menu, dishes, checked: false };
          }),
        );

        setMenusAndDishes(combinedMenusAndDishes);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    if (userId && userEmail) {
      setWeekNumber(calculateWeekNumber());
      fetchMenusData();
    }
  }, [userId, userEmail]);

  useEffect(() => {
    console.log(menusAndDishes);
  }, [areAllMenusChecked]);

  const handleAccordion = (menuId) => {
    setAccordionId(accordionId === menuId ? null : menuId);
  };

  const checkAll = () => {
    setAreAllMenusChecked(!areAllMenusChecked);
    const updatedMenus = menusAndDishes.map((menu) => ({
      ...menu,
      checked: areAllMenusChecked ? false : true,
    }));

    setMenusAndDishes(updatedMenus);
  };

  const checkIndividual = (menuId) => {
    const updatedMenus = menusAndDishes.map((menu) => {
      if (menu.menu_id === menuId) {
        return { ...menu, checked: !menu.checked };
      } else {
        return menu;
      }
    });

    setMenusAndDishes(updatedMenus);
  };

  return {
    weekNumber,
    menusAndDishes,
    handleAccordion,
    accordionId,
    checkAll,
    checkIndividual,
  };
};

export default useHome;
