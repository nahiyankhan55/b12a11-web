import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const TopUniversities = () => {
  const { theme } = useContext(WebContext);

  const universities = [
    {
      id: 1,
      name: "Harvard University",
      location: "USA",
      logo: "https://i.ibb.co.com/4ZN3VnFT/Harvard.webp",
    },
    {
      id: 2,
      name: "Oxford University",
      location: "UK",
      logo: "https://i.ibb.co.com/V05Pj0TN/Oxford.jpg",
    },
    {
      id: 3,
      name: "Stanford University",
      location: "USA",
      logo: "https://i.ibb.co.com/x8S55NsN/Stanford.jpg",
    },
    {
      id: 4,
      name: "Cambridge University",
      location: "UK",
      logo: "https://i.ibb.co.com/gFDgD1SV/Cambridge.jpg",
    },
    {
      id: 5,
      name: "MIT",
      location: "USA",
      logo: "https://i.ibb.co.com/KcB2MYsq/MIT.jpg",
    },
    {
      id: 6,
      name: "National University",
      location: "Singapore",
      logo: "https://i.ibb.co.com/nsv0KTv5/National-University.jpg",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Global Title Theme */}
        <div className="text-center mb-12">
          <h2
            className={`md:text-3xl text-2xl font-bold mb-3 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Top Partner Universities
          </h2>
          <div className="w-20 h-1.5 bg-sky-500 mx-auto rounded-full mb-4"></div>
          <p
            className={`max-w-2xl mx-auto sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We are proud to collaborate with world-renowned institutions to
            provide you with the best scholarship opportunities globally.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
          {universities.map((uni, index) => (
            <div
              key={uni.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`group flex flex-col items-center rounded-2xl transition-all overflow-hidden duration-300 ${
                theme === "dark"
                  ? "bg-slate-800/50 hover:bg-slate-800 border border-slate-700"
                  : "bg-gray-50 hover:bg-white border border-transparent hover:border-sky-200 hover:shadow-xl"
              }`}
            >
              {/* Logo Placeholder (Grayscale by default, colorful on hover) */}
              <div
                className={`h-28 w-full mb-4 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                  theme !== "dark" && "grayscale group-hover:grayscale-0"
                }`}
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="max-w-full max-h-full w-full object-cover h-full"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=Uni+Logo";
                  }}
                />
              </div>

              <h4
                className={`text-sm font-bold text-center line-clamp-1 ${
                  theme === "dark" ? "text-purple-300" : "text-purple-900"
                }`}
              >
                {uni.name}
              </h4>
              <p className="text-xs text-gray-500 font-medium pb-5">
                {uni.location}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Mention */}
        <div
          className={`mt-12 text-center py-6 px-4 rounded-2xl border-2 border-dashed ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800/30"
              : "border-purple-100 bg-purple-50/30"
          }`}
        >
          <p
            className={`text-sm md:text-base font-medium ${
              theme === "dark" ? "text-gray-300" : "text-purple-800"
            }`}
          >
            Collaborating with{" "}
            <span className="text-sky-500 font-bold">100+ Universities</span>{" "}
            and <span className="text-purple-600 font-bold">50+ Countries</span>{" "}
            worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopUniversities;
