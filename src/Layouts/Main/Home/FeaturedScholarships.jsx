import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { Link } from "react-router";
import { useContext } from "react";
import { HiOutlineLocationMarker, HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineAttachMoney } from "react-icons/md";
import WebContext from "../../../Context/WebContext";

const FeaturedScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home/scholarships");
      return res.data;
    },
    retry: 1,
  });

  if (isError)
    return (
      <div className="text-center text-red-500 py-10 font-bold">
        ⚠️ Failed to load scholarships. Please try again.
      </div>
    );

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Global Title Theme Applied */}
        <h1
          className={`md:text-3xl text-2xl font-bold text-center ${
            theme === "dark" ? "text-white" : "text-purple-900"
          }`}
        >
          Featured Scholarships
        </h1>
        <div className="w-20 h-1 bg-purple-600 mx-auto mt-3 rounded-full"></div>

        <p
          className={`max-w-2xl text-center mx-auto mt-4 sm:text-base text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Discover top-rated opportunities from global universities. Our curated
          list helps you find the perfect financial match for your academic
          journey.
        </p>

        {isLoading ? (
          <DataLoader />
        ) : (
          <>
            {scholarships.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No featured scholarships available.
              </p>
            ) : (
              /* Grid 4 columns for desktop as requested */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {scholarships.map((item) => (
                  <div
                    data-aos="fade-up"
                    key={item._id}
                    className={`group border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:-translate-y-2 ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 shadow-purple-900/10"
                        : "bg-white border-gray-100 shadow-md"
                    }`}
                  >
                    {/* Image Section with Mask/Overlay */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={item.universityImage}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt="university"
                      />
                      <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {item.scholarshipCategory}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <h2
                        className={`text-lg font-bold line-clamp-1 ${
                          theme === "dark"
                            ? "text-purple-300"
                            : "text-purple-900"
                        }`}
                      >
                        {item.scholarshipName}
                      </h2>

                      <div
                        className={`space-y-2 flex-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <HiOutlineAcademicCap className="text-sky-500 text-lg" />
                          <span className="line-clamp-1">
                            {item.universityName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <HiOutlineLocationMarker className="text-purple-500 text-lg" />
                          <span>{item.universityCountry}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-bold mt-4">
                          <MdOutlineAttachMoney className="text-green-500 text-xl" />
                          <span
                            className={`${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            Fees: ${item.applicationFees || "0"}
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        to={`/scholarship-details/${item._id}`}
                        className={`mt-4 w-full py-2.5 rounded-xl text-center font-bold transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/40"
                            : "bg-purple-600 hover:bg-purple-900 text-white shadow-lg shadow-purple-200"
                        }`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View All Button to meet UX requirements */}
            <div className="mt-12 text-center">
              <Link
                to="/all-scholarships"
                className="inline-block border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-8 py-2.5 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all"
              >
                See All Scholarships
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedScholarships;
