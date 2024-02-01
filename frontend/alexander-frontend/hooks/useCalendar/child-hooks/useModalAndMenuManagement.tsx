import { v4 as uuidv4 } from "uuid";

const useModalAndMenuManagement = (
  setModalVisibility,
  setMenuSource,
  setMenuId,
  setTitle,
  setLocation,
  setDate,
  setStartTime,
  setEndTime,
  filterDishesByMenuId,
) => {
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

  return {
    initializeNewMenu,
    prepareMenuForEditing,
    hideModal,
  };
};

export default useModalAndMenuManagement;
