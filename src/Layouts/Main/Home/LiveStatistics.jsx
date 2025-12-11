import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaClipboardList, FaGraduationCap } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";

const LiveStatistics = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["live-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home/stats");
      return res.data;
    },
    retry: 1,
  });

  if (isError)
    return (
      <div className="text-center text-red-600 py-10">
        Failed to load statistics.
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-3">Live Statistics</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Real-time platform data showing total users, applications, and
        scholarships.
      </p>

      {isLoading ? (
        <DataLoader></DataLoader>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Users */}
          <div
            data-aos="zoom-in"
            className="bg-white p-6 shadow-md rounded-xl text-center hover:shadow-lg duration-300"
          >
            <div className="text-blue-600 text-4xl mb-3 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="text-2xl font-semibold">{data.users}</h3>
            <p className="text-gray-600 font-medium">Registered Users</p>
          </div>

          {/* Applications */}
          <div
            data-aos="zoom-in"
            className="bg-white p-6 shadow-md rounded-xl text-center hover:shadow-lg duration-300"
          >
            <div className="text-green-600 text-4xl mb-3 flex justify-center">
              <FaClipboardList />
            </div>
            <h3 className="text-2xl font-semibold">{data.applications}</h3>
            <p className="text-gray-600 font-medium">Total Applications</p>
          </div>

          {/* Scholarships */}
          <div
            data-aos="zoom-in"
            className="bg-white p-6 shadow-md rounded-xl text-center hover:shadow-lg duration-300"
          >
            <div className="text-purple-600 text-4xl mb-3 flex justify-center">
              <FaGraduationCap />
            </div>
            <h3 className="text-2xl font-semibold">{data.scholarships}</h3>
            <p className="text-gray-600 font-medium">Available Scholarships</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStatistics;
