"use client";

import { useState, useEffect } from 'react';

export default function HomePage() {
  const images = [
    '/bg1.jpg',
    '/bg2.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-green-100">
      {/* Background Image Carousel */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})`, opacity: 0.3 }}
      ></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-5 bg-white bg-opacity-90 shadow-md">
        <h1 className="text-2xl font-bold text-green-700">Go Grain</h1>
        <div>
          <a href="/login" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Sign In</a>
          <a href="/register" className="ml-4 px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg shadow hover:bg-green-50">Register as Farmer</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h2 className="text-4xl font-extrabold text-green-800">Sell Your Produce Directly to Consumers</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Join our platform to reach more customers, manage your sales easily, and grow your farming business.
        </p>
        <div className="mt-6">
          <a href="/register" className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700">Register as a Farmer</a>
          <a href="/login" className="ml-4 px-6 py-3 bg-white text-green-600 border border-green-600 text-lg font-semibold rounded-lg shadow-md hover:bg-green-50">Sign In</a>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-16 bg-white text-center">
        <h3 className="text-3xl font-bold text-green-700">Why Join Us?</h3>
        <div className="mt-8 flex flex-wrap justify-center gap-8 px-6">
          <div className="w-80 p-6 bg-green-50 shadow-lg rounded-xl">
            <h4 className="text-xl font-semibold text-green-800">Direct to Consumer Sales</h4>
            <p className="mt-2 text-gray-600">Eliminate middlemen and get the best price for your produce.</p>
          </div>
          <div className="w-80 p-6 bg-green-50 shadow-lg rounded-xl">
            <h4 className="text-xl font-semibold text-green-800">Easy Order Management</h4>
            <p className="mt-2 text-gray-600">Manage sales, inventory, and deliveries with our intuitive dashboard.</p>
          </div>
          <div className="w-80 p-6 bg-green-50 shadow-lg rounded-xl">
            <h4 className="text-xl font-semibold text-green-800">Secure Payments</h4>
            <p className="mt-2 text-gray-600">Receive payments directly into your bank account with our secure system.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="relative bg-green-700 text-white text-center py-12">
        <h3 className="text-3xl font-bold">Start Selling Today</h3>
        <p className="mt-3 text-lg">Join thousands of farmers across India who are selling directly to customers.</p>
        <a href="/register" className="mt-6 inline-block px-6 py-3 bg-white text-green-700 font-semibold text-lg rounded-lg shadow-md hover:bg-gray-100">Register Now</a>
      </div>
    </div>
  );
}
