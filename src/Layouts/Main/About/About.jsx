import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import { HeadProvider, Title } from "react-head";

const About = () => {
  const { theme } = useContext(WebContext);

  const aboutSections = [
    {
      id: "vision",
      title: "Our Vision",
      content:
        "To become the most trusted global bridge between ambitious students and world-class education, ensuring that financial barriers never stand in the way of talent.",
    },
    {
      id: "mission",
      title: "Our Mission",
      content:
        "We simplify the scholarship hunting process through transparency, expert guidance, and a streamlined digital application system that connects students directly with university moderators.",
    },
    {
      id: "values",
      title: "Core Values",
      content:
        "Integrity, Accessibility, and Excellence. We believe every student deserves a fair chance at higher education regardless of their geographic or financial background.",
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
        <Title>About Us || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Section - 3xl Rule */}
        <div className="mb-16 text-center lg:text-left border-b border-gray-200 dark:border-gray-800 pb-10">
          <h1
            className={`md:text-3xl text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            About <span className="text-sky-500">ScholarStream</span>
          </h1>
          <p className="sm:text-lg text-sm font-medium opacity-70">
            Empowering the next generation of global scholars since 2024.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side: Sticky Navigation */}
          <aside className="lg:w-1/4 hidden lg:block sticky top-28">
            <div
              className={`p-8 rounded-3xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <h4
                className={`text-sm font-bold uppercase tracking-widest mb-6 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                Who We Are
              </h4>
              <nav className="flex flex-col gap-4">
                {aboutSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm hover:text-sky-500 transition-colors duration-200 font-semibold flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Side: Detailed Content */}
          <div className="lg:w-3/4">
            <div
              className={`p-4 sm:p-8 md:p-12 rounded-4xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-900/50 border-slate-800"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              {/* Introduction Text - sm:text-lg text-sm Rule */}
              <div className="space-y-6 mb-12">
                <p className="sm:text-lg text-sm leading-relaxed opacity-90 font-medium">
                  Welcome to ScholarStream. We aim to provide a modern, fast,
                  and user-friendly experience for students seeking global
                  opportunities. Our focus is on building clean, efficient, and
                  reliable features that make the complex world of scholarships
                  easy to navigate.
                </p>
                <p className="sm:text-lg text-sm leading-relaxed opacity-80">
                  Through our system, users enjoy secure authentication, a
                  comprehensive dashboard, and organized data management. We
                  follow industry best practices to ensure performance and
                  scalability.
                </p>
              </div>

              {/* Dynamic Sections */}
              <div className="space-y-16">
                {aboutSections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 transition-all"
                  >
                    {/* Section Title - 2xl Rule */}
                    <h3
                      className={`md:text-2xl sm:text-xl text-lg font-bold mb-4 flex items-center gap-3 ${
                        theme === "dark" ? "text-white" : "text-purple-800"
                      }`}
                    >
                      <span className="w-8 h-0.5 bg-sky-500 rounded-full"></span>
                      {section.title}
                    </h3>
                    <p className="sm:text-lg text-xs leading-relaxed opacity-80 font-medium">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stats/Footer Card */}
              <div
                className={`mt-20 p-8 rounded-3xl border-t-4 border-purple-500 text-center ${
                  theme === "dark" ? "bg-slate-800/30" : "bg-purple-50"
                }`}
              >
                <p className="sm:text-lg text-sm italic font-medium opacity-80">
                  "Thank you for being part of our journey. Together, we are
                  opening doors to endless possibilities."
                </p>
                <div className="mt-6 flex justify-center gap-8">
                  <div>
                    <p className="text-sky-500 font-bold text-2xl">50k+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                      Scholars
                    </p>
                  </div>
                  <div className="w-px bg-gray-300 dark:bg-gray-700"></div>
                  <div>
                    <p className="text-purple-500 font-bold text-2xl">120+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                      Universities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
