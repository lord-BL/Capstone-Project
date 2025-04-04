import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaLeaf,
  FaBookOpen,
  FaComment,
  FaUsers,
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        localStorage.removeItem("userData"); // Optional: Clear local storage
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
        alert("Error signing out. Try again.");
      });
  };

  const [userName, setUserName] = useState("");
  useEffect(() => {
    // Get user data from localStorage when component mounts
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserName(parsedData.fullname);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-green-200">
            JF
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl mb-1 font-semibold">{userName}</h2>
            <div className="flex justify-center sm:justify-start items-center text-gray-500 mb-2">
              <FaMapMarkerAlt className="h-4 w-4 mr-1 text-gray-600" />
              <span>Heartland County, Midwest</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md flex items-center text-sm">
                <FaLeaf className="h-3 w-3 mr-1" /> Organic Farming
              </span>
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-sm">
                Crop Rotation
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                Sustainable Practices
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-6 py-4 mt-4 border-y">
          <div className="flex items-center gap-1 text-gray-600">
            <FaBookOpen className="h-4 w-4 text-green-600" />
            <span className="font-medium">24</span>
            <span className="text-sm">Articles</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <FaComment className="h-4 w-4 text-green-600" />
            <span className="font-medium">156</span>
            <span className="text-sm">Comments</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <FaUsers className="h-4 w-4 text-green-600" />
            <span className="font-medium">48</span>
            <span className="text-sm">Connections</span>
          </div>
        </div>

        <div className="mt-4 text-center sm:text-left">
          <h3 className="font-medium mb-2">About</h3>
          <p className="text-gray-600">
            Third-generation farmer with 15 years of experience in sustainable
            agriculture. Specializing in organic vegetable production and soil
            health management. Passionate about sharing knowledge and learning
            new techniques from fellow farmers.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Articles</h3>
          {[
            "Seasonal Crop Rotation Strategies",
            "Organic Pest Management",
            "Water Conservation Techniques",
          ].map((article, index) => (
            <div key={index} className="border-b pb-3 last:border-0">
              <h4 className="font-medium hover:text-green-600 cursor-pointer">
                {article}
              </h4>
              <p className="text-sm text-gray-500">
                Posted 2 weeks ago • 5 min read
              </p>
            </div>
          ))}
          <button className="w-full mt-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-100">
            View All Articles
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Community Contributions
          </h3>
          {[
            "Shared irrigation system design in Sustainable Farming forum",
            "Answered question about natural fertilizers in Q&A section",
            "Posted photos from recent harvest in Community Gallery",
          ].map((contribution, index) => (
            <div key={index} className="border-b pb-3 last:border-0">
              <p className="text-sm">{contribution}</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          ))}
          <button className="w-full mt-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-100">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
