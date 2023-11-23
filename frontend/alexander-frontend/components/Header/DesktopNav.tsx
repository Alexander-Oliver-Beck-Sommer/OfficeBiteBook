"use client";
import React, { useState } from "react";
import { MdPerson, MdSettings, MdConstruction } from "react-icons/md";
import Link from "next/link";
import pageSettings from "@/data/pageSettings";
import UserIcon from "../Icons/UserIcon";

type DesktopNavProps = {
  style: string; // Optional. Functionality to add styling to the DesktopNav component if needed.
};

const DesktopNav = ({ style }: DesktopNavProps) => {
  return (
    <nav className={`hidden lg:block ${style}`}>
      <ul className="flex items-center gap-50">
        <li>
          <Link
            href={pageSettings.account.route}
            className="flex flex-col items-center justify-center gap-5"
          >
            <MdPerson size={30} />
            <p>{pageSettings.account.title_alt}</p>
          </Link>
        </li>
        <li>
          <Link
            href={pageSettings.settings.route}
            className="flex flex-col items-center justify-center gap-5"
          >
            <MdSettings size={30} />
            <p>{pageSettings.settings.title}</p>
          </Link>
        </li>
        <li>
          <Link
            href="/calendar-test"
            className="flex flex-col items-center justify-center gap-5"
          >
            <MdConstruction size={30} />
            <p>Calendar Test</p>
          </Link>
        </li>
        <li>
          <UserIcon
            className="h-35 w-35 overflow-visible text-yellow-600"
            variant="filled"
          />
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
