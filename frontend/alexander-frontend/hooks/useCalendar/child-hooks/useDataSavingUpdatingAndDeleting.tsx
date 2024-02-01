const useDataSavingUpdatingAndDeleting = (
  dishes,
  menuId,
  userId,
  title,
  location,
  startTime,
  endTime,
  menuSource,
  supabase,
  date,
  getWeekNumber,
  uploadFile,
  getFileUrl,
  hideModal,
  dishesToRemove,
) => {
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
        if (dishes.length > 0) {
          for (let i = 0; i < dishes.length; i++) {
            const dish = dishes[i];
            if (dish.dish_thumbnail_file) {
              const bucket = "dishes_thumbnails"; // Specify your bucket name
              const path = `${dish.dish_id}/${dish.dish_id}`; // Customize the path as needed
              const file = dish.dish_thumbnail_file; // The File object for upload
              const uploadResult = await uploadFile(bucket, path, file);
              const publicUrl = await getFileUrl(bucket, path);
              dishes[i] = { ...dish, dish_thumbnail_url: publicUrl };
            }
          }
        }

        const { error: menuError } = await supabase
          .from("menus")
          .insert(newMenu);

        if (menuError) {
          throw menuError;
        }

        // Proceed with dish uploads or updates
        await saveNewDishesToDatabase(); // This function should handle the updated dishes array

        hideModal();
      } catch (error) {
        console.error("The saveMenuChanges function failed:", error);
      }
    } else if (menuSource === "updateExistingMenu") {
      try {
        if (dishes.length > 0) {
          for (let i = 0; i < dishes.length; i++) {
            const dish = dishes[i];
            if (dish.dish_thumbnail_file) {
              const bucket = "dishes_thumbnails"; // Specify your bucket name
              const path = `${dish.dish_id}/${dish.dish_id}`; // Customize the path as needed
              const file = dish.dish_thumbnail_file; // The File object for upload
              const uploadResult = await uploadFile(bucket, path, file);
              const publicUrl = await getFileUrl(bucket, path);
              dishes[i] = { ...dish, dish_thumbnail_url: publicUrl };
            }
          }
        }

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

  return {
    saveNewDishesToDatabase,
    saveOrUpdateDishes,
    saveMenuChanges,
    removeMenu,
  };
};

export default useDataSavingUpdatingAndDeleting;
