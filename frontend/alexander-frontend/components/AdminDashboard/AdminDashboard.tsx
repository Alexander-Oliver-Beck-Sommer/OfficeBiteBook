import { useEffect } from "react";
type AdminDashboardProps = {
  adminDashboardVisibility: boolean;
  adminDashboardClose: () => void;
};

const AdminDashboard = ({
  adminDashboardVisibility = false,
  adminDashboardClose = () => {},
}: AdminDashboardProps) => {
  const dashboardBackground = adminDashboardVisibility
    ? "visible opacity-95"
    : "invisible opacity-0";
  const dashboardMenu = adminDashboardVisibility
    ? "w-4/5 border-r-arsenic opacity-100 visible"
    : "w-0 border-r-transparent opacity-0 invisible";

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (adminDashboardVisibility) {
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [adminDashboardVisibility]);

  return (
    <>
      <section
        onClick={adminDashboardClose}
        className={`absolute inset-0 z-30 cursor-pointer bg-eerie_black transition-all duration-200 ease-in-out hover:bg-strange_black ${dashboardBackground}`}
      ></section>
      <section
        className={`absolute bottom-0 left-0 top-0 z-40 flex overflow-hidden rounded-br rounded-tr border-r-2 bg-eerie_black transition-all duration-300 ease-in-out ${dashboardMenu}`}
      >
        <section className="flex flex-1 pb-12 pl-16 pr-12 pt-header_height transition-all duration-300 ease-in-out">
          <section className="border-sunset-orange grid flex-1 grid-rows-autoX1">
            <div className="flex items-center border border-arsenic p-3">
              <h4>Admin Dashboard</h4>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default AdminDashboard;
