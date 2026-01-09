import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  Typography,
  Button,
  Divider,
  Avatar,
  Box,
  Chip,
  Stack,
  Rating,
} from "@mui/material";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import {
  CalendarToday,
  LocationOn,
  School,
  Public,
  MonetizationOn,
} from "@mui/icons-material";
import WebContext from "../../../Context/WebContext";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(WebContext);

  // fetch scholarship details
  const {
    data: scholarship = null,
    isLoading: loadingScholarship,
    isError: scholarshipError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarship/data/${id}`);
      return res.data;
    },
    enabled: !!id,
    retry: 1,
  });

  // fetch reviews
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews", {
        params: { scholarshipId: id },
      });
      return res.data || [];
    },
    enabled: !!id,
    retry: 1,
  });

  // fetch similar scholarships
  const { data: recommendations = [], isLoading: loadingRecs } = useQuery({
    queryKey: scholarship
      ? ["recs", scholarship.scholarshipCategory]
      : ["recs", "empty"],
    queryFn: async () => {
      if (!scholarship) return [];

      const cat = scholarship.scholarshipCategory || "";

      const res = await axiosPublic.get("/rec/scholarships", {
        params: {
          category: cat,
          currentId: id,
        },
      });
      return res.data;
    },
    enabled: !!scholarship,
    retry: 1,
  });

  if (loadingScholarship) return <DataLoader />;

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";
  const handleApply = () => navigate("/payment", { state: { scholarship } });

  const avgRating = reviews.length
    ? Math.round(
        (reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) /
          reviews.length) *
          10
      ) / 10
    : 0;

  return (
    <div
      className={`w-full min-h-screen py-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>Scholarship Details || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: MAIN CONTENT */}
          <div className="lg:w-2/3 space-y-8">
            {/* Main Header Card */}
            <div
              className={`rounded-4xl overflow-hidden border transition-all ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              <div className="relative group">
                <img
                  src={scholarship?.universityImage}
                  alt={scholarship?.universityName}
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <Chip
                    label={scholarship?.scholarshipCategory}
                    className="bg-sky-500! text-white! font-bold"
                  />
                  <Chip
                    label={scholarship?.degree}
                    className="bg-purple-600! text-white! font-bold"
                  />
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    {/* 3xl Title Rule */}
                    <h1
                      className={`md:text-3xl text-2xl font-bold mb-2 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {scholarship?.scholarshipName}
                    </h1>
                    <div className="flex items-center gap-2 opacity-70">
                      <LocationOn fontSize="small" className="text-sky-500" />
                      <span className="text-sm font-semibold">
                        {scholarship?.universityName},{" "}
                        {scholarship?.universityCountry}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl border ${
                      theme === "dark"
                        ? "border-slate-700 bg-slate-800"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <p className="text-[10px] uppercase font-bold opacity-50">
                      World Rank
                    </p>
                    <p className="text-xl font-black text-sky-500">
                      #{scholarship?.universityWorldRank || "N/A"}
                    </p>
                  </div>
                </div>

                <Divider className="opacity-10" />

                {/* Details Grid - sm:text-lg Rule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
                      <CalendarToday />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Deadline
                      </p>
                      <p className="sm:text-lg text-sm font-bold text-orange-500">
                        {formatDate(scholarship?.applicationDeadline)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                      <MonetizationOn />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Application Fees
                      </p>
                      <p className="sm:text-lg text-sm font-bold">
                        ${scholarship?.applicationFees || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
                      <School />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Subject Category
                      </p>
                      <p className="sm:text-lg text-sm font-bold">
                        {scholarship?.subjectCategory}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-500">
                      <Public />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Service Charge
                      </p>
                      <p className="sm:text-lg text-sm font-bold">
                        ${scholarship?.serviceCharge || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={handleApply}
                    className="w-full sm:w-auto sm:px-10 px-4 sm:py-4 py-4 bg-linear-to-r from-purple-600 to-sky-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-sky-500/20 transition-all hover:scale-[1.02]"
                  >
                    Apply for Scholarship
                  </button>
                  <div className="flex items-center gap-3">
                    <Rating value={avgRating} precision={0.5} readOnly />
                    <span className="font-bold opacity-60">
                      ({reviews.length} Reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* REVIEWS SECTION */}
            <div
              className={`p-8 rounded-4xl border ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              <h2
                className={`md:text-2xl text-xl font-bold mb-8 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                Student <span className="text-sky-500">Reviews</span>
              </h2>

              {loadingReviews ? (
                <DataLoader />
              ) : reviews.length === 0 ? (
                <div className="text-center py-10 opacity-50 italic">
                  No reviews yet for this scholarship.
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((r) => (
                    <div
                      key={r._id}
                      className={`p-6 rounded-3xl border transition-all ${
                        theme === "dark"
                          ? "bg-slate-800/50 border-slate-700"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar
                          src={r.userImage}
                          className="w-12 h-12 border-2 border-sky-500"
                        />
                        <div>
                          <p className="font-bold">{r.userName}</p>
                          <p className="text-[10px] opacity-50 uppercase tracking-widest">
                            {formatDate(r.reviewDate)}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Rating value={r.ratingPoint} size="small" readOnly />
                        </div>
                      </div>
                      <p className="sm:text-lg text-xs italic opacity-80 leading-relaxed">
                        "{r.reviewComment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:w-1/3 space-y-8">
            {/* Quick Summary Card */}
            <div
              className={`p-8 rounded-4xl border sticky top-24 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-2xl"
                  : "bg-white border-gray-100 shadow-xl"
              }`}
            >
              <h3
                className={`md:text-2xl text-xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                You May <span className="text-purple-500">Also Like</span>
              </h3>

              {loadingRecs ? (
                <DataLoader />
              ) : (
                <div className="space-y-6">
                  {recommendations.map((rec) => (
                    <Link
                      to={`/scholarship-details/${rec._id}`}
                      key={rec._id}
                      className="group flex gap-4 items-center"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                        <img
                          src={rec.universityImage}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm line-clamp-1 group-hover:text-sky-500 transition-colors">
                          {rec.scholarshipName}
                        </h4>
                        <p className="text-[10px] opacity-60 uppercase font-bold mt-1">
                          {rec.universityName}
                        </p>
                        <p className="text-xs font-bold text-purple-500 mt-1">
                          ${rec.applicationFees}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div
                className={`mt-10 p-6 rounded-3xl text-center ${
                  theme === "dark" ? "bg-slate-800/50" : "bg-sky-50"
                }`}
              >
                <p className="text-xs font-bold opacity-60 mb-2 uppercase">
                  Need Help?
                </p>
                <p className="text-sm mb-4">
                  Questions about this scholarship?
                </p>
                <Link
                  to="/career"
                  className="text-sky-500 font-bold hover:underline"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
