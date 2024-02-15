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
      user_id: userId,
      menu_id: [menuId],
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
    loadDishes(menu.menu_id);
  };

  const loadDishes = async (menuId: string) => {
    const fetchedDishes = await getDishesFromMenu(menuId);
    setDishes(fetchedDishes);
  };

  const saveMenu = async () => {
    setLoading(true);

    const dishIds = dishes.map((dish) => dish.dish_id);

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
        dishes: dishIds,
      };
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
        dishes: dishIds,
      };
      await uploadDishes();
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
    const forms = document.querySelectorAll("form");

    for (const [index, form] of Array.from(forms).entries()) {
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

      for (const field of fields) {
        const inputId = `dish-${formCount}-${field}`;
        const inputElement = form.querySelector(`#${inputId}`);
        if (inputElement) {
          if (inputElement.type === "file") {
            console.log("File found.");

            const file = inputElement.files[0];
            if (file) {
              dishData[field] = file;
              console.log("File:", file);
              await uploadFile(
                "dishes_thumbnails",
                `${menuId}/${dishId}.${file.type.split("/")[1]}`,
                file,
              );
            } else {
              dishData[field] = null;
            }
          } else {
            dishData[field] = inputElement.value;
          }
        } else {
          console.warn(`Input with ID ${inputId} not found.`);
        }
      }

      const mimeType = dishData.thumbnail.type;
      const extension = mimeType.split("/")[1];

      const thumbnailFile = `${menuId}/${dishId}.${extension}`;

      const newDish = {
        dish_id: dishId,
        user_id: userId,
        menu_id: [menuId],
        title: dishData.title,
        subtitle: dishData.subtitle,
        description: dishData.description,
        thumbnail_url: await getFileUrl("dishes_thumbnails", thumbnailFile),
        recipe: dishData.recipe,
      };

      await insertDish(newDish);
    }
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
  };
};

export default useMenuCreator;
