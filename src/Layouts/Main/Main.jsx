import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="w-full">
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
