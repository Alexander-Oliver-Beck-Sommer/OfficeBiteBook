import { useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import useStates from "@/hooks/useCalendar/child-hooks/useStates";
import useBucket from "@/hooks/useBucket";
import useModalAndMenuManagement from "@/hooks/useCalendar/child-hooks/useModalAndMenuManagement";
import useDataFetchingAndStateInitialization from "@/hooks/useCalendar/child-hooks/useDataFetchingAndStateInitialization";
import useDishManagement from "@/hooks/useCalendar/child-hooks/useDishManagement";
import useDataSavingUpdatingAndDeleting from "@/hooks/useCalendar/child-hooks/useDataSavingUpdatingAndDeleting";
import useUICalculations from "@/hooks/useCalendar/child-hooks/useUICalculations";

const useCalendar = (userId) => {
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
  } = useStates();

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

  // Logic and functions for bucket management
  const { uploadFile, getFileUrl, deleteFile, updateFile, loading, error } =
    useBucket();

  // Logic and functions for dish management
  const {
    addNewDishToMenu,
    modifyExistingDish,
    removeDishFromMenu,
    eraseDishesFromMenu,
    filterDishesByMenuId,
  } = useDishManagement(
    uuidv4,
    dishes,
    setDishes,
    menuId,
    menuSource,
    setDishesToRemove,
    fetchedDishes,
  );

  // Logic and functions for modal and menu management
  const { initializeNewMenu, prepareMenuForEditing, hideModal } =
    useModalAndMenuManagement(
      setModalVisibility,
      setMenuSource,
      setMenuId,
      setTitle,
      setLocation,
      setDate,
      setStartTime,
      setEndTime,
      filterDishesByMenuId,
    );

  // Logic and functions for data saving, updating and deleting
  const {
    saveNewDishesToDatabase,
    saveOrUpdateDishes,
    saveMenuChanges,
    removeMenu,
  } = useDataSavingUpdatingAndDeleting(
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
  );

  // Logic and functions for data fetching and state initialization
  const { loadUserMenusAndDishes, initializeStates } =
    useDataFetchingAndStateInitialization(
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
    );

  // Logic and functions for UI calculations
  const { calculateCardButtonPosition, calculateCardButtonHeight } =
    useUICalculations(startTime, endTime);

  useEffect(() => {
    if (modalVisibility === false) {
      loadUserMenusAndDishes();
      initializeStates();
    }
  }, [modalVisibility]);

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
    menuId,
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

export default useCalendar;

// Dirty Bug Report ಠ╭╮ಠ 🪳
// 1?. Create menu with dishes => edit menu => add new dish => delete enitre menu => error will occur due to the new added dish - although funnily enough, both the menu and the dish will be deleted from the database...
// 2. Create menu => edit menu => add new dish => erase all dishes => error will occur due to the new added dish
// 3. Create menu => edit menu => add multiple dishes => delete one dish => erase other dishes => one dish will still remain although all dishes should be deleted with the eraseDishesFromMenu function...
