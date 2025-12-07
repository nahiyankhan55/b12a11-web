import { Outlet } from "react-router";
import MainNav from "../../Components/MainNav";

const Main = () => {
  return (
    <div className="w-full">
      <MainNav></MainNav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
