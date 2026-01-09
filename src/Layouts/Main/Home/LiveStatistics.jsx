import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaClipboardList, FaGraduationCap } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const LiveStatistics = () => {
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
      <div className="text-center text-red-600 py-10 font-bold">
        ⚠️ Failed to load platform statistics.
      </div>
    );

  // Common Card Class for cleaner code
  const cardClass = `relative overflow-hidden p-8 rounded-2xl text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
    theme === "dark"
      ? "bg-slate-800 border border-slate-700 text-white"
      : "bg-white border border-gray-100 text-slate-800 shadow-xl shadow-gray-200/50"
  }`;

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-purple-50/30"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Global Title Theme */}
        <div className="text-center mb-12">
          <h2
            className={`md:text-3xl text-2xl font-bold mb-3 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Platform Growth & Impact
          </h2>
          <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full mb-4"></div>
          <p
            className={`max-w-2xl mx-auto sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We bridge the gap between ambitious students and global
            opportunities. Explore our real-time impact metrics across the
            globe.
          </p>
        </div>

        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Registered Users */}
            <div data-aos="fade-up" className={cardClass}>
              {/* Background Accent */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-sky-500/10 rounded-full"></div>

              <div className="text-sky-500 text-5xl mb-4 flex justify-center drop-shadow-md">
                <FaUsers />
              </div>
              <h3 className="text-4xl font-extrabold mb-1 tracking-tight">
                {data.users?.toLocaleString() || 0}
              </h3>
              <p
                className={`font-semibold uppercase tracking-wider text-xs ${
                  theme === "dark" ? "text-sky-400" : "text-sky-600"
                }`}
              >
                Empowered Students
              </p>
            </div>

            {/* Total Applications */}
            <div data-aos="fade-up" data-aos-delay="100" className={cardClass}>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-500/10 rounded-full"></div>

              <div className="text-purple-600 text-5xl mb-4 flex justify-center drop-shadow-md">
                <FaClipboardList />
              </div>
              <h3 className="text-4xl font-extrabold mb-1 tracking-tight">
                {data.applications?.toLocaleString() || 0}
              </h3>
              <p
                className={`font-semibold uppercase tracking-wider text-xs ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                Applications Submitted
              </p>
            </div>

            {/* Available Scholarships */}
            <div data-aos="fade-up" data-aos-delay="200" className={cardClass}>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-500/10 rounded-full"></div>

              <div className="text-indigo-500 text-5xl mb-4 flex justify-center drop-shadow-md">
                <FaGraduationCap />
              </div>
              <h3 className="text-4xl font-extrabold mb-1 tracking-tight">
                {data.scholarships?.toLocaleString() || 0}
              </h3>
              <p
                className={`font-semibold uppercase tracking-wider text-xs ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                Active Scholarships
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveStatistics;
