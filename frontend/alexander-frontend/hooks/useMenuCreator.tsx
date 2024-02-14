import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useMenus from "./useMenus";
import useDateCalculator from "./useDateCalculator";
import useUtilities from "./useUtilities";
import useDishes from "./useDishes";
import useBucket from "./useBucket";
import { MenuProps } from "@/types/MenuProps";
import { DishProps } from "@/types/DishProps";
import { title } from "process";

type MenuSource = "create" | "edit" | "";

const useMenuCreator = (userId: string) => {
  // States:
  const [menuSource, setMenuSource] = useState<MenuSource>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<string>("");
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [dishes, setDishes] = useState<DishProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  // Hooks:
  const { uploadMenu, getMenusFromUser, updateMenu } = useMenus();
  const {
    getCurrentWeekNumber,
    getWeekNumberFromDate,
    convertStringToMinutes,
  } = useDateCalculator();
  const { calculateCardButtonPosition, calculateCardButtonHeight } =
    useUtilities();
  const { getDish, getDishesFromMenu, insertDish, updateDish } = useDishes();
  const { uploadFile, getFileUrl, deleteFile, updateFile } = useBucket();

  // Utility Functions:
  const verifyMenu = () => {
    if (!title || !location || !date || !startTime || !endTime) {
      return false;
    }

    const startTimeInMinutes = convertStringToMinutes(startTime);
    const endTimeInMinutes = convertStringToMinutes(endTime);

    const isEndTimeValid = endTimeInMinutes - startTimeInMinutes >= 60;

    return isEndTimeValid;
  };

  const createMenu = (date: string, hour: string) => {
    setMenuSource("create");
    setVisibility(true);
    setMenuId(uuidv4());
    setDate(date);
    setStartTime(hour);
    setEndTime(hour);
  };

  useEffect(() => {
    console.log("Dishes:", dishes);
  }, [dishes, title]);

  const createDish = () => {
    const dish: DishProps = {
      dish_id: uuidv4(),
      menus: [menuId],
      title: "",
      subtitle: "",
      description: "",
      recipe: "",
      thumbnail_url: "",
      thumbnail_file: null,
    };

    setDishes((dishes) => [...dishes, dish]);
  };

  const deleteDish = (dishId: string) => {
    setDishes((dishes) => dishes.filter((dish) => dish.dish_id !== dishId));
  };

  const editMenu = (menu: MenuProps) => {
    setMenuSource("edit");
    setVisibility(true);
    setMenuId(menu.menu_id);
    setTitle(menu.title);
    setLocation(menu.location);
    setDate(menu.date);
    setStartTime(menu.start_time);
    setEndTime(menu.end_time);
  };

  const saveMenu = async () => {
    setLoading(true);

    if (menuSource === "create") {
      if (!verifyMenu()) {
        setLoading(false);
        console.log("Invalid menu data.");
        return;
      }

      const menu: MenuProps = {
        menu_id: menuId,
        user_id: userId,
        title: title,
        location: location,
        date: date,
        start_time: startTime,
        end_time: endTime,
        week: getCurrentWeekNumber(),
      };
      await collectDishes(); // 1 - Save all data into the dishes array.
      await uploadDishes();
      await uploadMenu(menu);
      setVisibility(false);
    }

    if (menuSource === "edit") {
      const menu: MenuProps = {
        title: title,
        location: location,
        date: date,
        start_time: startTime,
        end_time: endTime,
        week: getWeekNumberFromDate(date),
        dishes: dishes,
      };
      await updateMenu(menuId, menu);
      setVisibility(false);
    }
  };

  const closeMenu = () => {
    setVisibility(false);
  };

  const loadMenus = async () => {
    const fetchedMenus = await getMenusFromUser(userId);
    setMenus(fetchedMenus);
  };

  const uploadDishes = async () => {
    for (const dish of dishes) {
      // if (dish.thumbnail_file) {
      //   const path = `${menuId}/${dish.dish_id}.jpg`;
      //   await uploadFile("dishes_thumbnails", path, dish.thumbnail_file);
      // }
      console.log("Uploading dish:", dish);
    }
  };

  const collectDishes = async () => {
    console.log("Collecting dishes...");
    const forms = document.querySelectorAll("form");

    forms.forEach((form, index) => {
      const dishId = form.getAttribute("data-dish-id");
      const formCount = index + 1;
      const fields = [
        "title",
        "subtitle",
        "description",
        "thumbnail",
        "recipe",
      ];
      const dishData = {};

      fields.forEach((field) => {
        const inputId = `dish-${formCount}-${field}`;
        const inputElement = form.querySelector(`#${inputId}`);
        if (inputElement) {
          if (inputElement.type === "file") {
            const file = inputElement.files[0];
            if (file) {
              dishData[field] = file;
            } else {
              dishData[field] = null;
            }
          } else {
            dishData[field] = inputElement.value;
          }
        } else {
          console.warn(`Input with ID ${inputId} not found.`);
        }
      });

      const newDish = {
        dish_id: dishId || uuidv4(),
        menus: [menuId],
        title: dishData.title,
        subtitle: dishData.subtitle,
        description: dishData.description,
        thumbnail_url: "",
        thumbnail_file: dishData.thumbnail,
        recipe: dishData.recipe,
      };

      setDishes((prevDishes) => {
        const dishIndex = prevDishes.findIndex(
          (dish) => dish.dish_id === dishId,
        );
        if (dishIndex !== -1) {
          const updatedDishes = [...prevDishes];
          updatedDishes[dishIndex] = {
            ...updatedDishes[dishIndex],
            ...newDish,
          };
          return updatedDishes;
        } else {
          return [...prevDishes, newDish];
        }
      });
    });
  };

  // useEffect Hooks:
  useEffect(() => {
    console.log("Menu ID:", menuId);
    console.log("Menu Source:", menuSource);
  }, [menuId]);

  useEffect(() => {
    if (visibility === false) {
      setMenuSource("");
      loadMenus();
      setDishes([]);
      setLoading(false);
      setMenuId("");
      setTitle("");
      setLocation("");
      setDate("");
      setStartTime("");
      setEndTime("");
    }
  }, [visibility]);

  return {
    createMenu,
    createDish,
    deleteDish,
    editMenu,
    saveMenu,
    closeMenu,
    visibility,
    loading,
    menus,
    dishes,
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
    collectDishes,
  };
};

export default useMenuCreator;
