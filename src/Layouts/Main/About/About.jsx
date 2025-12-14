import { HeadProvider, Title } from "react-head";

const About = () => {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <HeadProvider>
        <Title>About Us || ScholarStream</Title>
      </HeadProvider>

      <h1 className="md:text-3xl text-2xl font-bold mb-4">About Us</h1>

      <p className="mb-3">
        Welcome to our platform. We aim to provide a modern, fast, and
        user-friendly web experience for everyone. Our focus is on building
        clean, efficient, and reliable features that make your workflow easier.
      </p>

      <p className="mb-3">
        Through this system, users can enjoy secure authentication, a smooth
        dashboard, and organized data management. We follow industry best
        practices to ensure performance, scalability, and long-term
        maintainability.
      </p>

      <p>
        Thank you for taking the time to learn more about us. Stay connected for
        future updates and improvements.
      </p>
    </div>
  );
};

export default About;
