import { useEffect } from "react";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuSettings from "@/components/Modals/MenuModal/MenuSettings/MenuSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import FooterBar from "@/components/Modals/MenuModal/FooterBar/FooterBar";

type MenuModalProps = {
  title: string;
  changeTitle: string;
  isTitleValid: boolean;
  location: string;
  changeLocation: string;
  isLocationValid: boolean;
  date: string;
  changeDate: string;
  isDateValid: boolean;
  startTime: string;
  changeStartTime: string;
  isStartTimeValid: boolean;
  endTime: string;
  changeEndTime: string;
  isEndTimeValid: boolean;
  visibility: boolean;
  cancelToggle: () => void;
  dishes: [];
};

const MenuModal = ({
  title = "",
  changeTitle = () => {},
  isTitleValid = false,
  location = "",
  changeLocation = () => {},
  isLocationValid = false,
  date = "",
  changeDate = () => {},
  isDateValid = false,
  startTime = "",
  changeStartTime = () => {},
  isStartTimeValid = false,
  endTime = "",
  changeEndTime = () => {},
  isEndTimeValid = false,
  visibility = false,
  createToggle = () => {},
  createDish = () => {},
  updateDish = () => {},
  eraseDishes = () => {},
  isEraseDishesDisabled = false,
  deleteDish = () => {},
  deleteToggle = () => {},
  isDeleteDisabled = false,
  cancelToggle = () => {},
  dishes = [],
}: MenuModalProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (visibility) {
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
  }, [visibility]);

  return (
    <section
      aria-hidden={!visibility}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      <div className="relative flex h-full w-full items-center justify-center px-10 py-10 lg:px-12 lg:py-12">
        <section
          className="absolute inset-0 z-40 cursor-pointer bg-dark-100 opacity-95 transition-all duration-300 ease-in-out hover:bg-dark-200"
          onClick={cancelToggle}
        ></section>
        <section
          className={`relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 border-dark-500 bg-dark-100 ${
            visibility
              ? "animate-fade-up animate-ease-in-out"
              : "invisible opacity-0"
          } `}
        >
          <HeaderBar
            title={title}
            createDish={createDish}
            eraseDishes={eraseDishes}
            isEraseDishesDisabled={isEraseDishesDisabled}
            deleteToggle={deleteToggle}
            isDeleteDisabled={isDeleteDisabled}
          />
          <section className="grid grid-cols-30X70">
            <MenuSettings
              title={title}
              changeTitle={changeTitle}
              isTitleValid={isTitleValid}
              location={location}
              changeLocation={changeLocation}
              isLocationValid={isLocationValid}
              date={date}
              changeDate={changeDate}
              isDateValid={isDateValid}
              startTime={startTime}
              changeStartTime={changeStartTime}
              isStartTimeValid={isStartTimeValid}
              endTime={endTime}
              changeEndTime={changeEndTime}
              isEndTimeValid={isEndTimeValid}
            />
            <div className="pattern relative overflow-scroll">
              <ul className="absolute inset-0 flex flex-col gap-8 px-8 py-8">
                {dishes.map((dish) => (
                  <Dish
                    key={dish.dish_id}
                    count={dishes.indexOf(dish) + 1}
                    title={dish.dish_title}
                    changeTitle={(newTitle) =>
                      updateDish(dish.dish_id, {
                        dish_title: newTitle,
                      })
                    }
                    subtitle={dish.dish_subtitle}
                    changeSubtitle={(newSubtitle) =>
                      updateDish(dish.dish_id, {
                        dish_subtitle: newSubtitle,
                      })
                    }
                    description={dish.dish_description}
                    changeDescription={(newDescription) =>
                      updateDish(dish.dish_id, {
                        dish_description: newDescription,
                      })
                    }
                    thumbnailValue={dish.dish_thumbnail_value}
                    changeThumbnailValue={(newValue) => {
                      console.log(newValue);
                      updateDish(dish.dish_id, {
                        dish_thumbnail_value: newValue,
                      });
                    }}
                    thumbnailFile={dish.dish_thumbnail_file}
                    changeThumbnailFile={(newFile) =>
                      updateDish(dish.dish_id, {
                        dish_thumbnail_file: newFile,
                      })
                    }
                    thumbnailURL={dish.dish_thumbnail_url}
                    changeThumbnailURL={(newUrl) =>
                      updateDish(dish.dish_id, {
                        dish_thumbnail_url: newUrl,
                      })
                    }
                    deleteDish={() => deleteDish(dish.dish_id)}
                  />
                ))}
              </ul>
            </div>
          </section>
          <FooterBar cancelToggle={cancelToggle} createToggle={createToggle} />
        </section>
      </div>
    </section>
  );
};

export default MenuModal;
