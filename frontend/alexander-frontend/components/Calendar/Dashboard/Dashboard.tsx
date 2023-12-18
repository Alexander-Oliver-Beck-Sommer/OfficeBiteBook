type DashboardProps = {
  style?: string;
};

const Dashboard = ({ style = "" }: DashboardProps) => {
  return (
    <section
      className={`absolute bottom-0 left-sidebar_width top-header_height z-30 grid w-9/12 grid-rows-autoX1 flex-col transition-all duration-300 ease-in-out ${style}`}
    >
      <section className="h-16 rounded-tr border-r-2 border-t-2 border-arsenic bg-raisin_black"></section>
      <section className="mt-[-2px] rounded-bl rounded-br border-b-2 border-l-2 border-r-2 border-arsenic bg-raisin_black"></section>
    </section>
  );
};

export default Dashboard;
