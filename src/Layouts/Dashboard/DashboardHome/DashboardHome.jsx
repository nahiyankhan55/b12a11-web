import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import DashboardStatistics from "./DashboardStatistics";
import DashboardPie from "./DashboardPie";
import { HeadProvider, Title } from "react-head";
import { MdWavingHand, MdInsertChartOutlined } from "react-icons/md";

const DashboardHome = () => {
  const { userName, theme } = useContext(WebContext);

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700 p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>Welcome to Dashboard || ScholarStream</Title>
      </HeadProvider>

      {/* Hero Welcome Banner */}
      <div
        className={`relative overflow-hidden rounded-4xl border p-8 md:p-16 transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 shadow-2xl"
            : "bg-white border-gray-100 shadow-xl"
        }`}
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-500 text-xs font-black uppercase tracking-widest mb-6">
            <MdWavingHand className="animate-bounce" /> Dashboard Overview
          </div>
          <h1
            className={`md:text-4xl text-2xl font-black mb-4 tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Welcome back,{" "}
            <span className="bg-linear-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent italic">
              {userName || "Scholar"}
            </span>
            !
          </h1>
          <p className="max-w-xl sm:text-lg text-sm font-medium opacity-60">
            Ready to continue your journey? Here's what's happening with
            ScholarStream applications today.
          </p>
        </div>
      </div>

      {/* 1. Statistics Cards Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2">
          <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] opacity-40 text-center">
            Live Statistics
          </h2>
          <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
        </div>
        <DashboardStatistics />
      </div>

      {/* 2. Dedicated Pie Chart Section (MIYA Version) */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2">
          <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
          <div className="flex items-center gap-2 opacity-40">
            <MdInsertChartOutlined className="text-xl" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em]">
              Data Visualization
            </h2>
          </div>
          <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pie Chart Section */}
          <div className="lg:col-span-6 w-full">
            <DashboardPie />
          </div>

          {/* Side Information/Text for the Pie Section */}
          <div
            className={`lg:col-span-6 p-8 rounded-4xl border h-full flex flex-col justify-center gap-4 transition-all ${
              theme === "dark"
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <h3
              className={`text-2xl font-black ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}
            >
              Visual Breakdown
            </h3>
            <p className="text-sm font-medium opacity-60 leading-relaxed">
              This chart provides a real-time percentage breakdown of our
              platform's key assets. Monitor the balance between enrolled
              students, scholarship availability, and application flow at a
              glance.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-500 text-[10px] font-bold uppercase tracking-widest">
                Growth Focused
              </span>
              <span className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-500 text-[10px] font-bold uppercase tracking-widest">
                Real-time Data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
