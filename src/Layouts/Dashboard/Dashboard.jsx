import { Outlet } from "react-router";
import SideNav from "../../Components/SideNav";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import WebContext from "../../Context/WebContext";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import DataLoader from "../../Components/DataLoader";

const Dashboard = () => {
  const { user } = useContext(WebContext);
  const axiosPublic = useAxiosPublic();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const role = userData?.role?.toLowerCase() || "";

  console.log(userData);

  if (isLoading) return <DataLoader></DataLoader>;

  return (
    <div className="grid grid-cols-12 h-screen w-full">
      <div className="col-span-2">
        <SideNav role={role}></SideNav>
      </div>

      <div className="col-span-10 p-6 overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
