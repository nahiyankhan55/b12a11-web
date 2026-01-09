import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import DashboardStatistics from "./DashboardStatistics";
import { HeadProvider, Title } from "react-head";
import { MdWavingHand } from "react-icons/md";

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
            ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
            : "bg-white border-gray-100 shadow-xl"
        }`}
      >
        {/* Background Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-500 text-xs font-black uppercase tracking-widest mb-6">
            <MdWavingHand className="animate-bounce" /> Dashboard Overview
          </div>

          {/* 3xl Title Rule applied here */}
          <h1
            className={`md:text-4xl text-2xl font-black mb-4 tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Welcome back, <br className="md:hidden" />
            <span className="bg-linear-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent italic">
              {userName || "Scholar"}
            </span>
            !
          </h1>

          {/* Body Text Rule (sm:text-lg) */}
          <p className="max-w-xl sm:text-lg text-sm font-medium opacity-60 leading-relaxed">
            Ready to continue your journey? Here's what's happening with
            ScholarStream applications today.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2">
          <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] opacity-40">
            Live Insights
          </h2>
          <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-slate-500/20 to-transparent"></div>
        </div>

        <div
          className={`rounded-4xl transition-all ${
            theme === "dark" ? "opacity-90" : "opacity-100"
          }`}
        >
          <DashboardStatistics></DashboardStatistics>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
