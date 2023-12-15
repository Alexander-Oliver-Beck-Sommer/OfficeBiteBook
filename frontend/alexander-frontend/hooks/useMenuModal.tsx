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
  const [dishTitle, setDishTitle] = useState("");
  const onDishTitleChange = (newDishTitle) => setDishTitle(newDishTitle);
  const [dishSubtitle, setDishSubtitle] = useState("");
  const onDishSubtitleChange = (newDishSubtitle) =>
    setDishSubtitle(newDishSubtitle);
  const [dishDescription, setDishDescription] = useState("");
  const onDishDescriptionChange = (newDishDescription) =>
    setDishDescription(newDishDescription);
  const [dishThumbnail, setDishThumbnail] = useState("");
  const onDishThumbnailChange = (newDishThumbnail) =>
    setDishThumbnail(newDishThumbnail);
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
    const newDish = {
      id: Date.now(),
      title: "",
      subtitle: "",
      description: "",
      thumbnail: "",
    };
    setDishes([...dishes, newDish]);
  };

  const updateDish = (dishId, updatedFields) => {
    setDishes(
      dishes.map((dish) => {
        return dish.id === dishId ? { ...dish, ...updatedFields } : dish;
      }),
    );
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
    if (!validateMenu()) {
      return;
    }

    try {
      // Insert the menu
      const { data: menuData, error: menuError } = await supabase
        .from("menus")
        .insert([
          {
            menu_title: menuTitle,
            menu_location: menuLocation,
            menu_date: menuDate,
            menu_start_time: menuStartTime,
            menu_end_time: menuEndTime,
          },
        ])
        .select();

      if (menuError) throw menuError;

      // An automatic UUID is generated from supabase. We want to use it to associate the dishes with the menu.
      const menuId = menuData[0].menu_id;

      const dishInsertPromises = dishes.map((dish) => {
        return supabase.from("dishes").insert([
          {
            menu_id: menuId,
            dish_title: dish.title,
            dish_subtitle: dish.subtitle,
            dish_description: dish.description,
            dish_thumbnail: dish.thumbnail,
          },
        ]);
      });

      // Wait for all dish inserts to complete
      const results = await Promise.all(dishInsertPromises);
      results.forEach((result) => {
        if (result.error) throw result.error;
      });

      toast.success("Changes saved and inserted into the database");
      toggle();
    } catch (error) {
      toast.error("Error saving menu: " + error.message);
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
    dishTitle,
    onDishTitleChange,
    dishSubtitle,
    onDishSubtitleChange,
    dishDescription,
    onDishDescriptionChange,
    dishThumbnail,
    onDishThumbnailChange,
    dishes,
    clearAllDishes,
    createDish,
    deleteDish,
    toggleDish,
    expandedDish,
    validationState,
    cancelMenu,
    acceptMenu,
    updateDish,
  };
};

export default useMenuModal;
