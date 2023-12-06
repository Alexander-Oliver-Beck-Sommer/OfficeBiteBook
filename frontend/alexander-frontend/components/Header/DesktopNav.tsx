import Link from "next/link";
import pageSettings from "@/data/pageSettings";
import UserIcon from "@/components/Icons/UserIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "../Icons/CalendarIcon";

type DesktopNavProps = {
  style: string;
};

const DesktopNav = ({ style }: DesktopNavProps) => {
  return (
    <nav className={`hidden lg:block ${style}`}>
      <ul className="flex items-center gap-12">
        <li>
          <Link
            href="/calendar-test"
            className="gap-1 flex flex-col items-center justify-center"
          >
            <CalendarIcon className="h-7 w-7 fill-ghost_white" />
            <p>Calendar</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
