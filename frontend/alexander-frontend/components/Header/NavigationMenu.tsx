import LinkItem from "@/components/Header/LinkItem";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import LogIcon from "@/components/icons/LogIcon";
import OfficeIcon from "../Icons/OfficeIcon";

const NavigationMenu = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-8">
        <LinkItem label="Departments" href="/" icon={<OfficeIcon />} />
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
