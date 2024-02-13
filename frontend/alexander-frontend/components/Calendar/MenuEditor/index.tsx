import ContentModal from "@/components/ContentModal";
import Details from "./Details";
import Dish from "./Dish";
import TextButton from "@/components/TextButton";
import useUtilities from "@/hooks/useUtilities";
import DishProps from "@/types/DishProps";
import useDish from "./Dish/useDish";

type MenuEditorProps = {
  visibility?: boolean;
  loading?: boolean;
  closeToggle?: () => void;
  saveToggle?: () => void;
  // Details Fields:
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
  // Dishes:
  dishes?: DishProps[];
  modifyExistingDish?: (dishId: string, dish: {}) => void;
  removeDishFromMenu?: (dishId: string) => void;
  removeMenu?: () => void;
  eraseDishesFromMenu?: () => void;
  menuId?: string;
};

const MenuEditor = ({
  visibility = false,
  loading = false,
  closeToggle = () => {},
  saveToggle = () => {},
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
}: MenuEditorProps) => {
  const { disableBodyScroll, handleAccordion, accordionId } = useUtilities();
  disableBodyScroll(visibility);

  return (
    <ContentModal
      visibility={visibility}
      loading={loading}
      title={title}
      toggle={closeToggle}
      showAddDishButton={true}
      addDishToggle={addNewDishToMenu}
      showDeleteButton={true}
      deleteToggle={removeMenu}
      showEraseButton={true}
      eraseToggle={eraseDishesFromMenu}
    >
      <div className="grid flex-1 grid-rows-1xauto">
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
              {dishes.map((dish, index) => {
                const {
                  dish_id: id,
                  dish_title,
                  dish_subtitle,
                  dish_description,
                  dish_thumbnail_name,
                  dish_thumbnail_file,
                  dish_thumbnail_url,
                  dish_recipe,
                } = dish;

                return (
                  <Dish
                    key={id}
                    menuId={menuId}
                    count={index + 1}
                    title={dish_title}
                    setTitle={(newTitle) =>
                      modifyExistingDish(id, { dish_title: newTitle })
                    }
                    subtitle={dish_subtitle}
                    setSubtitle={(newSubtitle) =>
                      modifyExistingDish(id, { dish_subtitle: newSubtitle })
                    }
                    description={dish_description}
                    setDescription={(newDescription) =>
                      modifyExistingDish(id, {
                        dish_description: newDescription,
                      })
                    }
                    name={dish_thumbnail_name}
                    setName={(newName) =>
                      modifyExistingDish(id, { dish_thumbnail_name: newName })
                    }
                    file={dish_thumbnail_file}
                    setFile={(newFile) =>
                      modifyExistingDish(id, { dish_thumbnail_file: newFile })
                    }
                    url={dish_thumbnail_url}
                    setUrl={(newUrl) =>
                      modifyExistingDish(id, { dish_thumbnail_url: newUrl })
                    }
                    removeToggle={() => removeDishFromMenu(id)}
                    recipe={dish_recipe}
                    setRecipe={(newRecipe) =>
                      modifyExistingDish(id, { dish_recipe: newRecipe })
                    }
                    accordionState={accordionId === id}
                    handleAccordion={() =>
                      handleAccordion(accordionId === id ? null : id)
                    }
                  />
                );
              })}
            </ul>
          </div>
        </div>
        <footer className="flex items-center justify-end gap-5 bg-dark-300 p-5 md:px-10">
          <TextButton
            color="red"
            text="Cancel"
            label="Cancel menu"
            title="Cancel menu"
            icon="close"
            toggle={closeToggle}
          />
          <TextButton
            text="Save"
            label="Save menu"
            title="Save menu"
            icon="save"
            toggle={saveToggle}
          />
        </footer>
      </div>
    </ContentModal>
  );
};

export default MenuEditor;
