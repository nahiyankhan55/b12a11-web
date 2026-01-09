import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const Terms = () => {
  const { theme } = useContext(WebContext);

  const termSections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "By accessing, browsing, or using the ScholarStream platform, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, you must immediately discontinue use of our services. These terms constitute a legally binding agreement between you and ScholarStream regarding your use of the website and services.",
    },
    {
      id: "eligibility",
      title: "2. User Eligibility & Account",
      content:
        "To use certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your password and for all activities that occur under your account. ScholarStream reserves the right to suspend or terminate accounts that provide false information or violate security protocols.",
    },
    {
      id: "scholarships",
      title: "3. Scholarship Applications & Accuracy",
      content:
        "ScholarStream acts as a facilitator between students and universities. While we strive to maintain the most accurate and up-to-date database of scholarships, we do not guarantee the availability, accuracy, or success of any scholarship listed. Users are responsible for verifying deadlines and requirements directly with the providing institutions. Any application fees paid are generally non-refundable unless specified otherwise by the university.",
    },
    {
      id: "conduct",
      title: "4. Prohibited Conduct",
      content:
        "Users agree not to: (a) Use the platform for any illegal purpose; (b) Post or upload fraudulent documents; (c) Interfere with or disrupt the integrity or performance of the platform; (d) Attempt to gain unauthorized access to our systems or networks. Any violation of these rules may lead to permanent banning and legal action.",
    },
    {
      id: "liability",
      title: "5. Limitation of Liability",
      content:
        "To the maximum extent permitted by law, ScholarStream shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of the services.",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Section - 3xl Rule */}
        <div className="mb-16 text-center lg:text-left border-b border-gray-200 dark:border-gray-800 pb-10">
          <h1
            className={`md:text-3xl text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Terms and <span className="text-sky-500">Conditions</span>
          </h1>
          <p className="text-lg font-medium opacity-70">
            Last Updated: January 10, 2026 • Version 2.1
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Sticky Navigation */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div
              className={`sticky! top-24 p-8 rounded-3xl border transition-all duration-300 ${
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
                {termSections.map((section) => (
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
                Welcome to ScholarStream. These terms and conditions outline the
                rules and regulations for the use of our website and services.
                By accessing this platform, we assume you accept these terms in
                full.
              </p>

              <div className="space-y-16">
                {termSections.map((section) => (
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
                  Legal Assistance
                </h4>
                <p className="mb-4 leading-relaxed sm:text-base text-sm">
                  If you have questions regarding our Terms and Conditions, our
                  legal team is available for clarification.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <a
                    href="mailto:legal@scholarstream.com"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20"
                  >
                    Email Support
                  </a>
                  <span className="text-sky-500 font-bold tracking-wide sm:text-base text-sm">
                    legal@scholarstream.com
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

export default Terms;
