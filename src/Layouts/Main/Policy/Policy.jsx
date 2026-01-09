import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import { HeadProvider, Title } from "react-head";

const Policy = () => {
  const { theme } = useContext(WebContext);

  const policySections = [
    {
      id: "collection",
      title: "1. Information Collection",
      content:
        "We collect personal data that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our services, or when you participate in activities on the platform. This includes names, email addresses, academic transcripts, and contact preferences.",
    },
    {
      id: "usage",
      title: "2. How We Use Your Data",
      content:
        "The information we collect is used primarily to facilitate the scholarship application process. This involves verifying your identity, communicating with you regarding your application status, and sharing necessary documents with the respective universities you apply to.",
    },
    {
      id: "security",
      title: "3. Data Security",
      content:
        "We implement a variety of technical and organizational security measures designed to protect the security of any personal information we process. This includes industry-standard SSL encryption and restricted-access cloud servers for stored documents.",
    },
    {
      id: "cookies",
      title: "4. Cookies and Tracking",
      content:
        "We may use cookies and similar tracking technologies to access or store information. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.",
    },
    {
      id: "rights",
      title: "5. Your Privacy Rights",
      content:
        "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete the data we hold about you. You can manage these settings from your dashboard.",
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
        <Title>Privacy Policy || ScholarStream</Title>
      </HeadProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Section - 3xl Rule */}
        <div className="mb-16 text-center lg:text-left border-b border-gray-200 dark:border-gray-800 pb-10">
          <h1
            className={`md:text-3xl text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Privacy <span className="text-sky-500">Policy</span>
          </h1>
          <p className="text-lg font-medium opacity-70 italic">
            Your privacy is our priority. We are committed to protecting your
            personal information.
          </p>
        </div>

        {/* items-start ensures sticky works */}
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
                Contents
              </h4>
              <nav className="flex flex-col gap-4">
                {policySections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm hover:text-sky-500 transition-colors duration-200 font-semibold flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {section.title.split(".")[1]}
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
              <p className="sm:text-lg text-sm leading-relaxed mb-12 opacity-80">
                At ScholarStream, we take your privacy seriously. This policy
                describes how we collect, protect, and use the personal
                information you provide on our platform.
              </p>

              <div className="space-y-16">
                {policySections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 transition-all"
                  >
                    {/* Section Title - 2xl Rule */}
                    <h3
                      className={`md:text-2xl sm:text-xl text-lg font-bold mb-5 flex items-center flex-wrap gap-3 ${
                        theme === "dark" ? "text-white" : "text-purple-800"
                      }`}
                    >
                      <span className="text-sky-500 text-sm font-mono bg-sky-500/10 px-2 py-1 rounded">
                        SEC-{section.id.toUpperCase()}
                      </span>
                      {section.title}
                    </h3>
                    <p className="sm:text-lg text-xs leading-relaxed opacity-80 font-medium">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact Footer Card */}
              <div
                className={`mt-20 sm:p-8 p-2 rounded-3xl border-l-4 border-sky-500 ${
                  theme === "dark"
                    ? "bg-slate-800/50 text-gray-300"
                    : "bg-sky-50 text-gray-700"
                }`}
              >
                <h4
                  className={`sm:text-xl text-lg font-bold mb-3 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Data Privacy Support
                </h4>
                <p className="mb-4 leading-relaxed sm:text-base text-sm">
                  If you have concerns about how your data is handled, our Data
                  Protection Officer is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <a
                    href="mailto:privacy@scholarstream.com"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20"
                  >
                    Contact DPO
                  </a>
                  <span className="text-sky-500 font-bold tracking-wide sm:text-base text-sm">
                    privacy@scholarstream.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
