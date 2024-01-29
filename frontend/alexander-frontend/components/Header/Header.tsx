"use client";
import { Slant } from "hamburger-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavigationMenu from "./child-components/NavigationMenu";
import HamburgerMenu from "@/components/Header/child-components/HamburgerMenu";

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isHamburgerOpen) {
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isHamburgerOpen]);

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
      <HamburgerMenu visible={isHamburgerOpen} toggle={handleBurgerMenu} />
    </header>
  );
};

export default Header;
