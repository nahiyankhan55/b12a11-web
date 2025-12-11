import { FaGraduationCap, FaGlobeAsia, FaCertificate } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2 className="md:text-3xl text-2xl font-bold text-center mb-3">
        Why Choose ScholarStream?
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10 sm:text-base text-sm">
        We make your scholarship journey easier with trusted resources, global
        opportunities, and expert guidance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div
          data-aos="zoom-in"
          className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg duration-300 shadow-gray-400"
        >
          <div className="text-blue-600 text-4xl flex justify-center mb-4">
            <FaGraduationCap />
          </div>
          <h3 className="text-xl font-semibold mb-2">Verified Scholarships</h3>
          <p className="text-gray-600">
            Access only authentic and trusted global scholarship opportunities.
          </p>
        </div>

        {/* Card 2 */}
        <div
          data-aos="zoom-in"
          className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg duration-300 shadow-gray-400"
        >
          <div className="text-blue-600 text-4xl flex justify-center mb-4">
            <FaGlobeAsia />
          </div>
          <h3 className="text-xl font-semibold mb-2">Worldwide Access</h3>
          <p className="text-gray-600">
            Find scholarships from top universities across different countries.
          </p>
        </div>

        {/* Card 3 */}
        <div
          data-aos="zoom-in"
          className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg duration-300 shadow-gray-400"
        >
          <div className="text-blue-600 text-4xl flex justify-center mb-4">
            <FaCertificate />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Application</h3>
          <p className="text-gray-600">
            Apply seamlessly with our fast, user-friendly application process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
