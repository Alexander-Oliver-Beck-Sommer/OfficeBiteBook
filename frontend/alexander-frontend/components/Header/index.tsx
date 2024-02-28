"use client";
import { Slant } from "hamburger-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavigationMenu from "./NavigationMenu";
import HamburgerMenu from "@/components/Header/HamburgerMenu";
import useUtilities from "@/hooks/useUtilities";
import useSupabaseUsers from "@/hooks/useSupabaseUsers";

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { disableBodyScroll } = useUtilities();
  const [isLoggedIn, setIsLoggedIn] = useState<false | null>(false);
  const { fetchUserFromSession } = useSupabaseUsers();

  const fetchUser = async () => {
    const user = await fetchUserFromSession();

    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  disableBodyScroll(isHamburgerOpen);

  const handleBurgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <header className="flex h-header_height justify-center bg-dark-100 px-4 md:px-12">
      <section className="flex w-full max-w-screen-xl items-center justify-between gap-4">
        <Link href="/" aria-label="Home">
          <h3 className="font-semibold">OfficeBiteBook</h3>
        </Link>
        <div className="lg:hidden">
          <Slant
            toggled={isHamburgerOpen}
            toggle={handleBurgerMenu}
            rounded
            label="Show menu"
          />
        </div>
        <NavigationMenu />
      </section>
      <HamburgerMenu
        user={isLoggedIn}
        visible={isHamburgerOpen}
        toggle={handleBurgerMenu}
      />
    </header>
  );
};

export default Header;
