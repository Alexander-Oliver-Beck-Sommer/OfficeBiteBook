import DownArrowIcon from "@/components/Icons/DownArrowIcon";

export default function MonthFlipper() {
  return (
    <button
      className="gap-1 flex items-center"
      aria-label="Click and choose inbetween months and weeks"
    >
      <h4>October 2023</h4>
      <DownArrowIcon className="h-6 w-6 fill-apple" />
    </button>
  );
}
