import { useEffect } from "react";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuSettings from "@/components/Modals/MenuModal/MenuSettings/MenuSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import FooterBar from "@/components/Modals/MenuModal/FooterBar/FooterBar";

type MenuModalProps = {
  modalVisibility?: boolean;
  hideModal?: () => void;
  saveMenuChanges?: () => void;
  title?: string;
  setTitle?: (newTitle: string) => void;
  location?: string;
  setLocation?: (newLocation: string) => void;
  date?: string;
  setDate?: (newDate: string) => void;
  startTime?: string;
  setStartTime?: (newStartTime: string) => void;
  endTime?: string;
  setEndTime?: (newEndTime: string) => void;
  addNewDishToMenu?: () => void;
  dishes?: [];
  modifyExistingDish?: (dishId: string, dish: {}) => void;
  removeDishFromMenu?: (dishId: string) => void;
  removeMenu?: () => void;
  eraseDishesFromMenu?: () => void;
  menuId?: string;
};

const MenuModal = ({
  modalVisibility = false,
  hideModal = () => {},
  saveMenuChanges = () => {},
  title = "",
  setTitle = () => {},
  location = "",
  setLocation = () => {},
  date = "",
  setDate = () => {},
  startTime = "",
  setStartTime = () => {},
  endTime = "",
  setEndTime = () => {},
  addNewDishToMenu = () => {},
  dishes = [],
  modifyExistingDish = () => {},
  removeDishFromMenu = () => {},
  removeMenu = () => {},
  eraseDishesFromMenu = () => {},
  menuId = "",
}: MenuModalProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (modalVisibility) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [modalVisibility]);

  return (
    <section
      aria-hidden={!modalVisibility}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        modalVisibility ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      <div className="relative flex h-full w-full items-center justify-center px-10 py-10 lg:px-12 lg:py-12">
        <section
          className="absolute inset-0 z-40 cursor-pointer bg-dark-100 opacity-95 transition-all duration-300 ease-in-out hover:bg-dark-200"
          onClick={hideModal}
        ></section>
        <section
          className={`relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 border-dark-500 bg-dark-100 ${
            modalVisibility
              ? "animate-fade-up animate-ease-in-out"
              : "invisible opacity-0"
          } `}
        >
          <HeaderBar
            title={title}
            eraseDishesFromMenu={eraseDishesFromMenu}
            addNewDishToMenu={addNewDishToMenu}
            removeMenu={removeMenu}
          />
          <section className="grid grid-cols-30X70">
            <MenuSettings
              title={title}
              setTitle={setTitle}
              location={location}
              setLocation={setLocation}
              date={date}
              setDate={setDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
            <div className="pattern relative overflow-scroll">
              <ul className="absolute inset-0 flex flex-col gap-8 px-8 py-8">
                {dishes.map((dish, index) => (
                  <Dish
                    key={dish.dish_id}
                    menuId={menuId}
                    count={index + 1}
                    title={dish.dish_title}
                    setTitle={(newTitle) =>
                      modifyExistingDish(dish.dish_id, {
                        dish_title: newTitle,
                      })
                    }
                    subtitle={dish.dish_subtitle}
                    setSubtitle={(newSubtitle) =>
                      modifyExistingDish(dish.dish_id, {
                        dish_subtitle: newSubtitle,
                      })
                    }
                    description={dish.dish_description}
                    setDescription={(newDescription) =>
                      modifyExistingDish(dish.dish_id, {
                        dish_description: newDescription,
                      })
                    }
                    name={dish.dish_thumbnail_name}
                    setName={(newName) =>
                      modifyExistingDish(dish.dish_id, {
                        dish_thumbnail_name: newName,
                      })
                    }
                    file={dish.dish_thumbnail_file}
                    setFile={(newFile) =>
                      modifyExistingDish(dish.dish_id, {
                        dish_thumbnail_file: newFile,
                      })
                    }
                    url={dish.dish_thumbnail_url}
                    setUrl={(newUrl) =>
                      modifyExistingDish(dish.dish_id, {
                        dish_thumbnail_url: newUrl,
                      })
                    }
                    removeDishFromMenu={() => removeDishFromMenu(dish.dish_id)}
                  />
                ))}
              </ul>
            </div>
          </section>
          <FooterBar hideModal={hideModal} saveMenuChanges={saveMenuChanges} />
        </section>
      </div>
    </section>
  );
};

export default MenuModal;
