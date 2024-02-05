const useDishManagement = (
  uuidv4,
  dishes,
  setDishes,
  menuId,
  menuSource,
  setDishesToRemove,
  fetchedDishes,
) => {
  const addNewDishToMenu = () => {
    const newDish = {
      dish_id: uuidv4(),
      menus_id: [menuId],
      dish_title: "",
      dish_subtitle: "",
      dish_description: "",
      dish_thumbnail_url: "",
      dish_recipe: "",
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

  const filterDishesByMenuId = (menuId: string) => {
    const filteredDishes = fetchedDishes.filter((dish) =>
      dish.menus_id.includes(menuId),
    );
    setDishes(filteredDishes);
  };

  return {
    addNewDishToMenu,
    modifyExistingDish,
    removeDishFromMenu,
    eraseDishesFromMenu,
    filterDishesByMenuId,
  };
};

export default useDishManagement;
