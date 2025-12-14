import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

// MUI
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DataLoader from "../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";

const AllScholarships = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const {
    data: scholarships = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["scholarships", search, category, sortBy, order],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships", {
        params: {
          search,
          category,
          sortBy,
          order,
        },
      });
      return res.data;
    },
  });

  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load scholarships.
      </p>
    );

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
      <HeadProvider>
        <Title>All Scholarships || ScholarStream</Title>
      </HeadProvider>
      <h1 className="lg:text-4xl md:text-3xl text-2xl text-center font-bold mb-6">
        All Scholarships
      </h1>

      {/* Search + Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 max-w-4xl mx-auto">
        {/* MUI Search Input */}
        <TextField
          label="Search by name, university..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            refetch();
          }}
          className="md:w-1/2"
        />

        {/* MUI Select */}
        <FormControl fullWidth className="md:w-1/4">
          <InputLabel>Category</InputLabel>

          <Select
            value={category}
            label="Category"
            onChange={(e) => {
              setCategory(e.target.value);
              refetch();
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Full Fund">Full Fund</MenuItem>
            <MenuItem value="Partial">Partial</MenuItem>
            <MenuItem value="Self-Fund">Self Fund</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth className="md:w-1/4">
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
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="fees-asc">Application Fees (Low → High)</MenuItem>
            <MenuItem value="fees-desc">Application Fees (High → Low)</MenuItem>
            <MenuItem value="date-desc">Newest First</MenuItem>
            <MenuItem value="date-asc">Oldest First</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Scholarships Grid */}
      {isLoading ? (
        <DataLoader></DataLoader>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((item) => (
            <div
              data-aos="zoom-in"
              key={item._id}
              className="card bg-white shadow-md border rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition duration-300"
            >
              <figure>
                <img
                  src={item.universityImage}
                  alt={item.universityName}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {item.scholarshipName}
                </h2>

                <p className="text-sm text-gray-600">
                  {item.universityName}, {item.universityCountry}
                </p>

                <p className="text-sm mt-1">
                  <span className="font-semibold">Category: </span>
                  {item.scholarshipCategory}
                </p>

                <p className="text-sm mt-1">
                  <span className="font-semibold">Application Fees: </span>
                  {item.applicationFees} $
                </p>

                {/* MUI-style Button with Tailwind */}
                <div className="mt-4">
                  <a
                    href={`/scholarship-details/${item._id}`}
                    className="w-full block text-center bg-[#1976d2] hover:bg-[#115293] text-white font-medium py-2 px-4 rounded-md transition-all"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {scholarships.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No scholarships found.
        </p>
      )}
    </div>
  );
};

export default AllScholarships;
