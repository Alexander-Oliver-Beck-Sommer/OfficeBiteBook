import { useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import useCalendarStates from "@/hooks/useCalendar/child-hooks/useCalendarStates"; // Contains all states and their setters

const useCalendarSystem = (userId) => {
  const {
    menuSource,
    setMenuSource,
    generatedMenuUUID,
    setGeneratedMenuUUID,
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
  } = useCalendarStates();

  const filterRetrievedDishes = (menuId: string) => {
    const filteredDishes = fetchedDishes.filter((dish) =>
      dish.menus_id.includes(menuId),
    );
    setDishes(filteredDishes);
  };

  useEffect(() => {
    if (modalVisibility === false) {
      const fetchMenusAndDishes = async () => {
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
      fetchMenusAndDishes();
      setGeneratedMenuUUID(uuidv4());
      setMenuId("");
      setTitle("");
      setLocation("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setDishes([]);
      setMenuSource("");
    }
  }, [modalVisibility]);

  useEffect(() => {
    console.log(dishes);
  }, [dishes]);

  const createMenu = (newStartTime: string, newDate: string) => {
    setModalVisibility(true);
    setMenuSource("create");
    setStartTime(newStartTime);
    setDate(newDate);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const createDish = () => {
    const associatedMenuId =
      menuSource === "create" ? generatedMenuUUID : menuId;
    const newDish = {
      dish_id: uuidv4(),
      menus_id: [associatedMenuId],
      dish_title: "",
      dish_subtitle: "",
      dish_description: "",
      dish_thumbnail: "",
    };

    // 2. Update the dishes state to include the new dish
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  const updateDish = (dishId: string, dishData) => {
    setDishes(
      dishes.map((dish) => {
        return dish.dish_id === dishId ? { ...dish, ...dishData } : dish;
      }),
    );
  };

  const cardButtonPosition = (startTime: string): number => {
    const baseTime = new Date();
    baseTime.setHours(8, 0, 0);

    const menuTime = new Date();
    const [hours, minutes] = startTime.split(":");
    menuTime.setHours(parseInt(hours), parseInt(minutes), 0);

    return ((menuTime - baseTime) / (1000 * 60 * 30)) * 40;
  };

  // Calculate the height of the <CardButton/> and have it span until its ending time
  const cardButtonHeight = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0);

    return ((endDate - startDate) / (1000 * 60 * 30)) * 40;
  };

  const uploadDishes = async () => {
    if (dishes.length === 0) {
      // No dishes to upload, so we can return early
      return;
    }

    // Prepare dishes data for bulk insert
    const dishesToUpload = dishes.map((dish) => ({
      ...dish,
      menus_id: [generatedMenuUUID], // Assuming each dish is tied to the current menu
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

  const upsertDishes = async () => {
    if (dishes.length === 0) {
      console.log("No dishes to upsert.");
      return;
    }

    // Prepare dishes data for upsert
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

  const uploadMenu = async () => {
    if (menuSource === "create") {
      // 1. Let's define our new menu and what it should look like
      const newMenu = {
        menu_id: generatedMenuUUID,
        user_id: userId,
        menu_title: title,
        menu_location: location,
        menu_date: date,
        menu_start_time: startTime,
        menu_end_time: endTime,
      };

      // 2. Let's upload that sucker to the database
      try {
        const { error: menuError } = await supabase
          .from("menus")
          .insert(newMenu);

        // 2.5. A fault occurred? Throw an error in the user's face
        if (menuError) {
          throw menuError;
        }
        console.log("Menu uploaded successfully");

        // 3. If menu upload is successful, then upload dishes
        await uploadDishes();

        // 4. Close the modal and make the calendar ready for a new potential menu
        closeModal();
      } catch (error) {
        console.error("The uploadMenu function failed:", error);
      }
    } else if (menuSource === "update") {
      try {
        const { error: menuError } = await supabase
          .from("menus")
          .update({
            menu_title: title,
            menu_location: location,
            menu_date: date,
            menu_start_time: startTime,
            menu_end_time: endTime,
          })
          .eq("menu_id", menuId)
          .select();

        if (menuError) {
          throw menuError;
          console.log("Failed to update menu");
        }

        await upsertDishes();

        closeModal();
      } catch (error) {
        console.error("The uploadMenu function failed:", error);
      }
    }
  };

  const updateMenu = (cardButton) => {
    setModalVisibility(true);
    setMenuSource("update");
    setMenuId(cardButton.menu_id);
    setTitle(cardButton.menu_title);
    setLocation(cardButton.menu_location);
    setDate(cardButton.menu_date);
    setStartTime(cardButton.menu_start_time);
    setEndTime(cardButton.menu_end_time);
    filterRetrievedDishes(cardButton.menu_id);
  };

  return {
    updateMenu,
    updateDish,
    createDish,
    uploadMenu,
    modalVisibility,
    closeModal,
    createMenu,
    menus,
    setMenus,
    fetchedMenus,
    dishes,
    fetchedDishes,
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
    cardButtonPosition,
    cardButtonHeight,
  };
};

export default useCalendarSystem;
