import { useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import useCalendarStates from "@/hooks/useCalendar/child-hooks/useCalendarStates";

const useCalendarSystem = (userId) => {
  const {
    menuSource,
    setMenuSource,
    menus,
    setMenus,
    fetchedMenus,
    setFetchedMenus,
    dishes,
    setDishes,
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
    dishesToRemove,
    setDishesToRemove,
  } = useCalendarStates();

  ///////////// Modal and Menu Management /////////////
  const initializeNewMenu = (newStartTime: string, newDate: string) => {
    setModalVisibility(true);
    setMenuSource("saveNewMenu");
    setMenuId(uuidv4());
    setStartTime(newStartTime);
    setDate(newDate);
  };

  const prepareMenuForEditing = (cardButton) => {
    setModalVisibility(true);
    setMenuSource("updateExistingMenu");
    setMenuId(cardButton.menu_id);
    setTitle(cardButton.menu_title);
    setLocation(cardButton.menu_location);
    setDate(cardButton.menu_date);
    setStartTime(cardButton.menu_start_time);
    setEndTime(cardButton.menu_end_time);
    filterDishesByMenuId(cardButton.menu_id);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };

  ///////////// Data Fetching and State Initialization /////////////
  useEffect(() => {
    if (modalVisibility === false) {
      const loadUserMenusAndDishes = async () => {
        try {
          const { data: menusData, error: menusError } = await supabase
            .from("menus")
            .select("*")
            .eq("user_id", userId);

          if (menusError) {
            throw menusError;
            console.error("Error fetching menus:", menusError);
          }

          setFetchedMenus(menusData);

          const { data: dishesData, error: dishesError } = await supabase
            .from("dishes")
            .select("*");

          if (dishesError) {
            throw dishesError;
            console.error("Error fetching dishes:", dishesError);
          }

          const connectedDishes = dishesData.filter((dish) =>
            dish.menus_id.some((menuId) =>
              menusData.some((menu) => menu.menu_id === menuId),
            ),
          );

          setFetchedDishes(connectedDishes);
        } catch (error) {
          console.error("Error fetching menus and dishes:", error);
        }
      };
      loadUserMenusAndDishes();
      setMenuId("");
      setTitle("");
      setLocation("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setDishes([]);
      setDishesToRemove([]);
      setMenuSource("");
    }
  }, [modalVisibility]);

  ///////////// Dish Management /////////////
  const addNewDishToMenu = () => {
    const newDish = {
      dish_id: uuidv4(),
      menus_id: [menuId],
      dish_title: "",
      dish_subtitle: "",
      dish_description: "",
      dish_thumbnail: "",
    };

    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  const modifyExistingDish = (dishId: string, dishData) => {
    setDishes(
      dishes.map((dish) => {
        return dish.dish_id === dishId ? { ...dish, ...dishData } : dish;
      }),
    );
  };

  const filterDishesByMenuId = (menuId: string) => {
    const filteredDishes = fetchedDishes.filter((dish) =>
      dish.menus_id.includes(menuId),
    );
    setDishes(filteredDishes);
  };

  const removeDishFromMenu = (dishId: string) => {
    if (menuSource === "updateExistingMenu") {
      setDishesToRemove((prev) => [...prev, dishId]);
    }

    const updatedDishes = dishes.filter((dish) => dish.dish_id !== dishId);
    setDishes(updatedDishes);
  };

  const eraseDishesFromMenu = () => {
    if (menuSource === "updateExistingMenu") {
      const dishIdsToRemove = dishes.map((dish) => dish.dish_id);
      setDishesToRemove(dishIdsToRemove);
    }
    setDishes([]);
  };

  ///////////// Data Saving, Updating & Deleting /////////////
  const saveNewDishesToDatabase = async () => {
    if (dishes.length === 0) {
      return;
    }

    const dishesToUpload = dishes.map((dish) => ({
      ...dish,
      menus_id: [menuId],
    }));

    try {
      const { error } = await supabase.from("dishes").insert(dishesToUpload);

      if (error) {
        throw error;
      }
      console.log("Dishes uploaded successfully");
    } catch (error) {
      console.error("Error uploading dishes to Supabase:", error);
    }
  };

  const saveOrUpdateDishes = async () => {
    if (dishes.length === 0) {
      console.log("No dishes to upsert.");
      return;
    }

    const dishesToUpsert = dishes.map((dish) => ({
      ...dish,
      menus_id: dish.menus_id.includes(menuId)
        ? dish.menus_id
        : [...dish.menus_id, menuId],
    }));

    try {
      const { error } = await supabase.from("dishes").upsert(dishesToUpsert);

      if (error) {
        throw error;
      }
      console.log("Dishes upserted successfully");
    } catch (error) {
      console.error("Error upserting dishes to Supabase:", error);
    }
  };

  const saveMenuChanges = async () => {
    const [year, week] = getWeekNumber(date);
    if (menuSource === "saveNewMenu") {
      const newMenu = {
        menu_id: menuId,
        user_id: userId,
        menu_title: title,
        menu_location: location,
        menu_date: date,
        menu_start_time: startTime,
        menu_end_time: endTime,
        menu_week: week,
        menu_dishes_amount: dishes.length,
      };

      try {
        const { error: menuError } = await supabase
          .from("menus")
          .insert(newMenu);

        if (menuError) {
          throw menuError;
        }
        console.log("Menu uploaded successfully");

        await saveNewDishesToDatabase();

        hideModal();
      } catch (error) {
        console.error("The saveMenuChanges function failed:", error);
      }
    } else if (menuSource === "updateExistingMenu") {
      try {
        const { error: menuError } = await supabase
          .from("menus")
          .update({
            menu_title: title,
            menu_location: location,
            menu_date: date,
            menu_start_time: startTime,
            menu_end_time: endTime,
            menu_week: week,
            menu_dishes_amount: dishes.length,
          })
          .eq("menu_id", menuId)
          .select();

        if (menuError) {
          throw menuError;
          console.log("Failed to update menu");
        }

        await saveOrUpdateDishes();

        await Promise.all(
          dishesToRemove.map((dishId) =>
            supabase.from("dishes").delete().eq("dish_id", dishId),
          ),
        );

        hideModal();
      } catch (error) {
        console.error("Error in saveMenuChanges:", error);
      }
    }
  };

  const removeMenu = async () => {
    if (menuSource === "updateExistingMenu") {
      try {
        // Delete the menu
        const { error: menuError } = await supabase
          .from("menus")
          .delete()
          .eq("menu_id", menuId);

        if (menuError) {
          throw menuError;
        }

        // Check and delete associated dishes
        for (const dish of dishes) {
          // Check if the dish exists in the database
          const { data, error } = await supabase
            .from("dishes")
            .select("*")
            .eq("dish_id", dish.dish_id)
            .single();

          if (error) {
            throw error;
          }

          if (data) {
            // Dish exists in the database, delete it
            const { error: dishDeleteError } = await supabase
              .from("dishes")
              .delete()
              .eq("dish_id", dish.dish_id);

            if (dishDeleteError) {
              throw dishDeleteError;
            }
          }
        }

        hideModal();
      } catch (error) {
        console.error("Error in removeMenu:", error);
      }
    } else if (menuSource === "saveNewMenu") {
      hideModal();
    }
  };

  ///////////// UI Calculations /////////////
  const calculateCardButtonPosition = (startTime: string): number => {
    const baseTime = new Date();
    baseTime.setHours(8, 0, 0);

    const menuTime = new Date();
    const [hours, minutes] = startTime.split(":");
    menuTime.setHours(parseInt(hours), parseInt(minutes), 0);

    return ((menuTime - baseTime) / (1000 * 60 * 30)) * 40;
  };

  const calculateCardButtonHeight = (
    startTime: string,
    endTime: string,
  ): number => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0);

    return ((endDate - startDate) / (1000 * 60 * 30)) * 40;
  };

  ///////////// Utility Functions /////////////
  const getWeekNumber = (date) => {
    const currentDate = typeof date === "string" ? new Date(date) : date;

    currentDate.setDate(
      currentDate.getDate() + 4 - (currentDate.getDay() || 7),
    );

    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);

    return [currentDate.getFullYear(), weekNo];
  };

  return {
    prepareMenuForEditing,
    modifyExistingDish,
    addNewDishToMenu,
    saveMenuChanges,
    modalVisibility,
    hideModal,
    initializeNewMenu,
    menus,
    fetchedMenus,
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
    removeDishFromMenu,
    removeMenu,
    eraseDishesFromMenu,
  };
};

export default useCalendarSystem;

// Dirty Bug Report ಠ╭╮ಠ 🪳
// 1?. Create menu with dishes => edit menu => add new dish => delete enitre menu => error will occur due to the new added dish - although funnily enough, both the menu and the dish will be deleted from the database...
// 2. Create menu => edit menu => add new dish => erase all dishes => error will occur due to the new added dish
// 3. Create menu => edit menu => add multiple dishes => delete one dish => erase other dishes => one dish will still remain although all dishes should be deleted with the eraseDishesFromMenu function...
