import { useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import useCalendarStates from "@/hooks/useCalendar/child-hooks/useCalendarStates"; // Contains all states and their setters

const useCalendarSystem = (userId) => {
  const {
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

  useEffect(() => {
    // 1. If the modal is closed, we want to fetch menus and dishes
    if (modalVisibility === false) {
      const fetchMenusAndDishes = async () => {
        try {
          // 2. Lets fetch menus that are tied to our user
          const { data: menusData, error: menusError } = await supabase
            .from("menus")
            .select("*")
            .eq("user_id", userId);

          // 2.5. Something f*cked up? Throw an error
          if (menusError) {
            throw menusError;
            console.error("Error fetching menus:", menusError);
          }

          // 3. Save that priceless data
          setFetchedMenus(menusData);

          // 4. Let's fetch dishes that are tied to our menus now
          const { data: dishesData, error: dishesError } = await supabase
            .from("dishes")
            .select("*");

          // 4.5. Something screwed up? Throw an error
          if (dishesError) {
            throw dishesError;
            console.error("Error fetching dishes:", dishesError);
          }

          // 5. Lets filter and only grab dishes that are tied to our menus
          const connectedDishes = dishesData.filter((dish) =>
            dish.menus_id.some((menuId) =>
              menusData.some((menu) => menu.menu_id === menuId),
            ),
          );

          // 6. Save that bloody nice data
          setFetchedDishes(connectedDishes);

          // 0. Let's scream in united misery if our operation completely failed
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
    }
  }, [modalVisibility]);

  useEffect(() => {
    console.log(dishes);
  }, [dishes]);

  const createMenu = (newStartTime: string, newDate: string) => {
    setModalVisibility(true);
    setStartTime(newStartTime);
    setDate(newDate);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const createDish = () => {
    // 1. Create the new dish object with a random dish_id and the current generatedMenuUUID in menus_id
    const newDish = {
      dish_id: uuidv4(),
      menus_id: [generatedMenuUUID],
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

  const uploadMenu = async () => {
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
      const { error: menuError } = await supabase.from("menus").insert(newMenu);

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
  };

  return {
    updateDish,
    createDish,
    uploadMenu,
    modalVisibility,
    closeModal,
    createMenu,
    menus,
    setMenus,
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
  };
};

export default useCalendarSystem;
