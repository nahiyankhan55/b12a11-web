import { useContext, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import WebContext from "../../../Context/WebContext";

const FAQSection = () => {
  const { theme } = useContext(WebContext);
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I start my scholarship application process?",
      answer:
        "Getting started with ScholarStream is a straightforward four-step process. First, you need to register an account using your email or Google login. Once registered, complete your profile with accurate academic details.",
    },
    {
      question: "Are there any hidden costs fees for using this platform?",
      answer:
        "ScholarStream is a transparent platform dedicated to student success. While browsing and searching for scholarships is completely free for everyone, some specific universities or scholarship providers may require a processing fee for document verification and application handling.",
    },
    {
      question: "Can I track my application progress?",
      answer:
        "Yes, our platform provides a comprehensive tracking system within your personalized dashboard. Every application you submit is listed with its current lifecycle status, ranging from document verification to the final university decision.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`w-full py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Global Title Theme */}
        <div className="text-center mb-16">
          <h2
            className={`md:text-3xl text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-purple-900"
            }`}
          >
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full mb-6"></div>
          <p
            className={`max-w-3xl mx-auto sm:text-lg text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We understand that applying for international scholarships can be
            complex. Here are detailed answers to the most common questions our
            students ask.
          </p>
        </div>

        {/* Accordion List with 7xl friendly layout */}
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-3xl overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? theme === "dark"
                    ? "bg-slate-800 border-purple-500/50 shadow-2xl shadow-purple-900/20"
                    : "bg-white border-purple-200 shadow-xl shadow-purple-100"
                  : theme === "dark"
                  ? "bg-slate-800/40 border-slate-700 hover:border-slate-500"
                  : "bg-gray-50 border-gray-100 hover:border-gray-200 shadow-sm"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-all"
              >
                <span
                  className={`font-bold md:text-lg text-base pr-4 ${
                    openIndex === index
                      ? "text-purple-600 dark:text-purple-400"
                      : theme === "dark"
                      ? "text-gray-200"
                      : "text-slate-800"
                  }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`p-2 rounded-full transition-all duration-300 ${
                    openIndex === index
                      ? "bg-purple-100 dark:bg-purple-900/50"
                      : "bg-gray-200 dark:bg-slate-700"
                  }`}
                >
                  <HiChevronDown
                    className={`text-2xl transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-purple-600"
                        : "text-gray-500"
                    }`}
                  />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className={`p-6 md:p-8 pt-0 md:text-base text-sm leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <div className="h-[1.5px] w-full bg-linear-to-r from-purple-500/20 via-sky-500/20 to-transparent mb-6"></div>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
