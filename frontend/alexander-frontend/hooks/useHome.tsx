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
    menusAndDishes.forEach((menu) => {
      if (menu.checked) {
        addParticipant(menu.menu_id, userId);
      } else {
        removeParticipant(menu.menu_id, userId);
      }
    });
  }, [menusAndDishes]);

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

  const addParticipant = async (menuId, userId) => {
    try {
      const { data, error } = await supabase
        .from("menus")
        .select("menu_participants")
        .eq("menu_id", menuId)
        .single();

      if (error) throw error;

      const currentParticipants = data.menu_participants || [];
      if (!currentParticipants.includes(userId)) {
        const updatedParticipants = [...currentParticipants, userId];

        await supabase
          .from("menus")
          .update({ menu_participants: updatedParticipants })
          .eq("menu_id", menuId);
      }
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  const removeParticipant = async (menuId, userId) => {
    try {
      const { data, error } = await supabase
        .from("menus")
        .select("menu_participants")
        .eq("menu_id", menuId)
        .single();

      if (error) throw error;

      const updatedParticipants = data.menu_participants.filter(
        (id) => id !== userId,
      );

      await supabase
        .from("menus")
        .update({ menu_participants: updatedParticipants })
        .eq("menu_id", menuId);
    } catch (error) {
      console.error("Error removing participant:", error);
    }
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
