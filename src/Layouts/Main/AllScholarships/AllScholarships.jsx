import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { Link } from "react-router";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DataLoader from "../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";

const AllScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["scholarships", search, category, sortBy, order, page],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships", {
        params: { search, category, sortBy, order, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const scholarships = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // MUI Custom Styles based on Theme
  const muiStyles = {
    "& .MuiOutlinedInput-root": {
      color: theme === "dark" ? "#cbd5e1" : "#334155",
      "& fieldset": { borderColor: theme === "dark" ? "#334155" : "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#0ea5e9" },
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
    },
  };

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold">Failed to load scholarships.</p>
      </div>
    );

  return (
    <div
      className={`w-full min-h-screen py-16 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>All Scholarships || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center lg:text-left border-b border-gray-200 dark:border-gray-800 pb-10">
          <h1
            className={`md:text-3xl text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            All Available <span className="text-sky-500">Scholarships</span>
          </h1>
          <p className="sm:text-lg text-sm font-medium opacity-70">
            Explore {data?.data?.length || 0} opportunities to fund your
            academic dreams.
          </p>
        </div>

        {/* Filter Section */}
        <div
          data-aos="flip-up"
          className={`p-6 rounded-3xl border mb-12 flex flex-col md:flex-row items-center gap-6 transition-all ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <TextField
            label="Search name or university..."
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={muiStyles}
            className="md:w-1/2"
          />

          <FormControl fullWidth className="md:w-1/4" sx={muiStyles}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Full fund">Full Fund</MenuItem>
              <MenuItem value="Partial">Partial</MenuItem>
              <MenuItem value="Self-fund">Self Fund</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth className="md:w-1/4" sx={muiStyles}>
            <InputLabel>Sort By</InputLabel>
            <Select
              label="Sort By"
              value={`${sortBy}-${order}`}
              onChange={(e) => {
                const [sb, ord] = e.target.value.split("-");
                setSortBy(sb);
                setOrder(ord);
              }}
            >
              <MenuItem value="-">Default</MenuItem>
              <MenuItem value="fees-asc">Fees (Low → High)</MenuItem>
              <MenuItem value="fees-desc">Fees (High → Low)</MenuItem>
              <MenuItem value="date-desc">Newest First</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Grid Section */}
        {isLoading ? (
          <DataLoader />
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            No scholarships found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((item) => (
              <div
                data-aos="zoom-in"
                key={item._id}
                className={`group rounded-4xl border overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-800 hover:border-sky-500/50"
                    : "bg-white border-gray-100 shadow-sm hover:shadow-xl"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.universityImage}
                    alt={item.universityName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-sky-500 text-white text-[10px] font-bold uppercase rounded-full">
                    {item.scholarshipCategory}
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className={`md:text-xl text-lg font-bold mb-2 line-clamp-1 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.scholarshipName}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 opacity-70">
                    <span className="text-xs font-bold text-sky-500 uppercase tracking-widest">
                      {item.universityName}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className="text-xs font-medium">
                      {item.universityCountry}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-800">
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        App. Fees
                      </p>
                      <p className="text-lg font-bold text-purple-500">
                        ${item.applicationFees}
                      </p>
                    </div>
                    <Link
                      to={`/scholarship-details/${item._id}`}
                      className="px-5 py-2 bg-linear-to-r from-purple-600 to-sky-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-none transition-all"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              theme === "dark"
                ? "bg-slate-800 text-white disabled:opacity-20"
                : "bg-white shadow-sm disabled:opacity-50"
            }`}
          >
            Prev
          </button>
          <span className="text-sm font-bold opacity-60">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 bg-sky-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/20 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;
