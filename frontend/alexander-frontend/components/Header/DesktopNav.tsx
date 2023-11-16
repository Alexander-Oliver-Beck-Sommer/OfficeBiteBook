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
      <ul className="gap-50 flex items-center">
        <li>
          <Link
            href={pageSettings.account.route}
            className="gap-5 flex flex-col items-center justify-center"
          >
            <MdPerson size={30} />
            <h3>{pageSettings.account.title_alt}</h3>
          </Link>
        </li>
        <li>
          <Link
            href={pageSettings.settings.route}
            className="gap-5 flex flex-col items-center justify-center"
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
