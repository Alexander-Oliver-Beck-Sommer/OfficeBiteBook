"use client";
import { Slant as Hamburger, Slant } from "hamburger-react";
import { useState, useEffect } from "react";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import Link from "next/link";
import LinkItem from "./NavigationMenu/LinkItem";
import HomeIcon from "../Icons/HomeIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import AccountIcon from "../Icons/AccountIcon";
import LogIcon from "../icons/LogIcon";

type NavigationBarProps = {
  title?: string;
};

const NavigationBar = ({ title = "" }: NavigationBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isNavOpen) {
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
  }, [isNavOpen]);

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <header className="flex h-header_height items-center justify-center bg-eerie_black px-4 md:px-12">
        <section className="flex w-full max-w-screen-lg items-center justify-between gap-4">
          <Link href="/">
            <h3 className="font-semibold">{title}</h3>
          </Link>
          <div className="lg:hidden">
            <Slant
              toggled={isNavOpen}
              toggle={handleToggle}
              rounded
              label="Show menu"
            />
          </div>
          <ul className="hidden gap-8 lg:flex">
            <LinkItem label="Home" href="/" icon={<HomeIcon />} />
            <LinkItem
              label="Calendar"
              href="/calendar"
              icon={<CalendarIcon />}
            />
            <LinkItem label="Profile" href="/profile" icon={<AccountIcon />} />
            <LinkItem
              label="Login"
              href="/login"
              icon={<LogIcon variant="login" />}
            />
          </ul>
        </section>
      </header>
      <NavigationMenu
        visible={isNavOpen}
        label="Navigation menu"
        toggle={handleToggle}
      />
    </>
  );
};

export default NavigationBar;
