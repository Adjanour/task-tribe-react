// Home.jsx
import React from 'react';

const Home = () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <GetStartedSection />
        <Footer />
      </div>
    );
  };
  

export default Home;


const Header = () => {
    return (
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/auth/login" className="text-3xl font-bold">Task Tribe</a>
          {/* Add navigation links here if needed */}
        </div>
      </nav>
    );
  };


  const HeroSection = () => {
    return (
      <header className="bg-gray-800 text-white h-screen flex items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Task Management Made Easy</h1>
          <p className="text-lg mb-8">Efficiently organize, track, and manage your tasks with Task Tribe.</p>
          <a href="https://portfolio.adjarnor.tech" className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300">Get Started</a>
        </div>
      </header>
    );
  };


  const FeatureCard = ({ title, description }:{title:string,description:string}) => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  
  const FeaturesSection = () => {
    return (
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard title="Task Organization" description="Effortlessly organize your tasks into projects and categories for better visibility and management." />
            <FeatureCard title="Collaboration" description="Collaborate with your team by assigning tasks, sharing updates, and tracking progress together." />
            <FeatureCard title="Deadline Tracking" description="Stay on top of your deadlines with visual timelines and reminders for upcoming tasks." />
          </div>
        </div>
      </section>
    );
  };
  


const GetStartedSection = () => {
  return (
    <section className="bg-gray-800 text-white  py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Ready to Get Started?</h2>
        <p className="text-lg mb-8">Join Task Tribe today and experience a new level of task management efficiency.</p>
        {/* Add a call-to-action button or link to encourage user sign-up/login */}
        <a href="https://adjanour.github.io" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">Sign Up Now</a>
      </div>
    </section>
  );
};



const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white text-center py-4">
      <p>&copy; 2023 Task Tribe Task Management System. All rights reserved.</p>
    </footer>
  );
};

