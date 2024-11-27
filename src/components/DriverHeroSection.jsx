import React from 'react';

const DriverHeroSection = () => (
  <div className="relative bg-gradient-to-r from-indigo-600 z-0 via-purple-500 to-pink-500 p-10 rounded-xl shadow-2xl text-white text-center overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-24 h-24 z-0 bg-white opacity-10 rounded-full transform -translate-x-10 -translate-y-10"></div>
    <div className="absolute bottom-0 right-0 w-32 h-32 z-0 bg-white opacity-10 rounded-full transform translate-x-12 translate-y-10"></div>

    {/* Hero Content */}
    <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
      Welcome to Your Dashboard
    </h1>
    <p className="text-lg md:text-2xl mt-4 font-light tracking-wider">
      Manage rides, track performance, and maximize efficiency with ease.
    </p>

    {/* Action Button */}
    <button className="mt-6 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
      Get Started
    </button>
  </div>
);

export default DriverHeroSection;
