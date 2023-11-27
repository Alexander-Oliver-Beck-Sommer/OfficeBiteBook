"use client";
import React, { useState, useEffect } from "react";
import HamburgerButton from "../Buttons/HamburgerButton";
import MobileNav from "./MobileNav";
import TransparentBackground from "../TransparentBackground";
import DesktopNav from "./DesktopNav";
import sitesettings from "@/data/siteSettings";
import Link from "next/link";
import Sidebar from "./Sidebar";

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
        <section className="flex w-full max-w-screen-xl items-center justify-between">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <h2>{sitesettings.site_name}</h2>
          </Link>
          <HamburgerButton
            screen={"mobile-tablet"}
            ariaLabel={"Open and close the navigation menu"}
            toggle={toggleMenu}
          />
          <DesktopNav />
        </section>
      </header>
      <MobileNav style={mobileNavClasses} />
      {/* <Sidebar path={"calendar-test"} /> */}
      <TransparentBackground
        visible={isMenuOpen}
        screen={"mobile-tablet"}
        toggle={() => setIsMenuOpen(false)}
      />
    </>
  );
}
