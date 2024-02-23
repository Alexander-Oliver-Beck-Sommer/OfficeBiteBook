import { useEffect, useState } from "react";
import useUser from "./useUser";

const useAdminDashboard = (departmentId: string, visibility: boolean) => {
  const [innerModal, setInnerModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [mode, setMode] = useState<string>("");
  // Hooks
  const { fetchAllUsers } = useUser();

  const loadUsers = async () => {
    setUsers(await fetchAllUsers());
  };

  useEffect(() => {
    if (visibility === false) {
      loadUsers();
      setInnerModal(false);
      setTitle("");
      setMode("");
    }
  }, [visibility]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const openInnerModal = (title: string, mode: string) => {
    setInnerModal(true);
    setTitle(title);
    setMode(mode);
    console.log(title, mode);
  };

  const closeInnerModal = () => {
    loadUsers();
    setInnerModal(false);
    setTitle("");
    setMode("");
  };

  const enabledItems = [
    {
      mode: "celebrations",
      icon: "celebrations",
      title: "Celebrations",
      label: "Inspect Celebrations",
      description:
        "Get an oversight of current, or upcoming, user anniversaries or birthdays",
      toggle: function () {
        return () => openInnerModal(this.title, this.mode);
      },
    },
  ];

  // Utility function to check if the birthday is within the next month
  const isBirthdayWithinNextMonth = (birthday) => {
    const today = new Date();
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );

    // Convert the birthday string to a date object and adjust the year
    const thisYearBirthday = new Date(birthday);
    thisYearBirthday.setFullYear(today.getFullYear());

    // Check if this year's birthday has passed and adjust the year accordingly
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }

    // Check if the birthday is before next month's date and after today
    return thisYearBirthday < nextMonth && thisYearBirthday >= today;
  };

  const disabledItems = [
    {
      mode: "settings",
      icon: "settings",
      label: "Inspect General Settings",
      title: "General Settings",
      description: "View and update your department details",
    },
    {
      mode: "user-management",
      icon: "group",
      label: "Inspect User Management",
      title: "User Management",
      description:
        "View and manage current users in your department, including roles & registrations",
    },
    {
      mode: "archive",
      icon: "archive",
      label: "Inspect Archive",
      title: "Archive",
      description:
        "Manage and access your department’s archive, containing menus and dishes",
    },
    {
      mode: "statistics",
      icon: "statistics",
      title: "Statistics",
      label: "Inspect Statistics",
      description:
        "Read and get an oversight of your departments in an variety of forms",
    },
    {
      mode: "finances",
      icon: "finances",
      title: "Finances",
      label: "Inspect Finances",
      description:
        "Handle and maintain billing for dishes and menus in terms of costs",
    },
    {
      mode: "feedback",
      icon: "feedback",
      title: "Feedback",
      label: "Inspect Feedback",
      description:
        "Read what users in your department has to say about your dishes & menus",
    },
    {
      mode: "notifications",
      icon: "notification",
      title: "Notifications",
      label: "Inspect Notifications",
      description:
        "Manage notifications sent to you and your department’s users",
    },
    {
      mode: "kitchen-buddy",
      icon: "robot",
      title: "Kitchen Buddy",
      label: "Inspect Kitchen Buddy",
      description:
        "Manage and customize your department’s bot and when, and what, it sends and alerts",
    },
  ];

  return {
    innerModal,
    closeInnerModal,
    enabledItems,
    disabledItems,
    title,
    users,
    mode,
    isBirthdayWithinNextMonth,
  };
};

export default useAdminDashboard;
