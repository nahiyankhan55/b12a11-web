import slide1 from "./../../../assets/scholar1.webp";
import slide2 from "./../../../assets/scholar2.webp";
import slide3 from "./../../../assets/scholar3.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeaderSlider = () => {
  return (
    <Swiper
      className="w-full shadow-lg shadow-gray-400"
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide>
        <img
          className="mx-auto w-full lg:h-[450px] sm:h-[350px] h-[200px]"
          src={slide1}
          alt="slide-image"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="mx-auto w-full lg:h-[450px] sm:h-[350px] h-[200px]"
          src={slide2}
          alt="slide-image"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="mx-auto w-full lg:h-[450px] sm:h-[350px] h-[200px]"
          src={slide3}
          alt="slide-image"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeaderSlider;
