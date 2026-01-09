import { useContext } from "react";
import { Link } from "react-router";
import {
  HiAcademicCap,
  HiLightBulb,
  HiGlobeAlt,
  HiBeaker,
  HiBriefcase,
  HiOutlineUserGroup,
} from "react-icons/hi";
import WebContext from "../../../Context/WebContext";

const ScholarshipCategories = () => {
  const { theme } = useContext(WebContext);

  const categories = [
    {
      id: 1,
      name: "Merit-Based",
      description:
        "For students with exceptional academic or artistic achievements.",
      icon: <HiAcademicCap />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 2,
      name: "Need-Based",
      description:
        "Financial assistance for students with limited economic resources.",
      icon: <HiLightBulb />,
      color: "text-sky-500",
      bgColor: "bg-sky-100 dark:bg-sky-900/30",
    },
    {
      id: 3,
      name: "International",
      description:
        "Opportunities for students planning to study in a foreign country.",
      icon: <HiGlobeAlt />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 4,
      name: "Research-Based",
      description:
        "Funding for post-graduate students pursuing specific research goals.",
      icon: <HiBeaker />,
      color: "text-sky-500",
      bgColor: "bg-sky-100 dark:bg-sky-900/30",
    },
    {
      id: 5,
      name: "Career-Specific",
      description:
        "Scholarships for students pursuing a specific profession or major.",
      icon: <HiBriefcase />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 6,
      name: "Community-Service",
      description:
        "For individuals showing outstanding leadership and volunteering.",
      icon: <HiOutlineUserGroup />,
      color: "text-sky-500",
      bgColor: "bg-sky-100 dark:bg-sky-900/30",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-gray-50"
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
            Explore Categories
          </h2>
          <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full mb-4"></div>
          <p
            className={`max-w-2xl mx-auto sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Find the right funding opportunity by browsing through our diverse
            range of scholarship categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 50}
              className={`group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 border ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 shadow-lg shadow-black/20"
                  : "bg-white border-white shadow-xl shadow-gray-200/50 hover:border-purple-200"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110 shadow-inner ${cat.bgColor} ${cat.color}`}
              >
                {cat.icon}
              </div>

              <h3
                className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-purple-300"
                    : "text-slate-800 group-hover:text-purple-700"
                }`}
              >
                {cat.name}
              </h3>

              <p
                className={`text-sm leading-relaxed mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {cat.description}
              </p>

              <Link
                to="/all-scholarships"
                className={`text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "text-sky-400 hover:text-sky-300"
                    : "text-purple-600 hover:text-purple-800"
                }`}
              >
                View Scholarships
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipCategories;
