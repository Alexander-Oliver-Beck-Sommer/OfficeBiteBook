"use client";
import React, { useState } from "react";

type MobileNavProps = {
  style: string; // Optional. Functionality to add styling to the MobileNav component if needed.
};

const MobileNav = ({ style }: MobileNavProps) => {
  return (
    <nav
      className={`absolute bottom-0 left-0 top-header_height z-30 box-content w-0 max-w-[80%] border-r-2 border-davys_grey bg-dark_gunmetal transition-all duration-400 ease-in-out lg:hidden ${style}`}
    ></nav>
  );
};

export default MobileNav;
