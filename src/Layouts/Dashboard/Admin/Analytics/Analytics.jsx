import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import DataLoader from "../../../../Components/DataLoader";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { HeadProvider, Title } from "react-head";
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";
import { MdAnalytics, MdPeople, MdSchool, MdAttachMoney } from "react-icons/md";

const Analytics = () => {
  const AxiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["analyticsStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/analytics/stats");
      return res.data;
    },
    retry: 2,
  });

  if (isLoading) return <DataLoader />;
  if (isError)
    return (
      <div className="py-20 text-center font-bold text-red-500 bg-red-500/10 rounded-4xl border border-red-500/20">
        Failed to load analytics. Please try again later.
      </div>
    );

  const barData = Object.entries(data.appCountPerUniversity || {}).map(
    ([univ, count]) => ({
      university: univ,
      applications: count,
    })
  );

  const pieData = [
    { name: "Users", value: data.usersCount },
    { name: "Scholarships", value: data.scholarshipsCount },
    { name: "Fees ($)", value: data.totalFees },
  ];

  const COLORS = ["#0ea5e9", "#8b5cf6", "#f59e0b"]; // Sky, Violet, Amber

  return (
    <div className="w-full space-y-10 p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>Admin Analytics || ScholarStream</Title>
      </HeadProvider>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2
            className={`md:text-3xl text-2xl font-black tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            System Analytics
          </h2>
          <p className="opacity-60 font-medium italic">
            Comprehensive overview of ScholarStream performance.
          </p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/10">
          <MdAnalytics />
        </div>
      </div>

      {/* 1. Statistics Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Users",
            value: data.usersCount,
            icon: <MdPeople />,
            color: "text-sky-500",
            bg: "bg-sky-500/10",
          },
          {
            label: "Total Scholarships",
            value: data.scholarshipsCount,
            icon: <MdSchool />,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
          {
            label: "Fees Collected",
            value: `$${data.totalFees}`,
            icon: <MdAttachMoney />,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-4xl border transition-all duration-300 flex items-center gap-6 ${
              theme === "dark"
                ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
            }`}
          >
            <div
              className={`h-14 w-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-3xl`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">
                {stat.label}
              </p>
              <h3
                className={`text-3xl font-black ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bar Chart: Applications per University */}
        <div
          className={`lg:col-span-7 p-8 rounded-4xl border transition-all ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="h-2 w-2 rounded-full bg-sky-500"></div>
            <h3 className="text-sm font-black uppercase tracking-widest opacity-70">
              Applications per University
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={theme === "dark" ? "#1e293b" : "#f1f5f9"}
              />
              <XAxis
                dataKey="university"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: theme === "dark" ? "#64748b" : "#94a3b8",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: theme === "dark" ? "#64748b" : "#94a3b8",
                  fontSize: 12,
                }}
              />
              <Tooltip
                cursor={{ fill: theme === "dark" ? "#1e293b" : "#f8fafc" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  backgroundColor: theme === "dark" ? "#0f172a" : "#fff",
                }}
              />
              <Bar
                dataKey="applications"
                fill="#0ea5e9"
                radius={[10, 10, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Summary */}
        <div
          className={`lg:col-span-5 p-8 rounded-4xl border transition-all ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            <h3 className="text-sm font-black uppercase tracking-widest opacity-70">
              Resource Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor: theme === "dark" ? "#0f172a" : "#fff",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center gap-4 px-2 py-4">
        <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
          End of Analytics Report
        </p>
        <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Analytics;
