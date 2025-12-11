import FeaturedScholarships from "./FeaturedScholarships";
import HeaderSlider from "./HeaderSlider";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <HeaderSlider></HeaderSlider>
      <FeaturedScholarships></FeaturedScholarships>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
