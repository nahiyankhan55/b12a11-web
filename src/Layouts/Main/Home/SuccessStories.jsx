import { useContext } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import WebContext from "../../../Context/WebContext";

const SuccessStories = () => {
  const { theme } = useContext(WebContext);

  const stories = [
    {
      id: 1,
      name: "Sam Danial",
      university: "Harvard University",
      image: "https://i.ibb.co.com/HDRPsfZF/e2.jpg",
      story:
        "ScholarStream made my dream of studying in the USA a reality. The application process was incredibly smooth and transparent.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sara Ahmed",
      university: "Oxford University",
      image: "https://i.ibb.co.com/dsWvkxGh/e3.jpg",
      story:
        "I found a fully funded scholarship within weeks. The interface is user-friendly and the support team is very helpful.",
      rating: 5,
    },
    {
      id: 3,
      name: "M. Sam",
      university: "National University of Singapore",
      image:
        "https://i.ibb.co.com/8nsN3G8X/portrait-confident-young-businessman-with-his-arms-crossed-23-2148176206.jpg",
      story:
        "The best platform for international students. It tracks everything from application to approval in one place.",
      rating: 4,
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-purple-50/20"
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
            Success Stories
          </h2>
          <div className="w-20 h-1.5 bg-sky-500 mx-auto rounded-full mb-4"></div>
          <p
            className={`max-w-2xl mx-auto sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Hear from our students who have successfully secured scholarships
            and are now pursuing their dreams at world-class universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 shadow-purple-900/10"
                  : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
              }`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-purple-600/20 text-5xl">
                <FaQuoteLeft />
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full border-2 border-sky-400 p-0.5 object-cover"
                />
                <div>
                  <h4
                    className={`font-bold text-lg ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {story.name}
                  </h4>
                  <p className="text-sm text-sky-500 font-medium">
                    {story.university}
                  </p>
                </div>
              </div>

              {/* Story Content */}
              <p
                className={`italic mb-6 leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                "{story.story}"
              </p>

              {/* Star Rating */}
              <div className="flex gap-1 text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < story.rating
                        ? "fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
