import React from "react";
import { FaSearch, FaThumbsUp, FaComment, FaBookmark } from "react-icons/fa";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";

const ForumPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center min-h-auto p-4 bg-white">
      <p>The Agriverse Community</p>
      {/* Main Content */}
      <div className="w-full lg:w-3/5 p-4 bg-white rounded-lg shadow-md">
        {/* Search Bar */}
        <SearchBar placeholder="Search for posts..." />

        {/* Post Input */}
        <div className="p-4 border border-gray-300 rounded-md shadow-md mt-3">
          <input
            type="text"
            placeholder="Title of Question or Post"
            className="w-full border border-gray-300 p-2 rounded-md mb-2"
          />
          <textarea
            placeholder="Share your thoughts..."
            className="w-full border border-gray-300 p-2 rounded-md h-24"
          ></textarea>
          <Button label="Post" className="mt-2 w-full" />
        </div>

        {/* Posts */}
        {[1, 2, 3, 4].map((post, index) => (
          <div
            key={index}
            className="mt-6 p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm"
          >
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Post #
              {post}
            </p>
            <hr className="mt-10" />
            <div className="flex justify-between items-center text-gray-600 text-lg py-1">
              <div className="flex space-x-4">
                <FaThumbsUp className="cursor-pointer hover:text-green-600" />
                <FaComment className="cursor-pointer hover:text-blue-600" />
              </div>
              <FaBookmark className="cursor-pointer hover:text-yellow-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
    </div>
  );
};

export default ForumPage;
