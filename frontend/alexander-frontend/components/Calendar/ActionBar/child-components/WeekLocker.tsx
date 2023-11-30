import LockIcon from "@/components/Icons/LockIcon";
import TimeIcon from "@/components/Icons/TimeIcon";

export default function WeekLocker() {
  return (
    <ul className="flex items-center gap-25">
      <li className="flex items-center">
        <button className="flex items-center gap-8">
          <h4>Unlock</h4>
          <LockIcon className="h-25 w-25 fill-rajah" variant="disabled" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="flex items-center gap-8">
          <h4>Lock</h4>
          <LockIcon className="h-25 w-25 fill-rajah" variant="enabled" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="flex items-center gap-8">
          <h4>Lock Time</h4>
          <TimeIcon className="h-25 w-25 fill-rajah" variant="enabled" />
        </button>
      </li>
      <li className="flex items-center">
          <h4><span className="font-normal">Lock Time: </span>05-10-2023 - 15:45</h4>
      </li>
    </ul>
  );
}
