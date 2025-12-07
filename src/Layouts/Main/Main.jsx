import { Outlet } from "react-router";
import MainNav from "../../Components/MainNav";

const Main = () => {
  return (
    <div className="w-full">
      <MainNav></MainNav>
      <div className="py-8"></div>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
