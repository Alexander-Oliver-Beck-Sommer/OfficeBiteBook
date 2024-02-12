import { useState } from "react";
import Details from "./Details";
import Dish from "./Dish";
import useUtilities from "@/hooks/useUtilities";
import ContentModal from "@/components/ContentModal";
import TextButton from "@/components/TextButton";

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
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const { disableBodyScroll } = useUtilities();
  disableBodyScroll(modalVisibility);

  const handleAccordionToggle = (id) => {
    if (openAccordionId === id) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(id);
    }
  };

  return (
    <ContentModal
      visibility={modalVisibility}
      title={title}
      toggle={hideModal}
      showAddDishButton={true}
      addDishToggle={addNewDishToMenu}
      showDeleteButton={true}
      deleteToggle={removeMenu}
      showEraseButton={true}
      eraseToggle={eraseDishesFromMenu}
    >
      <section className="grid flex-1 grid-rows-1xauto">
        <div className="grid grid-cols-30X70">
          <Details
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
          <div className="relative overflow-hidden">
            <ul className="absolute inset-0 flex flex-col gap-5 overflow-y-scroll px-10 py-5">
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
                  recipe={dish.dish_recipe}
                  setRecipe={(newRecipe) =>
                    modifyExistingDish(dish.dish_id, {
                      dish_recipe: newRecipe,
                    })
                  }
                  accordionState={openAccordionId === dish.dish_id}
                  handleAccordion={() => handleAccordionToggle(dish.dish_id)}
                />
              ))}
            </ul>
          </div>
        </div>
        <footer className="flex items-center justify-end gap-5 bg-dark-300 p-5 md:px-10">
          <TextButton
            text="Cancel"
            label="Cancel menu"
            title="Cancel menu"
            icon="close"
            toggle={hideModal}
          />
          <TextButton
            text="Save"
            label="Save menu"
            title="Save menu"
            icon="save"
            toggle={saveMenuChanges}
          />
        </footer>
      </section>
    </ContentModal>
  );
};

export default MenuModal;
