import FeaturedScholarships from "./FeaturedScholarships";
import HeaderSlider from "./HeaderSlider";
import LiveStatistics from "./LiveStatistics";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";
import ScholarshipCategories from "./ScholarshipCategories";
import TopUniversities from "./TopUniversities";
import SuccessStories from "./SuccessStories";
import FAQSection from "./FAQSection";
import NewsletterSubscription from "./NewsletterSubscription";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <HeaderSlider></HeaderSlider>
      <FeaturedScholarships></FeaturedScholarships>
      <LiveStatistics></LiveStatistics>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
      <ScholarshipCategories></ScholarshipCategories>
      <TopUniversities></TopUniversities>
      <SuccessStories></SuccessStories>
      <FAQSection></FAQSection>
      <NewsletterSubscription></NewsletterSubscription>
    </div>
  );
};

export default Home;
