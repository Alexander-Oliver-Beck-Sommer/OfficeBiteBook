const useDataFetchingAndStateInitialization = (
  supabase,
  userId,
  setMenuId,
  setTitle,
  setLocation,
  setDate,
  setStartTime,
  setEndTime,
  setDishes,
  setDishesToRemove,
  setMenuSource,
  setFetchedMenus,
  setFetchedDishes,
) => {
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

  const initializeStates = () => {
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
  };

  return {
    loadUserMenusAndDishes,
    initializeStates,
  };
};

export default useDataFetchingAndStateInitialization;
