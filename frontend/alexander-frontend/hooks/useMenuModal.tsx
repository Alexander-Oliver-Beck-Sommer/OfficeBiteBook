import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/components/Supabase/supabaseClient";

const useMenuModal = (initialDate, initialStartTime, menuVisible, toggle) => {
  const [dishes, setDishes] = useState([]);
  const [expandedDish, setExpandedDish] = useState(null);
  const [menuTitle, setMenuTitle] = useState("");
  const onTitleChange = (newTitle) => setMenuTitle(newTitle);
  const [menuLocation, setMenuLocation] = useState("");
  const onLocationChange = (newLocation) => setMenuLocation(newLocation);
  const [menuDate, setMenuDate] = useState(initialDate);
  const onDateChange = (newDate) => setMenuDate(newDate);
  const [menuStartTime, setMenuStartTime] = useState(initialStartTime);
  const onStartTimeChange = (newStartTime) => setMenuStartTime(newStartTime);
  const [menuEndTime, setMenuEndTime] = useState("");
  const onEndTimeChange = (newEndTime) => setMenuEndTime(newEndTime);
  const [validationState, setValidationState] = useState({
    title: true,
    location: true,
    date: true,
    startTime: true,
    endTime: true,
  });

  useEffect(() => {
    setMenuDate(initialDate);
    setMenuStartTime(initialStartTime);
  }, [initialDate, initialStartTime]);

  // Function to create a new dish. Each dish has a unique ID.
  const createDish = () => {
    const newDish = { id: Date.now() };
    setDishes([...dishes, newDish]);
  };

  // Function to delete dishes individually.
  const deleteDish = (dishId) => {
    setDishes(dishes.filter((dish) => dish.id !== dishId));
  };

  // Function to clear (delete) all dishes from the menu.
  const clearAllDishes = () => {
    // If there are no dishes, let the user know.
    if (dishes.length === 0) {
      toast.warn("No dishes to remove");
    } else if (
      window.confirm(
        "Are you sure you want to remove all dishes? All changes will be lost.",
      )
    ) {
      toast.success("All dishes removed");
      // Clean the array of dishes.
      setDishes([]);
    }
  };

  // Function to have only dishes open and only keep one open at a time.
  const toggleDish = (dishId) => {
    if (expandedDish === dishId) {
      setExpandedDish(null);
    } else {
      setExpandedDish(dishId);
    }
  };

  // Function to validate the menu and notify the user if there any unfilled fields.
  const validateMenu = () => {
    let isValid = true;
    let validation = {
      title: !!menuTitle,
      location: !!menuLocation,
      date: !!menuDate,
      startTime: !!menuStartTime,
      endTime: !!menuEndTime,
    };

    const fieldsToValidate = [
      { key: "title", message: "Title required" },
      { key: "location", message: "Location required" },
      { key: "date", message: "Date required" },
      { key: "startTime", message: "Start time required" },
      { key: "endTime", message: "End time required" },
    ];

    fieldsToValidate.forEach((field) => {
      if (!validation[field.key]) {
        toast.error(field.message);
        isValid = false;
      }
    });

    setValidationState(validation);
    return isValid;
  };

  // Function to cancel the menu.
  // TODO: add functionality to remove entered values from the form.
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

  // Function to accept the menu and save it to the database.
  const acceptMenu = async () => {
    // Check if the menu is valid before anything else.
    if (!validateMenu()) {
      return;
    }

    // Great - if the above check passed, we can save the menu to the database.
    try {
      // We grab the table "menus" and insert our data respectively into each of the columns.
      const { error } = await supabase.from("menus").insert([
        {
          menu_title: menuTitle,
          menu_location: menuLocation,
          menu_date: menuDate,
          menu_start_time: menuStartTime,
          menu_end_time: menuEndTime,
        },
      ]);

      // Did an error occur? If so, throw it.
      if (error) {
        throw error;
      }
      // If not, let the user know the menu was saved and close the modal.
      else {
        toast.success("Menu saved");
        toggle();
      }
    } catch (error) {
      // This catch block will return if the user tries to submit a menu without any necessary data.
      toast.error("Menu couldn't be saved");
    }
  };

  return {
    menuTitle,
    onTitleChange,
    menuLocation,
    onLocationChange,
    menuDate,
    onDateChange,
    menuStartTime,
    onStartTimeChange,
    menuEndTime,
    onEndTimeChange,
    dishes,
    clearAllDishes,
    createDish,
    deleteDish,
    toggleDish,
    expandedDish,
    validationState,
    cancelMenu,
    acceptMenu,
  };
};

export default useMenuModal;
