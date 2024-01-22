"use client";
import useHome from "@/hooks/useHome";
import QuestionIcon from "@/components/Icons/QuestionIcon";
import ActionButton from "@/components/Buttons/ActionButton";
import ToggleInput from "@/components/Inputs/ToggleInput";
import DishItem from "@/components/Home/DishItem";
import ContentModal from "@/components/Modals/ContentModal/ContentModal";
import ListItem from "@/components/Modals/ContentModal/ListItem/ListItem";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const {
    menusAndDishes,
    weekNumber,
    handleMenuSelect,
    selectedMenuId,
    handleModalOpen,
    handleModalClose,
    modalContent,
    isModalOpen,
  } = useHome(userId, userEmail);

  return (
    <>
      <section className="full-height flex animate-fade-up items-stretch justify-center px-4 py-8 animate-ease-in-out md:px-12">
        <section className="flex w-full max-w-3xl flex-col gap-6">
          <div className="border-b-2 border-b-apple px-1 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-end gap-1">
                <h4 className="font-light text-cool_grey">Presenting:</h4>
                <h3>WEEK {weekNumber}</h3>
              </div>
              <button
                className="fill-apple"
                title="Open and learn more"
                aria-label="Open and learn more"
              >
                <QuestionIcon className="h-7 w-7" />
              </button>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {menusAndDishes.map((menu) => (
              <li key={menu.menu_id}>
                <div className="animate-fade-down overflow-hidden rounded border border-arsenic bg-dark_charcoal shadow-sm animate-ease-in-out">
                  <header className="grid grid-cols-autoX1 gap-4 bg-eerie_black px-3 py-3">
                    <div className="flex h-12 w-6 items-center justify-center">
                      <ToggleInput className="-rotate-90" />
                    </div>
                    <div className="grid grid-cols-autoX1 gap-4">
                      <div
                        className="flex cursor-pointer flex-col gap-1 overflow-hidden "
                        onClick={() => handleModalOpen(menu)}
                      >
                        <h4 className="truncate underline underline-offset-2">
                          {menu.menu_title}
                        </h4>
                        <h6 className="text-cool_grey underline underline-offset-2">
                          {menu.menu_date}
                        </h6>
                      </div>
                      <div className="flex items-center justify-end">
                        <ActionButton
                          variant="icon-small"
                          icon="downArrow"
                          toggle={() => handleMenuSelect(menu.menu_id)}
                        />
                      </div>
                    </div>
                  </header>
                  <section
                    className={`grid bg-raisin_black transition-all duration-300 ease-in-out ${
                      selectedMenuId === menu.menu_id
                        ? "visible grid-rows-[1fr] opacity-100"
                        : "invisible grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul>
                        {menu.dishes.map((dish) => (
                          <DishItem
                            key={dish.dish_id}
                            title={dish.dish_title}
                            subtitle={dish.dish_subtitle}
                            description={dish.dish_description}
                            thumbnail={dish.dish_thumbnail}
                            toggle={() => handleModalOpen(dish)}
                          />
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <ContentModal
        title={
          modalContent
            ? modalContent.type === "menu"
              ? `Menu Details`
              : `Dish Details`
            : `No Details`
        }
        label={
          modalContent
            ? modalContent.type === "menu"
              ? `Menu Details`
              : `Dish Details`
            : `No Details`
        }
        visible={isModalOpen}
        toggle={handleModalClose}
      >
        {modalContent ? (
          <>
            {modalContent.type === "menu" && (
              <div className="bg-raisin_black">
                <ListItem name="Title" value={modalContent?.menu_title} />
                <ListItem name="Place" value={modalContent?.menu_location} />
                <ListItem name="Date" value={modalContent?.menu_date} />
                <ListItem
                  name="Time"
                  value={`${modalContent?.menu_start_time} - ${modalContent?.menu_end_time}`}
                />
              </div>
            )}
            {modalContent.type === "dish" && (
              <div className="bg-raisin_black">
                <ListItem name="Title" value={modalContent?.dish_title} />
                <ListItem name="Subtitle" value={modalContent?.dish_subtitle} />
                <ListItem
                  variant="y-direction"
                  name="Description"
                  value={modalContent?.dish_description}
                />
              </div>
            )}
          </>
        ) : (
          <p>No content is currently selected.</p>
        )}
      </ContentModal>
    </>
  );
};

export default HomeComponent;
