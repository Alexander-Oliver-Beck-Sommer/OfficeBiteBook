"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = ({ path }) => {
  const pathname = usePathname();
  const pathValue = "/calendar-test";

  if (pathname === pathValue) {
    return (
      <section className="w-sidebar_width fixed bottom-0 top-0 bg-dark_gunmetal pt-header_height">
        
      </section>
    );
  } else {
    console.log(`The sidebar is currently set to only appear on ${pathValue}`);
  }
};

export default Sidebar;
