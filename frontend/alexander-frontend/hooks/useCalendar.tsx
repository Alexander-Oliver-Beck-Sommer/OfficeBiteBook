////////////////////////////////////////////////////////////////
//                                                            ||
//                                                            ||
//   This hook is used to maintain all functionality for:     ||
//               Calendar.tsx & MenuModal.tsx                 ||
//                                                            ||
//                                                            ||
////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type Menu = {
  menu_id: string;
  menu_title: string;
  menu_location: string;
  menu_date: string;
  menu_start_time: string;
  menu_end_time: string;
  menu_dishes_amount: number;
};

type Dish = {
  dish_id: number;
  menu_id: string;
  dish_title: string;
  dish_subtitle: string;
  dish_description: string;
  dish_thumbnail: string;
  dish_saved: boolean;
};

const useCalendar = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [originalMenuData, setOriginalMenuData] = useState<Menu[]>([]); // Copy of the original menu to compare changes with
  const [originalDishes, setOriginalDishes] = useState<Dish[]>([]); // Copy of the original dishes to compare changes with
  const [menuModalId, setMenuModalId] = useState(""); // Used to identify the menu - will always be an UUID
  const [menuModalTitle, setMenuModalTitle] = useState("");
  const [menuModalLocation, setMenuModalLocation] = useState("");
  const [menuModalDate, setMenuModalDate] = useState("");
  const [menuModalStartTime, setMenuModalStartTime] = useState("");
  const [menuModalEndTime, setMenuModalEndTime] = useState("");
  const [menuModalTitleValid, setMenuModalTitleValid] = useState(false);
  const [menuModalLocationValid, setMenuModalLocationValid] = useState(false);
  const [menuModalDateValid, setMenuModalDateValid] = useState(false);
  const [menuModalStartTimeValid, setMenuModalStartTimeValid] = useState(false);
  const [menuModalEndTimeValid, setMenuModalEndTimeValid] = useState(false);
  const [menuModalDishesAmount, setMenuModalDishesAmount] = useState(0); // Amount of dishes in the menu - used to display the amount of dishes in the <CardButton/> component
  const [menuModalVisibility, setMenuModalVisibility] = useState(false); // When the modals visibility is set to false, all data from within the menu is erased
  const [menuModalSource, setMenuModalSource] = useState(""); // Have the MenuModal component perform different actions based on the source of the modal
  const [menuModalDeleteDisabled, setMenuModalDeleteDisabled] = useState(true); // Disable the delete button if the menu is new and has no dishes
  const [dishesEraseDisabled, setDishesEraseDisabled] = useState(true); // Disable the erase button if there are no dishes to erase
  const menuModalTitleChange = (newTitle: string) => setMenuModalTitle(newTitle); // prettier-ignore
  const menuModalLocationChange = (newLocation: string) => setMenuModalLocation(newLocation); // prettier-ignore
  const menuModalDateChange = (newDate: string) => setMenuModalDate(newDate); // prettier-ignore
  const menuModalStartTimeChange = (newStartTime: string) => setMenuModalStartTime(newStartTime); // prettier-ignore
  const menuModalEndTimeChange = (newEndTime: string) => setMenuModalEndTime(newEndTime); // prettier-ignore

  // Render all existing menus as cardButtons on the calendar - updated content will be
  useEffect(() => {
    if (!menuModalVisibility) {
      const fetchMenusAndDishes = async () => {
        try {
          let { data: menusData, error: menusError } = await supabase
            .from("menus")
            .select("*");
          if (menusError) throw menusError;

          const menusWithDishes = await Promise.all(
            menusData.map(async (menu) => {
              let { data: dishesData, error: dishesError } = await supabase
                .from("dishes")
                .select("*")
                .eq("menu_id", menu.menu_id);

              if (dishesError) throw dishesError;

              return { ...menu, dishes: dishesData };
            }),
          );

          setMenus(menusWithDishes);
        } catch (error) {
          console.error("Error fetching menus and dishes:", error);
        }
      };

      fetchMenusAndDishes();
    }
  }, [menuModalVisibility]);

  // Disable the erase button if there are no dishes to erase
  useEffect(() => {
    if (dishes.length > 0) {
      setDishesEraseDisabled(false);
    } else {
      setDishesEraseDisabled(true);
    }
  }, [dishes]);

  useEffect(() => {
    setMenuModalDishesAmount(dishes.length);
  }, [dishes]);

  // Disable the delete button if the menu is and not already saved
  useEffect(() => {
    if (menuModalSource === "hourCell") {
      setMenuModalDeleteDisabled(true);
    } else {
      setMenuModalDeleteDisabled(false);
    }
  }, [menuModalSource]);

  // Erase entered values and validation states for the menu modal when closed again
  useEffect(() => {
    if (menuModalVisibility === false) {
      setMenuModalId("");
      setMenuModalTitle("");
      setMenuModalLocation("");
      setMenuModalDate("");
      setMenuModalStartTime("");
      setMenuModalEndTime("");
      setMenuModalSource("");
      setMenuModalTitleValid(false);
      setMenuModalLocationValid(false);
      setMenuModalDateValid(false);
      setMenuModalStartTimeValid(false);
      setMenuModalEndTimeValid(false);
      setMenuModalDishesAmount(0);
      setOriginalMenuData(null);
      setDishes([]);
      setOriginalDishes([]);
    }
  }, [menuModalVisibility]);

  // Highlight the current day in the calendar
  const dayCellHighlight = (date: Date): boolean => {
    const currentDay = new Date();
    return (
      date.getDate() === currentDay.getDate() &&
      date.getMonth() === currentDay.getMonth() &&
      date.getFullYear() === currentDay.getFullYear()
    );
  };

  // Events that will be triggered when clicking on a <HourCell/> component
  const hourCellToggle = (startTime: string, date: string): void => {
    const newMenuId = uuidv4();
    setMenuModalId(newMenuId);
    setMenuModalDate(date);
    setMenuModalStartTime(startTime);
    setMenuModalVisibility(true);
    setMenuModalSource("hourCell");
    setOriginalMenuData({
      menu_id: newMenuId,
      menu_title: "",
      menu_location: "",
      menu_date: date,
      menu_start_time: startTime,
      menu_end_time: "",
      menu_dishes_amount: 0,
    });
  };

  // Events that will be triggered when clicking on a <CardButton/> component
  const cardButtonToggle = (menu: Menu): void => {
    setMenuModalId(menu.menu_id);
    setMenuModalTitle(menu.menu_title);
    setMenuModalLocation(menu.menu_location);
    setMenuModalDate(menu.menu_date);
    setMenuModalStartTime(menu.menu_start_time);
    setMenuModalEndTime(menu.menu_end_time);
    setMenuModalDishesAmount(menu.menu_dishes_amount);
    setOriginalMenuData(menu);
    setMenuModalVisibility(true);
    setMenuModalSource("cardButton");
    setDishes(menu.dishes);
    setOriginalDishes(menu.dishes);
  };

  // Calculate the position of the <CardButton/> at the top of its starting time
  const cardButtonPosition = (startTime: string): number => {
    const baseTime = new Date();
    baseTime.setHours(8, 0, 0);

    const menuTime = new Date();
    const [hours, minutes] = startTime.split(":");
    menuTime.setHours(parseInt(hours), parseInt(minutes), 0);

    return ((menuTime - baseTime) / (1000 * 60 * 30)) * 48;
  };

  // Calculate the height of the <CardButton/> and have it span until its ending time
  const cardButtonHeight = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0);

    return ((endDate - startDate) / (1000 * 60 * 30)) * 48;
  };

  // Validate the menu modal and provide feedback if there are any errors - this function is executed and if the menuValidState is equal to false, the menuModalCreate function will be cancelled
  const menuModalValidate = () => {
    let menuValidState = true;
    const startTime = new Date(`01/01/2000 ${menuModalStartTime}`);
    const endTime = new Date(`01/01/2000 ${menuModalEndTime}`);

    if (menuModalTitle.trim() === "") {
      setMenuModalTitleValid(true);
      toast.error("Title required");
      menuValidState = false;
    } else {
      setMenuModalTitleValid(false);
    }

    if (menuModalLocation.trim() === "") {
      setMenuModalLocationValid(true);
      toast.error("Location required");
      menuValidState = false;
    } else {
      setMenuModalLocationValid(false);
    }

    if (menuModalDate === "") {
      setMenuModalDateValid(true);
      toast.error("Date required");
      menuValidState = false;
    } else {
      setMenuModalDateValid(false);
    }

    if (menuModalStartTime === "") {
      setMenuModalStartTimeValid(true);
      toast.error("Start time required");
      menuValidState = false;
    } else {
      setMenuModalStartTimeValid(false);
    }

    if (menuModalEndTime === "") {
      setMenuModalEndTimeValid(true);
      toast.error("End time required");
      menuValidState = false;
    } else if (endTime && startTime && endTime <= startTime) {
      setMenuModalEndTimeValid(true);
      toast.error("End time must be after start time");
      menuValidState = false;
    } else if (endTime && startTime && endTime - startTime < 30 * 60 * 1000) {
      setMenuModalEndTimeValid(true);
      toast.error("Menu must be at least 30 minutes long");
      menuValidState = false;
    } else {
      setMenuModalEndTimeValid(false);
    }

    return menuValidState;
  };

  // Create a new or update an existing menu - depending on the source of the modal
  const menuModalCreate = async () => {
    // Cancel the rest of the function if the menu is not valid and contains unfilled fields
    const menuModalValidity = menuModalValidate();
    if (menuModalValidity === false) return;

    if (menuModalSource === "cardButton" && originalMenuData) {
      const hasMenuChanges =
        menuModalTitle.trim() !== originalMenuData.menu_title ||
        menuModalLocation.trim() !== originalMenuData.menu_location ||
        menuModalDate !== originalMenuData.menu_date ||
        menuModalStartTime !== originalMenuData.menu_start_time ||
        menuModalEndTime !== originalMenuData.menu_end_time ||
        menuModalDishesAmount !== originalMenuData.menu_dishes_amount;

      const newDishes = dishes.filter((dish) => !dish.dish_saved);
      const hasNewDishes = newDishes.length > 0;

      if (hasMenuChanges) {
        try {
          const { data: menuData, error: menuError } = await supabase
            .from("menus")
            .update({
              menu_title: menuModalTitle,
              menu_location: menuModalLocation,
              menu_date: menuModalDate,
              menu_start_time: menuModalStartTime,
              menu_end_time: menuModalEndTime,
              menu_dishes_amount: menuModalDishesAmount,
            })
            .match({ menu_id: menuModalId });
          if (menuError) throw menuError;
          toast.success("Menu updated!");
        } catch (error) {
          toast.error("Error updating menu!");
        }
      }

      // Add new dishes if there are any
      if (hasNewDishes) {
        try {
          const { data: dishesData, error: dishesError } = await supabase
            .from("dishes")
            .insert(newDishes.map((dish) => ({ ...dish, dish_saved: true })));
          if (dishesError) throw dishesError;
          toast.success("New dishes added!");
        } catch (error) {
          toast.error("Error adding new dishes!");
        }
      }

      const originalDishesMap = new Map(
        originalDishes.map((dish) => [dish.dish_id, dish]),
      );

      const updatedDishes = dishes
        .filter((dish) => dish.dish_saved)
        .filter((dish) => {
          const originalDish = originalDishesMap.get(dish.dish_id);
          return (
            originalDish &&
            (dish.dish_title !== originalDish.dish_title ||
              dish.dish_subtitle !== originalDish.dish_subtitle ||
              dish.dish_description !== originalDish.dish_description ||
              dish.dish_thumbnail !== originalDish.dish_thumbnail)
          );
        });

      // Update changed dishes
      if (updatedDishes.length > 0) {
        try {
          const { data: updatedData, error: updateError } = await supabase
            .from("dishes")
            .upsert(updatedDishes);
          if (updateError) throw updateError;
          toast.success("Dishes updated successfully!");
        } catch (error) {
          toast.error("Error updating dishes: " + error.message);
        }
      }

      // Provide feedback based on what actions were performed
      if (!hasMenuChanges && !hasNewDishes && updatedDishes.length === 0) {
        toast.info("No changes to be found!");
      } else {
        setMenuModalVisibility(false);
      }
    }

    if (menuModalSource === "hourCell") {
      const hasChanges =
        menuModalId !== "" &&
        menuModalTitle.trim() !== "" &&
        menuModalLocation.trim() !== "" &&
        menuModalDate !== "" &&
        menuModalStartTime !== "" &&
        menuModalEndTime !== "";
      if (hasChanges) {
        try {
          const { data: menuData, error: menuError } = await supabase
            .from("menus")
            .insert([
              {
                menu_id: menuModalId,
                menu_title: menuModalTitle,
                menu_location: menuModalLocation,
                menu_date: menuModalDate,
                menu_start_time: menuModalStartTime,
                menu_end_time: menuModalEndTime,
                menu_dishes_amount: menuModalDishesAmount,
              },
            ]);
          if (dishes.length > 0) {
            try {
              const { data: dishesData, error: dishesError } = await supabase
                .from("dishes")
                .insert(
                  dishes.map((dish) => ({
                    dish_id: dish.dish_id,
                    menu_id: menuModalId,
                    dish_title: dish.dish_title,
                    dish_subtitle: dish.dish_subtitle,
                    dish_description: dish.dish_description,
                    dish_thumbnail: dish.dish_thumbnail,
                    dish_saved: true,
                  })),
                );
              toast.success("Menu created!!");
              setMenuModalVisibility(false);
            } catch (error) {
              toast.error("Error creating dishes!");
            }
          } else {
            setMenuModalVisibility(false);
            toast.success("Menu created!");
          }
        } catch (error) {
          toast.error("Error creating menu!");
        }
      } else {
        toast.info("No data to save!");
      }
    }
  };

  // Have the user confirm if they want to cancel their changes, and do so if they do
  const menuModalCancel = () => {
    const hasMenuChanges =
      originalMenuData &&
      (menuModalTitle.trim() !== originalMenuData.menu_title ||
        menuModalLocation.trim() !== originalMenuData.menu_location ||
        menuModalDate !== originalMenuData.menu_date ||
        menuModalStartTime !== originalMenuData.menu_start_time ||
        menuModalEndTime !== originalMenuData.menu_end_time ||
        menuModalDishesAmount !== originalMenuData.menu_dishes_amount);

    const hasNewDishes = dishes.some((dish) => !dish.dish_saved);

    if (hasMenuChanges || hasNewDishes) {
      if (
        window.confirm(
          "Are you sure you want to cancel? All changes will be lost!",
        )
      ) {
        setMenuModalVisibility(false);
      }
    } else {
      setMenuModalVisibility(false);
    }
  };

  // Delete the menu and all its dishes - only available when editing an existing menu
  const menuModalDelete = async () => {
    if (menuModalSource === "cardButton") {
      try {
        const { error: menuError } = await supabase
          .from("menus")
          .delete()
          .match({ menu_id: menuModalId });

        if (menuError) {
          throw menuError;
        }

        const { error: dishesError } = await supabase
          .from("dishes")
          .delete()
          .match({ menu_id: menuModalId });

        if (dishesError) {
          throw dishesError;
        }

        toast.success("Menu and dishes deleted!");
        setMenuModalVisibility(false);
      } catch (error) {
        toast.error("Error deleting menu and dishes!");
      }
    }
  };

  // Add a new dish to the menu - new dishes can be identified by their dish_saved. TRUE = SAVED, FALSE = NEW
  const dishCreate = () => {
    const newDish: Dish = {
      dish_id: Date.now(),
      menu_id: menuModalId,
      dish_title: "",
      dish_subtitle: "",
      dish_description: "",
      dish_thumbnail: "",
      dish_saved: false,
    };
    setDishes([...dishes, newDish]);
  };

  // Functionality to keep track of the newest data added or removed from individual dishes
  const dishUpdate = (dishId: number, dishFields: Dish) => {
    setDishes(
      dishes.map((dish) => {
        return dish.dish_id === dishId ? { ...dish, ...dishFields } : dish;
      }),
    );
  };

  // Erase all dishes from the menu - only available when editing an existing menu
  const dishesErase = async () => {
    if (
      window.confirm(
        "Are you sure you want to erase all dishes? This action cannot be undone!",
      )
    ) {
      setDishes([]);

      if (menuModalSource === "cardButton") {
        try {
          const { error: dishesError } = await supabase
            .from("dishes")
            .delete()
            .match({ menu_id: menuModalId });

          if (dishesError) {
            throw dishesError;
          }

          toast.success("Dishes erased!");
        } catch (dishesError) {
          toast.error("Error erasing dishes!");
        }

        try {
          const { error: menusError } = await supabase
            .from("menus")
            .update({ menu_dishes_amount: 0 })
            .match({ menu_id: menuModalId });

          if (menusError) {
            throw menusError;
          }
        } catch (menusError) {
          console.log("Error resetting menu_dishes_amount:", menusError);
        }
      }
    }
  };

  // Have our dish be removed from the dishes array, as well as from the database
  const dishDelete = async (dishId: number) => {
    const updatedDishes = dishes.filter((dish) => dish.dish_id !== dishId);
    setDishes(updatedDishes);

    if (menuModalSource === "cardButton") {
      try {
        const { error: dishesError } = await supabase
          .from("dishes")
          .delete()
          .match({ dish_id: dishId });

        if (dishesError) {
          throw dishesError;
        }

        toast.success("Dish deleted successfully!");
      } catch (dishesError) {
        toast.error("Error deleting dish!");
      }

      try {
        const { error: menusError } = await supabase
          .from("menus")
          .update({ menu_dishes_amount: updatedDishes.length })
          .match({ menu_id: menuModalId });

        if (menusError) {
          throw menusError;
        }
      } catch (menusError) {
        console.log("Error decreasing menu_dishes_amount:", menusError);
      }
    }
  };

  return {
    menus,
    dishes,
    menuModalTitle,
    menuModalTitleValid,
    menuModalLocation,
    menuModalLocationValid,
    menuModalDate,
    menuModalDateValid,
    menuModalStartTime,
    menuModalStartTimeValid,
    menuModalEndTime,
    menuModalEndTimeValid,
    menuModalTitleChange,
    menuModalLocationChange,
    menuModalDateChange,
    menuModalStartTimeChange,
    menuModalEndTimeChange,
    menuModalVisibility,
    menuModalCreate,
    menuModalCancel,
    menuModalDelete,
    menuModalDeleteDisabled,
    dishCreate,
    dishUpdate,
    dishesErase,
    dishesEraseDisabled,
    dishDelete,
    dayCellHighlight,
    hourCellToggle,
    cardButtonToggle,
    cardButtonPosition,
    cardButtonHeight,
  };
};

export default useCalendar;
