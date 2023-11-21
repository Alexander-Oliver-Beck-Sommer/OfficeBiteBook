"use client";
import React, { useState } from "react";
import { MdPerson, MdSettings } from "react-icons/md";
import Link from "next/link";
import pageSettings from "@/data/pageSettings";

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
            <h3>{pageSettings.account.title_alt}</h3>
          </Link>
        </li>
        <li>
          <Link
            href={pageSettings.settings.route}
            className="flex flex-col items-center justify-center gap-5"
          >
            <MdSettings size={30} />
            <h3>{pageSettings.settings.title}</h3>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
