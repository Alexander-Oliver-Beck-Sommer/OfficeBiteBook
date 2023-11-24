import DownArrowIcon from "@/components/Icons/DownArrowIcon";

export default function MonthFlipper() {
    return (
        <button className="flex items-center gap-5" aria-label="Click and select a specific month in the calendar">
            <h3>October 2023</h3>
            <DownArrowIcon className="h-35 w-35 fill-cool_grey" />
        </button>
    )
}