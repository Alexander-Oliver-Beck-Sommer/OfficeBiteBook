"use client";
import React, { useState } from "react";
import Link from "next/link";
import pageSettings from "@/data/pageSettings";
import UserIcon from "@/components/Icons/UserIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import RobotIcon from "../Icons/RobotIcon";
import TimeIcon from "../Icons/TimeIcon";

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
            <UserIcon
              className="h-30 w-30 fill-ghost_white"
              variant="enabled"
            />
            <p>{pageSettings.account.title_alt}</p>
          </Link>
        </li>
        <li>
          <Link
            href={pageSettings.settings.route}
            className="flex flex-col items-center justify-center gap-5"
          >
            <SettingsIcon
              className="h-30 w-30 fill-ghost_white"
              variant="enabled"
            />
            <p>{pageSettings.settings.title}</p>
          </Link>
        </li>
        <li>
          <Link
            href="/calendar-test"
            className="flex flex-col items-center justify-center gap-5"
          >
            <RobotIcon className="h-30 w-30 fill-ghost_white" />
            <p>Calendar Test</p>
          </Link>
        </li>
        <li>
          <Link
            href="/menu-modal-test"
            className="flex flex-col items-center justify-center gap-5"
          >
            <TimeIcon className="h-30 w-30 fill-ghost_white" />
            <p>Menu Modal Test</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
