import { Outlet } from "react-router";
import SideNav from "../../Components/SideNav";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-2">
        <SideNav></SideNav>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
