import DownArrowIcon from "@/components/Icons/DownArrowIcon";

export default function MonthFlipper() {
  return (
    <button
      className="flex items-center gap-1"
      aria-label="Click and choose inbetween months and weeks"
    >
      <h3>October 2023</h3>
      <DownArrowIcon className="h-9 w-9 fill-rajah" />
    </button>
  );
}
