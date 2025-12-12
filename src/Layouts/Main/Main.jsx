import { Outlet } from "react-router";
import MainNav from "../../Components/MainNav";
import Footer from "../../Components/Footer";

const Main = () => {
  return (
    <div className="w-full">
      <MainNav></MainNav>
      <div className="py-8"></div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
