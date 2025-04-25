import React from 'react'
import Header from './Header'
import HeroSection from './HeroSection'

const Landing = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-25 to-blue-100 overflow-hidden">
      <Header />
      <HeroSection />
    </div>
  );
};

export default Landing