import { useEffect, useState } from "react";

const useAdminDashboard = () => {
  const enabledItems = [
    {
      icon: "celebrations",
      title: "Celebrations",
      label: "Inspect Celebrations",
      description:
        "Get an oversight of current, or upcoming, user anniversaries or birthdays",
    },
  ];

  const disabledItems = [
    {
      icon: "settings",
      label: "Inspect General Settings",
      title: "General Settings",
      description: "View and update your department details",
    },
    {
      icon: "group",
      label: "Inspect User Management",
      title: "User Management",
      description:
        "View and manage current users in your department, including roles & registrations",
    },
    {
      icon: "archive",
      label: "Inspect Archive",
      title: "Archive",
      description:
        "Manage and access your department’s archive, containing menus and dishes",
    },
    {
      icon: "statistics",
      title: "Statistics",
      label: "Inspect Statistics",
      description:
        "Read and get an oversight of your departments in an variety of forms",
    },
    {
      icon: "finances",
      title: "Finances",
      label: "Inspect Finances",
      description:
        "Handle and maintain billing for dishes and menus in terms of costs",
    },
    {
      icon: "feedback",
      title: "Feedback",
      label: "Inspect Feedback",
      description:
        "Read what users in your department has to say about your dishes & menus",
    },
    {
      icon: "notification",
      title: "Notifications",
      label: "Inspect Notifications",
      description:
        "Manage notifications sent to you and your department’s users",
    },
    {
      icon: "robot",
      title: "Kitchen Buddy",
      label: "Inspect Kitchen Buddy",
      description:
        "Manage and customize your department’s bot and when, and what, it sends and alerts",
    },
  ];

  return {
    enabledItems,
    disabledItems,
  };
};

export default useAdminDashboard;
