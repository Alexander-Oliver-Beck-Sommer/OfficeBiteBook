import Link from "next/link";
import pageSettings from "@/data/pageSettings";
import UserIcon from "@/components/Icons/UserIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import LogIcon from "@/components/icons/LogIcon";

const DesktopNav = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-12">
        <li>
          <Link href="/login">
            <LogIcon variant="login" className="h-7 w-7 fill-ghost_white" />
          </Link>
        </li>
        <li>
          <Link href="/calendar-test">
            <CalendarIcon className="h-7 w-7 fill-ghost_white" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
