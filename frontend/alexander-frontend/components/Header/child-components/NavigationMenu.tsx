import LinkItem from "@/components/Header/child-components/LinkItem";
import HomeIcon from "@/components/Icons/HomeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import LogIcon from "@/components/icons/LogIcon";

const NavigationMenu = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-8">
        <LinkItem label="Home" href="/" icon={<HomeIcon />} />
        <LinkItem
          label="Calendar"
          href="/calendar"
          icon={<CalendarIcon variant="fullWeek" />}
        />
        <LinkItem label="Profile" href="/profile" icon={<ProfileIcon />} />
        <LinkItem
          label="Login"
          href="/login"
          icon={<LogIcon variant="login" />}
        />
      </ul>
    </nav>
  );
};

export default NavigationMenu;
