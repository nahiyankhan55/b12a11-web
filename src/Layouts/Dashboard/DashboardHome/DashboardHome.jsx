import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const DashboardHome = () => {
  const { userName } = useContext(WebContext);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full py-10 md:py-16 text-center bg-linear-to-r from-purple-100 via-white to-purple-100">
        Welcome {userName || "User"} in ScholarStream
      </div>
    </div>
  );
};

export default DashboardHome;
