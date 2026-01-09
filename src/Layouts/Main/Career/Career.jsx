import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import { HeadProvider, Title } from "react-head";

const Career = () => {
  const { theme } = useContext(WebContext);

  const jobRoles = [
    {
      id: "support-exec",
      title: "Student Support Executive",
      details:
        "As a Student Support Executive, you will be the first point of contact for students navigating our platform. Your goal is to provide exceptional guidance regarding scholarship documentation and application tracking.",
      requirements: [
        "Excellent communication skills in English and Bengali.",
        "Basic understanding of international university admission processes.",
        "Ability to handle multiple student queries simultaneously.",
        "Proficiency in Microsoft Office and Google Workspace.",
      ],
    },
    {
      id: "relation-exec",
      title: "Student Relation Executive",
      details:
        "This role focuses on building long-term relationships with our student community. You will conduct follow-ups, gather feedback, and ensure that every student has a smooth journey from application to enrollment.",
      requirements: [
        "Bachelor's degree in any discipline (final year students can apply).",
        "Strong interpersonal and problem-solving skills.",
        "Experience in customer service or tele-counseling is a plus.",
        "A positive, empathetic, and student-first mindset.",
      ],
    },
    {
      id: "tech-support",
      title: "Technical Support Executive",
      details:
        "You will assist students and university moderators with technical issues related to account access, document uploads, and platform navigation. You'll work closely with our dev team to report bugs.",
      requirements: [
        "Knowledge of basic web troubleshooting and browser issues.",
        "Familiarity with CRM tools and ticket management systems.",
        "Strong analytical skills to diagnose technical problems.",
        "Patience and the ability to explain technical steps to non-tech users.",
      ],
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
        <Title>Career || ScholarStream</Title>
      </HeadProvider>
      <div className="max-w-7xl mx-auto px-2 sm:px-8">
        {/* Header Section - 3xl Rule */}
        <div className="mb-16 text-center lg:text-left border-b border-gray-200 dark:border-gray-800 pb-10">
          <h1
            className={`md:text-3xl text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Join Our <span className="text-sky-500">Team</span>
          </h1>
          <p className="sm:text-lg text-sm font-medium opacity-70">
            Build your career with ScholarStream and help students achieve their
            global dreams.
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
                Open Roles
              </h4>
              <nav className="flex flex-col gap-4">
                {jobRoles.map((job) => (
                  <a
                    key={job.id}
                    href={`#${job.id}`}
                    className="text-sm hover:text-sky-500 transition-colors duration-200 font-semibold flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {job.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Side: Job Details */}
          <div className="lg:w-3/4">
            <div
              className={`p-4 sm:p-8 md:p-12 rounded-4xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-900/50 border-slate-800"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              <div className="space-y-20">
                {jobRoles.map((job) => (
                  <div key={job.id} id={job.id} className="scroll-mt-24">
                    {/* Role Title - 2xl Rule */}
                    <h3
                      className={`md:text-2xl sm:text-xl text-lg font-bold mb-4 ${
                        theme === "dark" ? "text-white" : "text-purple-800"
                      }`}
                    >
                      {job.title}
                    </h3>
                    <p className="sm:text-lg text-xs leading-relaxed opacity-80 mb-6 font-medium">
                      {job.details}
                    </p>

                    <h4 className="text-sky-500 font-bold mb-3 sm:text-base text-sm uppercase tracking-wider">
                      Requirements:
                    </h4>
                    <ul className="space-y-3">
                      {job.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 sm:text-base text-xs opacity-75"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Application Footer - NO BUTTON */}
              <div
                className={`mt-24 sm:p-8 p-2 rounded-3xl border-2 border-dashed text-center ${
                  theme === "dark"
                    ? "bg-slate-800/30 border-slate-700"
                    : "bg-purple-50 border-purple-100"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    theme === "dark" ? "text-white" : "text-purple-900"
                  }`}
                >
                  How to Apply?
                </h3>
                <p className="sm:text-lg text-sm mb-6 opacity-80">
                  We are looking for passionate individuals. If you match any of
                  the roles above, please send your updated CV and a cover
                  letter to:
                </p>
                <div className="inline-block sm:px-8 sm:py-4 px-4 p-2 sm:w-fit w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-sky-500/30">
                  <p className="text-sky-500 font-black sm:text-2xl text-lg tracking-tight">
                    hr@scholarstream.com
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mt-1 text-black">
                    Direct Recruitment Email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
