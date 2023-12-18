import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/components/Supabase/supabaseClient";

type Dish = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
};

type UpdatedDishFields = {
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
};

const useMenuModal = (
  initialDate: string,
  initialStartTime: string,
  menuVisible: boolean,
  toggle: () => void,
) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [expandedDish, setExpandedDish] = useState<number | null>(null);
  const [menuTitle, setMenuTitle] = useState("");
  const onTitleChange = (newTitle: string) => setMenuTitle(newTitle);
  const [menuLocation, setMenuLocation] = useState("");
  const onLocationChange = (newLocation: string) =>
    setMenuLocation(newLocation);
  const [menuDate, setMenuDate] = useState(initialDate);
  const onDateChange = (newDate: string) => setMenuDate(newDate);
  const [menuStartTime, setMenuStartTime] = useState(initialStartTime);
  const onStartTimeChange = (newStartTime: string) =>
    setMenuStartTime(newStartTime);
  const [menuEndTime, setMenuEndTime] = useState("");
  const onEndTimeChange = (newEndTime: string) => setMenuEndTime(newEndTime);
  const [dishTitle, setDishTitle] = useState("");
  const onDishTitleChange = (newDishTitle: string) =>
    setDishTitle(newDishTitle);
  const [dishSubtitle, setDishSubtitle] = useState("");
  const onDishSubtitleChange = (newDishSubtitle: string) =>
    setDishSubtitle(newDishSubtitle);
  const [dishDescription, setDishDescription] = useState("");
  const onDishDescriptionChange = (newDishDescription: string) =>
    setDishDescription(newDishDescription);
  const [dishThumbnail, setDishThumbnail] = useState("");
  const onDishThumbnailChange = (newDishThumbnail: string) =>
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
    const newDish: Dish = {
      id: Date.now(),
      title: "",
      subtitle: "",
      description: "",
      thumbnail: "",
    };
    setDishes([...dishes, newDish]);
  };

  const updateDish = (dishId: number, updatedFields: UpdatedDishFields) => {
    setDishes(
      dishes.map((dish) => {
        return dish.id === dishId ? { ...dish, ...updatedFields } : dish;
      }),
    );
  };

  // Function to delete dishes individually.
  const deleteDish = (dishId: number) => {
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

  const toggleDish = (dishId: number) => {
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

    type ValidationKeys = keyof typeof validation;
    type FieldValidation = {
      key: ValidationKeys;
      message: string;
    };

    const fieldsToValidate: FieldValidation[] = [
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
      resetForm();
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
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error saving menu: " + error.message);
      } else {
        // Handle cases where error might not be an instance of Error
        toast.error("Error saving menu: An unexpected error occurred");
      }
    }
  };

  // Function to reset all fields
  const resetForm = () => {
    setMenuTitle("");
    setMenuLocation("");
    setMenuDate(initialDate);
    setMenuStartTime(initialStartTime);
    setMenuEndTime("");
    setDishes([]);
    setValidationState({
      title: true,
      location: true,
      date: true,
      startTime: true,
      endTime: true,
    });
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
