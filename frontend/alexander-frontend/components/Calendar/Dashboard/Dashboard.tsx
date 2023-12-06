type DashboardProps = {
  style: string;
};

const Dashboard = ({ style }: DashboardProps) => {
  return (
    <section
      className={`grid-rows-autoX1 absolute bottom-0 left-sidebar_width top-header_height z-30 grid w-9/12 flex-col transition-all duration-300 ease-in-out ${style}`}
    >
      <section className="h-20 rounded-tr border-r-2 border-t-2 border-davys_grey bg-gunmetal"></section>
      <section className="mt-[-2px] rounded-bl rounded-br border-b-2 border-l-2 border-r-2 border-davys_grey bg-gunmetal"></section>
    </section>
  );
};

export default Dashboard;
