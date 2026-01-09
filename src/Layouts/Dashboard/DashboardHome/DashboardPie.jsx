import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const DashboardPie = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["live-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home/stats");
      return res.data;
    },
  });

  // Recharts এর জন্য ডেটা ফরম্যাট করা
  const chartData = [
    { name: "Students", value: stats.users || 0 },
    { name: "Applications", value: stats.applications || 0 },
    { name: "Scholarships", value: stats.scholarships || 0 },
  ];

  // চার্টের কালার প্যালেট
  const COLORS = ["#0ea5e9", "#8b5cf6", "#6366f1"]; // Sky, Purple, Indigo

  if (isLoading) return <DataLoader />;

  return (
    <div
      className={`p-6 rounded-4xl border transition-all duration-300 h-[400px] flex flex-col ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
          : "bg-white border-gray-100 shadow-sm"
      }`}
    >
      <h3
        className={`text-lg font-black mb-4 px-2 ${
          theme === "dark" ? "text-white" : "text-slate-800"
        }`}
      >
        Platform Distribution
      </h3>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: theme === "dark" ? "#f1f5f9" : "#1e293b" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span
                  className={`text-xs font-bold uppercase tracking-widest opacity-70 ${
                    theme === "dark" ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPie;
