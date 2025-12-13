import { useContext } from "react";
import WebContext from "../../Context/WebContext";
import DataLoader from "../../Components/DataLoader";
import { Navigate } from "react-router";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const IsAdmin = ({ children }) => {
  const { user, loading } = useContext(WebContext);
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

  console.log(userData.role);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <DataLoader></DataLoader>
      </div>
    );
  }

  if (userData.role === "Admin") {
    return children;
  }

  return <Navigate to="/dashboard/home"></Navigate>;
};

IsAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsAdmin;
