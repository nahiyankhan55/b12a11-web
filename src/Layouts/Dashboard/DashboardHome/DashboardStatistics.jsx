import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaClipboardList, FaGraduationCap } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const DashboardStatistics = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

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
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center font-bold">
        Failed to load stats.
      </div>
    );

  // ড্যাশবোর্ডের জন্য কম্প্যাক্ট কার্ড স্টাইল
  const cardStyle = `relative flex items-center gap-6 p-6 rounded-3xl border transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-900 border-slate-800 shadow-lg shadow-black/20"
      : "bg-white border-gray-100 shadow-sm hover:shadow-md"
  }`;

  return (
    <div className="w-full">
      {isLoading ? (
        <DataLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Students */}
          <div className={cardStyle}>
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-500 text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">
                Students
              </p>
              <h3
                className={`text-2xl font-black ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {data.users?.toLocaleString() || 0}
              </h3>
            </div>
          </div>

          {/* Total Applications */}
          <div className={cardStyle}>
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 text-2xl">
              <FaClipboardList />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">
                Applied
              </p>
              <h3
                className={`text-2xl font-black ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {data.applications?.toLocaleString() || 0}
              </h3>
            </div>
          </div>

          {/* Active Scholarships */}
          <div className={cardStyle}>
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 text-2xl">
              <FaGraduationCap />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">
                Scholarships
              </p>
              <h3
                className={`text-2xl font-black ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {data.scholarships?.toLocaleString() || 0}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStatistics;
