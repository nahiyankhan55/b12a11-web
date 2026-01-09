import { useContext } from "react";
import { HeadProvider, Title } from "react-head";
import { useNavigate } from "react-router";
import WebContext from "../../../Context/WebContext";
import { ErrorOutline, Home, Replay } from "@mui/icons-material";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const { theme } = useContext(WebContext);

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center py-20 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>Payment Failed || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-xl w-full px-6">
        <div
          className={`p-10 rounded-4xl border text-center transition-all ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-red-500/10 text-red-500 animate-pulse">
              <ErrorOutline sx={{ fontSize: 60 }} />
            </div>
          </div>

          {/* 3xl Title Rule */}
          <h1
            className={`md:text-3xl text-2xl font-black mb-4 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Payment <span className="text-red-500">Failed!</span> ❌
          </h1>

          {/* Body Text - sm:text-lg Rule */}
          <p className="sm:text-lg text-sm font-medium opacity-70 mb-8 leading-relaxed">
            Oops! Your transaction could not be completed. Please check your
            card details or try again later.
            <br />{" "}
            <span className="text-xs uppercase font-bold tracking-widest mt-2 block">
              Status: Unpaid
            </span>
          </p>

          <div
            className={`p-6 rounded-3xl mb-10 text-sm italic ${
              theme === "dark"
                ? "bg-red-500/5 text-red-200"
                : "bg-red-50 text-red-700"
            }`}
          >
            If money was deducted from your account, it will be refunded
            automatically within 5-7 business days.
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-red-600 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-red-500/20 transition-all hover:scale-[1.02]"
            >
              <Replay fontSize="small" />
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className={`flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-2xl border transition-all hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Home fontSize="small" />
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
