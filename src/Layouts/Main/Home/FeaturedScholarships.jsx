import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { Link } from "react-router";

const FeaturedScholarships = () => {
  const axiosPublic = useAxiosPublic();

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
      <div className="text-center text-orange-600 py-10">
        Failed to load scholarships.
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <h1 className="md:text-3xl text-2xl font-bold text-center">
        Featured Scholarships
      </h1>
      <p className="text-gray-600 max-w-2xl text-center mx-auto mt-2 sm:text-base text-sm">
        Featured scholarships from top global universities. Find updated
        opportunities and quick access to apply for your best match.
      </p>
      {scholarships.length === 0 && (
        <p className="text-center text-gray-500 py-5">
          No featured scholarships available right now.
        </p>
      )}

      {isLoading ? (
        <DataLoader></DataLoader>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {scholarships.map((item) => (
            <div
              data-aos="zoom-in"
              key={item._id}
              className="border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3"
            >
              <img
                src={item.universityImage}
                className="w-full h-40 mb-2"
                alt="scholarship"
              />
              <h2 className="text-xl font-semibold">{item.scholarshipName}</h2>

              <div>
                <p className="text-sm">
                  <span className="font-semibold">University:</span>{" "}
                  {item.universityName}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Country:</span>{" "}
                  {item.universityCountry}
                </p>

                <p className="text-sm mt-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.scholarshipCategory}
                </p>

                <p className="text-sm mt-2">
                  <span className="font-semibold">Amount:</span> $
                  {item.tuitionFees || "N/A"}
                </p>
              </div>

              <Link
                to={`/scholarship-details/${item._id}`}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg text-center font-medium hover:bg-sky-800 duration-300 hover:shadow-md"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedScholarships;
