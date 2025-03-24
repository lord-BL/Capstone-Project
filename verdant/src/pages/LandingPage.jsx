import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
const LandingPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col md:bg-cover bg-cover bg-[url('https://images.unsplash.com/photo-1674973411032-b3c3d7bde17a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <h1 className="text-white font-bold text-center mt-10 text-2xl">
          AGRICULTURE AT YOUR FINGERTIPS
        </h1>
        <p className="text-white font-normal italic text-sm mt-5">
          JOIN US AND BE A PART OF THE AGRIVERSE
        </p>
        <Link to="/signup" className="mt-2.5 mb-1.5">
          <Button label="JOIN NOW" />
        </Link>
      </div>
      <section className="bg-white text-black py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Why Join Verdant?</h2>
          <p className="text-lg text-gray-600">
            A vibrant community for farmers, agribusinesses, and enthusiasts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="p-4 shadow-lg rounded-lg bg-green-100">
              🌾 <h3 className="font-semibold">Community Forum</h3>
              <p className="text-sm text-gray-700">
                Engage in discussions, ask questions, and share insights.
              </p>
            </div>
            <div className="p-4 shadow-lg rounded-lg bg-green-100">
              📖 <h3 className="font-semibold">Educational Articles</h3>
              <p className="text-sm text-gray-700">
                Stay informed with expert-written agricultural articles.
              </p>
            </div>
            <div className="p-4 shadow-lg rounded-lg bg-green-100">
              🔎 <h3 className="font-semibold">Search & Discover</h3>
              <p className="text-sm text-gray-700">
                Easily find relevant content and connect with experts.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 -mt-9">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">What Our Users Say</h2>
          <div className="mt-6">
            <blockquote className="text-lg italic text-gray-600">
              "Verdant helped me connect with fellow farmers and gain new
              insights!"
            </blockquote>
            <p className="text-sm font-semibold mt-2">— Kwame, Cocoa Farmer</p>
          </div>
        </div>
      </section>
      <section className="bg-green-700 text-white py-10 text-center">
        <h2 className="text-2xl font-bold">
          Ready to Join the Future of Agriculture?
        </h2>
        <p className="mt-2 text-lg">Sign up today and be part of the change.</p>
        <Link to="/signup">
          <Button label="Get Started" />
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
