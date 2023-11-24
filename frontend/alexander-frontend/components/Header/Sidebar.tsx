"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = ({ path }) => {
  const pathname = usePathname();
  const pathValue = "/calendar-test";

  if (pathname === pathValue) {
    return (
      <nav className="text-red-500">
        <h3>Navbar visible</h3>
      </nav>
    );
  } else {
    console.log(`The sidebar is currently set to only appear on ${pathValue}`);
  }
};

export default Sidebar;
