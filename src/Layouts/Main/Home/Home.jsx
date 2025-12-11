import FeaturedScholarships from "./FeaturedScholarships";
import HeaderSlider from "./HeaderSlider";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <HeaderSlider></HeaderSlider>
      <FeaturedScholarships></FeaturedScholarships>
    </div>
  );
};

export default Home;
