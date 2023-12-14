import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

const useMenuModal = (initialDate, initialStartTime, visible, toggle) => {
  const [dishes, setDishes] = useState([]);
  const [menuTitle, setMenuTitle] = useState("");
  const [menuLocation, setMenuLocation] = useState("");
  const [menuDate, setMenuDate] = useState(initialDate);
  const [menuStartTime, setMenuStartTime] = useState(initialStartTime);
  const [menuEndTime, setMenuEndTime] = useState("");
  const scrollToTop = useRef(null);
  const [expandedDish, setExpandedDish] = useState(null);

  useEffect(() => {
    setMenuDate(initialDate);
    setMenuStartTime(initialStartTime);
    if (!visible && scrollToTop.current) {
      scrollToTop.current.scrollTop = 0;
    }
  }, [visible, initialDate, initialStartTime]);

  const createDish = () => {
    const newDish = { id: Date.now() };
    setDishes([...dishes, newDish]);
  };

  const deleteDish = (dishId) => {
    setDishes(dishes.filter((dish) => dish.id !== dishId));
  };

  const clearAllDishes = () => {
    if (dishes.length === 0) {
      toast.warn("No dishes to remove");
    } else if (
      window.confirm(
        "Are you sure you want to remove all dishes? All changes will be lost.",
      )
    ) {
      toast.success("All dishes removed");
      setDishes([]);
    }
  };

  const toggleDish = (dishId) => {
    if (expandedDish === dishId) {
      setExpandedDish(null);
    } else {
      setExpandedDish(dishId);
    }
  };

  const cancelMenu = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost.",
      )
    ) {
      toast.warn("Menu scrapped");
      toggle();
    }
  };

  const onTitleChange = (newTitle) => setMenuTitle(newTitle);
  const onLocationChange = (newLocation) => setMenuLocation(newLocation);
  const onDateChange = (newDate) => setMenuDate(newDate);
  const onStartTimeChange = (newStartTime) => setMenuStartTime(newStartTime);
  const onEndTimeChange = (newEndTime) => setMenuEndTime(newEndTime);

  return {
    dishes,
    menuTitle,
    menuLocation,
    menuDate,
    menuStartTime,
    menuEndTime,
    createDish,
    clearAllDishes,
    deleteDish,
    onTitleChange,
    onLocationChange,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange,
    scrollToTop,
    cancelMenu,
    expandedDish,
    toggleDish,
  };
};

export default useMenuModal;
