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

  const cancelMenu = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost.",
      )
    ) {
      toast.info("Menu scrapped");
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
    deleteDish,
    onTitleChange,
    onLocationChange,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange,
    scrollToTop,
    cancelMenu,
  };
};

export default useMenuModal;
