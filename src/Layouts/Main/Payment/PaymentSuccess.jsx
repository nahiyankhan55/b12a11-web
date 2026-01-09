import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import WebContext from "../../../Context/WebContext";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { HeadProvider, Title } from "react-head";
import { CheckCircleOutline, History, ArrowBack } from "@mui/icons-material";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);

  const scholarship = location.state?.scholarship;
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    if (!scholarship || !user?.email) return;

    const payload = {
      scholar: scholarship,
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      fees: scholarship.applicationFees,
      applicant: user.email,
      userName: user.displayName,
      appliedDate: new Date(),
      status: "pending",
      payment: "Paid",
    };

    axiosPublic
      .post("/applications", payload)
      .then(() => {
        toast.success("Application submitted successfully!");
      })
      .catch(() => {
        toast.error("Failed to save application!");
      });
  }, [scholarship, user, axiosPublic]);

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="opacity-50">No payment data found.</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center py-20 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>Payment Successful || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-xl w-full sm:px-6 px-2">
        <div
          className={`sm:p-10 p-4 rounded-4xl border text-center transition-all ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-green-500/10 text-green-500 animate-bounce">
              <CheckCircleOutline sx={{ fontSize: 60 }} />
            </div>
          </div>

          {/* 3xl Title Rule */}
          <h1
            className={`md:text-3xl text-2xl font-black mb-4 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Payment <span className="text-green-500">Successful!</span> 🎉
          </h1>

          {/* Body Text - sm:text-lg Rule */}
          <p className="sm:text-lg text-sm font-medium opacity-70 mb-8 leading-relaxed">
            Congratulations! Your payment for{" "}
            <span className="text-sky-500 font-bold">
              {scholarship.scholarshipName}
            </span>{" "}
            has been processed and your application is now pending review.
          </p>

          <div
            className={`p-6 rounded-3xl mb-10 text-left space-y-3 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-50">
              <span>University</span>
              <span>Status</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold truncate pr-4">
                {scholarship.universityName}
              </p>
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-black rounded-full uppercase">
                Pending
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard/my-applications")}
              className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-linear-to-r from-purple-600 to-sky-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-sky-500/20 transition-all hover:scale-[1.02]"
            >
              <History fontSize="small" />
              My Applications
            </button>
            <button
              onClick={() => navigate("/all-scholarships")}
              className={`flex items-center justify-center gap-2 w-full px-4 py-4 font-bold rounded-2xl border transition-all hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <ArrowBack fontSize="small" />
              More Scholarships
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
