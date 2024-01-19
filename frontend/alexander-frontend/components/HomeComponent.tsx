"use client";
import useHome from "@/hooks/useHome";
import QuestionIcon from "./Icons/QuestionIcon";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const { menusAndDishes, weekNumber } = useHome(userId, userEmail);

  return (
    <section className="full-height flex items-stretch justify-center px-4 py-8 md:px-12">
      <section className="flex w-full max-w-3xl flex-col gap-4">
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
              <p>Menu {menu.menu_id}</p>
              <ul>
                {menu.dishes.map((dish) => (
                  <li key={dish.dish_id}>
                    <p>Dish {dish.dish_id}</p>
                    <p>{dish.dish_name}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default HomeComponent;
