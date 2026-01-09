import { useContext } from "react";
import {
  FaUserPlus,
  FaSearch,
  FaFileUpload,
  FaCheckCircle,
} from "react-icons/fa";
import WebContext from "../../../Context/WebContext";

const HowItWorks = () => {
  const { theme } = useContext(WebContext);

  const steps = [
    {
      id: 1,
      title: "Create Account",
      description:
        "Sign up and build your profile to get personalized scholarship matches.",
      icon: <FaUserPlus />,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      id: 2,
      title: "Find Scholarships",
      description:
        "Explore our vast database of global opportunities using advanced filters.",
      icon: <FaSearch />,
      color: "bg-sky-100 text-sky-500 dark:bg-sky-900/30 dark:text-sky-400",
    },
    {
      id: 3,
      title: "Submit Application",
      description:
        "Fill out forms, pay fees securely, and upload required documents easily.",
      icon: <FaFileUpload />,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      id: 4,
      title: "Get Funded",
      description:
        "Track your status and receive your scholarship once approved by moderators.",
      icon: <FaCheckCircle />,
      color: "bg-sky-100 text-sky-500 dark:bg-sky-900/30 dark:text-sky-400",
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
            How It Works
          </h2>
          <div className="w-20 h-1.5 bg-sky-500 mx-auto rounded-full mb-4"></div>
          <p
            className={`max-w-2xl mx-auto sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Starting your academic journey is simple. Follow these four easy
            steps to secure your funding through ScholarStream.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative group"
            >
              {/* Connector Line for Desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-2/3 w-full h-0.5 border-t-2 border-dashed border-gray-300 dark:border-gray-700 z-0"></div>
              )}

              <div
                className={`relative z-10 p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl border ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-100 shadow-lg shadow-gray-200/50"
                }`}
              >
                {/* Step Number Circle */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.id}
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 transition-transform group-hover:scale-110 duration-300 ${step.color}`}
                >
                  {step.icon}
                </div>

                <h3
                  className={`text-xl font-bold mb-3 ${
                    theme === "dark" ? "text-purple-300" : "text-slate-800"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
