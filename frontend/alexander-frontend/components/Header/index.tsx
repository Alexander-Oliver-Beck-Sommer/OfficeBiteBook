"use client";
import { Slant } from "hamburger-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import ComputerMenu from "./ComputerMenu";
import MobileMenu from "./MobileMenu";
import useUtilities from "@/hooks/useUtilities";
import useSupabaseUsers from "@/hooks/useSupabaseUsers";

const Header = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const { disableBodyScroll } = useUtilities();
  const { fetchUserFromSession } = useSupabaseUsers();

  // Awaits fetchUserFromSession and determines if user is logged in
  const fetchUser = async () => {
    const user = await fetchUserFromSession();

    if (user) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  // Check if user is logged in on page load
  useEffect(() => {
    fetchUser();
  }, []);

  // Disable body scroll when menu is visible
  disableBodyScroll(visibility);

  // Toggle menu visibility
  const handleBurgerMenu = () => {
    setVisibility(!visibility);
  };

  // Array of links that will be displayed in both menus 📚
  const links = [
    {
      text: "Departments", // Text to display
      label: "Navigate to departments", // value for aria-label and title
      path: "/", // Path to navigate to
      icon: "office", // Icon name - must be provided in the underlined link component
    },
    {
      text: "Profile",
      label: "Navigate to profile",
      path: "/profile",
      icon: "profile",
    },
  ];

  return (
    <header className="flex h-header_height items-center justify-center bg-dark-100 px-4 md:px-12">
      <section className="flex w-full max-w-screen-xl items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Go to departments"
          title="Go to departments"
          className="transition-300 text-white outline-0 hover:text-grey focus-visible:text-grey"
        >
          <h3 className="font-semibold">OfficeBiteBook</h3>
        </Link>
        <div className="lg:hidden">
          <Slant
            toggled={visibility}
            toggle={handleBurgerMenu}
            rounded
            label="Show menu"
          />
        </div>
        <ComputerMenu user={user} links={links} />
      </section>
      <MobileMenu
        user={user}
        visibility={visibility}
        toggle={handleBurgerMenu}
        links={links}
      />
    </header>
  );
};

export default Header;
