import LockIcon from "@/components/Icons/LockIcon";
import TimeIcon from "@/components/Icons/TimeIcon";

export default function WeekLocker() {
  return (
    <ul className="gap-6 flex items-center">
      <li className="flex items-center">
        <button className="gap-2 flex items-center">
          <h4>Unlock</h4>
          <LockIcon className="h-6 w-6 fill-rajah" variant="disabled" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="gap-2 flex items-center">
          <h4>Lock</h4>
          <LockIcon className="h-6 w-6 fill-rajah" variant="enabled" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="gap-2 flex items-center">
          <h4>Lock Time</h4>
          <TimeIcon className="h-6 w-6 fill-rajah" variant="enabled" />
        </button>
      </li>
      <li className="flex items-center">
        <h4>
          <span className="font-normal">Lock Time: </span>05-10-2023 - 15:45
        </h4>
      </li>
    </ul>
  );
}
