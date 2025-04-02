import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full md:w-xl bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm"
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-2 px-4 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 hover:bg-green-700 mr-1"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
