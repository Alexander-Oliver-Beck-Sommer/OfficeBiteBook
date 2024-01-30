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
    <li className="flex flex-col rounded border-2 border-dark-500 bg-dark-300 fill-dark-500 text-grey">
      <div className="grid-cols-1Xauto grid gap-4 bg-dark-100 p-4">
        <div className="w-full overflow-hidden">
          <h4 className="truncate text-white">{title}</h4>
          <p className="truncate">{subtitle}</p>
        </div>
        <ImageButton size="small" url={thumbnail} label={title} />
      </div>
      <div className="px-4 py-3">
        <p>{description}</p>
      </div>
    </li>
  );
};

export default Dish;
