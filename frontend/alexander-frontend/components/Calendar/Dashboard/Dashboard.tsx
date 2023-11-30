"use client";
import React from "react";

type DashboardProps = {
  style: string;
};

const Dashboard = ({ style }) => {
  return (
    <section
      className={`absolute bottom-0 left-sidebar_width top-header_height z-30 grid w-9/12  grid-rows-2 flex-col bg-gunmetal transition-all duration-400 ease-in-out ${style}`}
    >
      <section className="border-r-dashboardBorder border-t-dashboardBorder h-calendar_bar_height border-davys_grey"></section>
      <section className="border-b-dashboardBorder border-l-dashboardBorder border-r-dashboardBorder border-davys_grey"></section>
    </section>
  );
};

export default Dashboard;
