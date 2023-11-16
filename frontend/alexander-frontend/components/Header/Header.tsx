"use client";
import React, { useState } from "react";
import HamburgerButton from "../Buttons/HamburgerButton";
import TransparentBackground from "../TransparentBackground";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mobileNavClasses = `${
    isMenuOpen ? "opacity-1 w-full visible" : "opacity-0 w-0 invisible"
  }`;
  const mobileHeaderClasses = `${
    isMenuOpen
      ? "after:border-davys_grey after:w-1/5"
      : "after:border-transparent after:w-0"
  }`;

  return (
    <>
      <header
        className={`relative z-30 flex h-header_height items-center justify-center bg-dark_gunmetal px-16 after:absolute after:bottom-0 after:right-0 after:box-content after:border-b-2 after:transition-all after:duration-400 after:ease-in-out after:content-[''] md:px-48 after:lg:hidden ${mobileHeaderClasses}`}
      >
        <section className="flex w-full max-w-screen-xl items-center justify-between ">
          <h2>OfficeBiteBook</h2>
          <HamburgerButton
            screen={"mobile-tablet"}
            ariaLabel={"Open and close the navigation menu"}
            toggle={toggleMenu}
          />
          <nav className="hidden h-48 border-2 border-ghost_white lg:block">
            <p>Nav only shows in the header on desktop size!</p>
          </nav>
        </section>
      </header>
      <nav
        className={`absolute bottom-0 left-0 top-header_height z-30 box-content w-0 max-w-[80%] border-r-2 border-davys_grey bg-dark_gunmetal transition-all duration-400 ease-in-out lg:hidden ${mobileNavClasses}`}
      ></nav>
      <TransparentBackground
        visible={isMenuOpen}
        screen={"mobile-tablet"}
        toggle={toggleMenu}
      />
    </>
  );
}
