import Link from "next/link";
import pageSettings from "@/data/pageSettings";
import UserIcon from "@/components/Icons/UserIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import RobotIcon from "@/components/Icons/RobotIcon";
import TimeIcon from "@/components/Icons/TimeIcon";

type DesktopNavProps = {
  style: string;
};

const DesktopNav = ({ style }: DesktopNavProps) => {
  return (
    <nav className={`hidden lg:block ${style}`}>
      <ul className="flex items-center gap-12">
        <li>
          <Link
            href={pageSettings.account.route}
            className="gap-1 flex flex-col items-center justify-center"
          >
            <UserIcon className="h-7 w-7 fill-ghost_white" variant="enabled" />
            <p>{pageSettings.account.title_alt}</p>
          </Link>
        </li>
        <li>
          <Link
            href={pageSettings.settings.route}
            className="gap-1 flex flex-col items-center justify-center"
          >
            <SettingsIcon
              className="h-7 w-7 fill-ghost_white"
              variant="enabled"
            />
            <p>{pageSettings.settings.title}</p>
          </Link>
        </li>
        <li>
          <Link
            href="/calendar-test"
            className="gap-1 flex flex-col items-center justify-center"
          >
            <RobotIcon className="h-7 w-7 fill-ghost_white" />
            <p>Calendar Test</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
