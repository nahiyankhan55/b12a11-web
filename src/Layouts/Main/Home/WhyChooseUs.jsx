import { useContext } from "react";
import { FaGraduationCap, FaGlobeAsia, FaCertificate } from "react-icons/fa";
import WebContext from "../../../Context/WebContext";

const WhyChooseUs = () => {
  const { theme } = useContext(WebContext);

  // Reusable Card Style
  const cardStyle = `p-8 rounded-2xl text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border ${
    theme === "dark"
      ? "bg-slate-800 border-slate-700 shadow-purple-900/10"
      : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
  }`;

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
            Why Choose ScholarStream?
          </h2>
          <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full mb-4"></div>
          <p
            className={`max-w-2xl mx-auto sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Empowering your academic journey with the most reliable and
            efficient scholarship management system worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Verified Scholarships */}
          <div data-aos="fade-up" className={cardStyle}>
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
              <FaGraduationCap />
            </div>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === "dark" ? "text-purple-300" : "text-slate-800"
              }`}
            >
              Verified Scholarships
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } leading-relaxed`}
            >
              We partner with global institutions to bring you 100% authentic
              and vetted scholarship opportunities.
            </p>
          </div>

          {/* Card 2 - Worldwide Access */}
          <div data-aos="fade-up" data-aos-delay="100" className={cardStyle}>
            <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
              <FaGlobeAsia />
            </div>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === "dark" ? "text-sky-300" : "text-slate-800"
              }`}
            >
              Worldwide Access
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } leading-relaxed`}
            >
              Explore educational funding from top-tier universities across
              Asia, Europe, America, and beyond.
            </p>
          </div>

          {/* Card 3 - Easy Application */}
          <div data-aos="fade-up" data-aos-delay="200" className={cardStyle}>
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
              <FaCertificate />
            </div>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === "dark" ? "text-purple-300" : "text-slate-800"
              }`}
            >
              Easy Application
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } leading-relaxed`}
            >
              Our streamlined portal allows you to apply, track, and manage your
              documents with just a few clicks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
