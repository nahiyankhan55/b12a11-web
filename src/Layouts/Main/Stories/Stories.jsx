import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";

const Stories = () => {
  const { theme } = useContext(WebContext);

  const successStories = [
    {
      id: 1,
      name: "Sam Danial",
      university: "Oxford University, UK",
      scholarship: "Full Bright Scholarship",
      image: "https://i.ibb.co.com/HDRPsfZF/e2.jpg",
      story:
        "ScholarStream helped me navigate the complex documentation process. I never thought I'd make it to Oxford!",
    },
    {
      id: 2,
      name: "Sarah Khan",
      university: "Stanford University, USA",
      scholarship: "Global Excellence Award",
      image: "https://i.ibb.co.com/dsWvkxGh/e3.jpg",
      story:
        "The direct communication with university moderators through this platform was a game changer for my application.",
    },
    {
      id: 3,
      name: "V. Sue",
      university: "Toronto University, Canada",
      scholarship: "Master's Merit Grant",
      image:
        "https://i.ibb.co.com/1Gygq86Q/photo-1500648767791-00dcc994a43e.avif",
      story:
        "Finding a scholarship that matched my GPA was so easy. Today I am studying in Canada for free!",
    },
    {
      id: 4,
      name: "Ryni K.",
      university: "Sydney University, Australia",
      scholarship: "Endeavour Scholarship",
      image:
        "https://i.ibb.co.com/vCjXZ0W8/photo-1494790108377-be9c29b29330.avif",
      story:
        "I highly recommend ScholarStream to every student who dreams of studying abroad with financial aid.",
    },
  ];

  return (
    <div
      className={`w-full min-h-screen py-16 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>Success Stories || ScholarStream</Title>
      </HeadProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Section - 3xl Rule */}
        <div className="mb-16 text-center border-b border-gray-200 dark:border-gray-800 pb-10">
          <h1
            className={`md:text-3xl text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Success <span className="text-sky-500">Stories</span>
          </h1>
          <p className="sm:text-lg text-sm font-medium opacity-70">
            Inspiring journeys of students who reached their dream universities
            via ScholarStream.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {successStories.map((item) => (
            <div
              key={item.id}
              className={`group p-6 rounded-4xl border transition-all duration-500 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 hover:border-sky-500/50 shadow-2xl shadow-black/20"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-sky-500/20 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                  {/* Title Rule - 2xl */}
                  <h3
                    className={`md:text-2xl sm:text-xl text-lg font-bold mb-1 ${
                      theme === "dark" ? "text-white" : "text-purple-900"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sky-500 font-bold sm:text-base text-sm mb-3">
                    {item.university}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${
                      theme === "dark"
                        ? "bg-slate-800 text-sky-400"
                        : "bg-sky-50 text-sky-600"
                    }`}
                  >
                    {item.scholarship}
                  </span>

                  {/* Story Text Rule - xs/lg */}
                  <p
                    className={`sm:text-lg text-xs leading-relaxed opacity-80 italic font-medium relative`}
                  >
                    <span className="text-4xl absolute -top-4 -left-2 opacity-20 font-serif">
                      "
                    </span>
                    {item.story}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Footer */}
        <div
          className={`mt-20 p-10 rounded-[2.5rem] text-center border ${
            theme === "dark"
              ? "bg-slate-900/50 border-slate-800"
              : "bg-purple-50 border-purple-100"
          }`}
        >
          <h2
            className={`md:text-2xl text-xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Want to be our next Success Story?
          </h2>
          <p className="mb-8 opacity-75 sm:text-base text-sm max-w-2xl mx-auto">
            Apply today and start your journey towards world-class education
            with the right financial support.
          </p>
          <Link
            to={"/all-scholarships"}
            className="sm:px-8 px-4 py-3 bg-linear-to-r from-purple-600 to-sky-500 hover:from-purple-700 hover:to-sky-600 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-sky-500/20"
          >
            Apply For Scholarship
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Stories;
