"use client";
import React, { useState } from "react";

type DesktopNavProps = {
  style: string; // Optional. Functionality to add styling to the DesktopNav component if needed.
};

const DesktopNav = ({ style }: DesktopNavProps) => {
  return (
    <nav
      className={`hidden h-48 border-2 border-ghost_white lg:block ${style}`}
    >
      <p>Nav only shows in the header on desktop size!</p>
    </nav>
  );
};

export default DesktopNav;
