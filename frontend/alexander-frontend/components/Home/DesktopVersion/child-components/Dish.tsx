import ImageButton from "@/components/Buttons/ImageButton";

type DishProps = {
  dishCount?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
};

const Dish = ({
  dishCount = 0,
  title = "No Title",
  subtitle = "No Subtitle",
  description = "No Description",
  thumbnail = "",
}: DishProps) => {
  return (
    <li className="flex flex-col gap-4 rounded border-2 border-dark-500 bg-dark-300 fill-dark-500 p-4 text-grey">
      <div className="grid grid-cols-auto1Xauto items-end gap-4">
        <ImageButton url={thumbnail} label={title} />
        <div className="overflow-hidden">
          <h3 className="truncate text-white">{title}</h3>
          <p className="truncate">{subtitle}</p>
        </div>
        <h3 className="h-full font-semibold text-dark-500">#{dishCount}</h3>
      </div>
      <p>{description}</p>
    </li>
  );
};

export default Dish;
