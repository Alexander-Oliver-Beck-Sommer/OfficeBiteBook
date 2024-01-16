"use client";
import React, { useState } from "react";
import HamburgerButton from "@/components/Buttons/HamburgerButton";
import MobileNav from "@/components/Header/MobileNav";
import TransparentBackground from "@/components/TransparentBackground";
import DesktopNav from "@/components/Header/DesktopNav";
import sitesettings from "@/data/siteSettings";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mobileNavClasses = `${
    isMenuOpen ? "opacity-100 w-full visible" : "opacity-0 w-0 invisible"
  }`;
  const mobileHeaderClasses = `${
    isMenuOpen
      ? "after:border-arsenic after:w-1/5"
      : "after:border-transparent after:w-0"
  }`;

  return (
    <>
      <header
        className={`relative z-30 flex h-header_height items-center justify-between bg-eerie_black px-4 after:absolute after:bottom-0 after:right-0 after:box-content after:border-b-2 after:transition-all after:duration-300 after:ease-in-out after:content-[''] md:px-12 lg:px-sidebar_width after:lg:hidden ${mobileHeaderClasses}`}
      >
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <h3 className="font-semibold">{sitesettings.site_name}</h3>
        </Link>
        <HamburgerButton
          screen="mobile-tablet"
          label="Open and close the navigation menu"
          toggle={toggleMenu}
        />
        <DesktopNav />
      </header>
      <MobileNav style={mobileNavClasses} visible={isMenuOpen} />
      <TransparentBackground visible={isMenuOpen} toggle={toggleMenu} />
    </>
  );
}
