import DownArrowIcon from "@/components/Icons/DownArrowIcon";

export default function MonthFlipper() {
  return (
    <button
      className="flex items-center gap-1"
      aria-label="Click and choose inbetween months and weeks"
    >
      <h4>October 2023</h4>
      <DownArrowIcon className="fill-primary h-6 w-6" />
    </button>
  );
}
