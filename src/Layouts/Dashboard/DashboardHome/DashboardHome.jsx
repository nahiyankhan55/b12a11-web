import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import LiveStatistics from "../../Main/Home/LiveStatistics";
import { HeadProvider, Title } from "react-head";

const DashboardHome = () => {
  const { userName } = useContext(WebContext);

  return (
    <div className="w-full flex flex-col">
      <HeadProvider>
        <Title>Welcome In Dashboard || ScholarStream</Title>
      </HeadProvider>
      <div className="w-full py-10 md:py-16 text-center bg-linear-to-r from-purple-100 via-white to-purple-100 md:text-3xl sm:text-2xl text-lg font-medium">
        Welcome{" "}
        <span className="font-semibold italic">{userName || "User"}</span> in
        ScholarStream
      </div>
      <LiveStatistics></LiveStatistics>
    </div>
  );
};

export default DashboardHome;
