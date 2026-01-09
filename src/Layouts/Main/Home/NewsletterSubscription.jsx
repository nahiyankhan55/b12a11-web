import { useContext, useState } from "react";
import WebContext from "../../../Context/WebContext";
import { HiOutlineMailOpen } from "react-icons/hi";
import { toast } from "react-toastify";

const NewsletterSubscription = () => {
  const { theme } = useContext(WebContext);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter a valid email address!");
    }

    // Success Logic
    toast.success("Thank you for subscribing to ScholarStream!");
    setEmail(""); // Clearing the field
  };

  return (
    <section
      className={`w-full py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <div
          className={`relative overflow-hidden rounded-4xl p-8 md:p-16 ${
            theme === "dark"
              ? "bg-slate-800 border border-slate-700 shadow-2xl shadow-purple-900/20"
              : "bg-white border border-purple-100 shadow-2xl shadow-purple-100"
          }`}
        >
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content - Large and Detailed */}
            <div className="flex-1 text-center lg:text-left">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                  theme === "dark"
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                <HiOutlineMailOpen className="text-xl" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Stay Updated
                </span>
              </div>

              <h2
                className={`text-xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight ${
                  theme === "dark" ? "text-white" : "text-purple-950"
                }`}
              >
                Don't Miss Out on Your <br />
                <span className="text-sky-500 underline decoration-purple-500/30 underline-offset-8">
                  Dream Scholarship
                </span>
              </h2>

              <p
                className={`md:text-lg text-sm leading-relaxed max-w-2xl ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Join our community of over 50,000+ students. Subscribe to our
                newsletter and receive curated scholarship opportunities,
                application tips, and university deadline alerts directly in
                your inbox every week. We promise not to spam you!
              </p>
            </div>

            {/* Subscription Form */}
            <div className="w-full lg:w-[450px]">
              <form
                onSubmit={handleSubscribe}
                className={`p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-3 transition-all ${
                  theme === "dark"
                    ? "bg-slate-700/50 border border-slate-600"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-6 py-4 text-lg focus:outline-none dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto md:px-8 px-4 md:py-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="mt-4 text-xs text-center lg:text-left text-gray-500 italic">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
