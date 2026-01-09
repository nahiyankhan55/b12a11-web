import { useContext } from "react";
import { Link } from "react-router";
import slide1 from "./../../../assets/scholar1.webp";
import slide2 from "./../../../assets/scholar2.webp";
import slide3 from "./../../../assets/scholar3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import WebContext from "../../../Context/WebContext";

const HeaderSlider = () => {
  const { user } = useContext(WebContext);

  // Common Slide Style for Text Overlay
  const slideContentStyle =
    "absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-4 md:px-20 transition-all duration-500";
  const slideContentRightStyle =
    "absolute inset-0 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-end px-4 md:px-20 transition-all duration-500";

  return (
    <div className="w-full">
      <Swiper
        className="w-full shadow-lg overflow-hidden"
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {/* Slide 1: Left Align - Login Link */}
        <SwiperSlide className="relative">
          <img
            className="w-full lg:h-[450px] sm:h-[350px] h-[250px] object-cover"
            src={slide1}
            alt="scholarship-1"
          />
          <div className={slideContentStyle}>
            <div className="text-left text-white max-w-lg space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                Unlock Your Future with{" "}
                <span className="text-purple-400">ScholarStream</span>
              </h2>
              <p className="text-sm md:text-base opacity-90 hidden sm:block">
                Join thousands of students achieving their dreams. Create your
                profile today and start applying.
              </p>
              <div className="pt-2">
                <Link
                  to={user ? "/dashboard/home" : "/login"}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 inline-block shadow-lg"
                >
                  {user ? "View Dashboard" : "Join Now"}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Right Align - Scholarships/Dashboard Link */}
        <SwiperSlide className="relative">
          <img
            className="w-full lg:h-[450px] sm:h-[350px] h-[250px] object-cover"
            src={slide2}
            alt="scholarship-2"
          />
          <div className={slideContentRightStyle}>
            <div className="text-right text-white max-w-lg space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">
                Browse <span className="text-sky-400">Our Reviews</span>{" "}
              </h2>
              <p className="text-sm md:text-base opacity-90 hidden sm:block">
                See how students from all over the world transformed their lives
                with fully funded scholarships through our platform.
              </p>
              <div className="pt-2">
                <Link
                  to="/stories"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 inline-block shadow-lg"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Right Align - About Us */}
        <SwiperSlide className="relative">
          <img
            className="w-full lg:h-[450px] sm:h-[350px] h-[250px] object-cover"
            src={slide3}
            alt="scholarship-3"
          />
          <div className={slideContentRightStyle}>
            <div className="text-right text-white max-w-lg space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">
                About <span className="text-purple-400">Our Terms</span>
              </h2>
              <p className="text-sm md:text-base opacity-90 hidden sm:block">
                We value your trust. Learn about our clear terms, user policies,
                and how we protect your academic journey.
              </p>
              <div className="pt-2">
                <Link
                  to="/terms"
                  className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 inline-block shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeaderSlider;
