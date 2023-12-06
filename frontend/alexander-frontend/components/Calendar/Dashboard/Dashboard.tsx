type DashboardProps = {
  style: string;
};

const Dashboard = ({ style }: DashboardProps) => {
  return (
    <section
      className={`grid-rows-autoX1 absolute bottom-0 left-sidebar_width top-header_height z-30 grid w-9/12 flex-col bg-gunmetal transition-all duration-400 ease-in-out ${style}`}
    >
      <section className="h-20 border-r-2 border-t-2 border-davys_grey"></section>
      <section className="border-b-2 border-l-2 border-r-2 border-davys_grey"></section>
    </section>
  );
};

export default Dashboard;
