import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Import search icon
import Button from "./Button";
const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-md bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-300 transition"
    >
      {/* Search Icon */}
      <FiSearch className="text-gray-500 text-lg mr-2" />

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow outline-none p-2 text-sm md:text-base bg-transparent"
      />

      {/* Submit Button */}
      <Button
        label="Search"
        type="submit"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs md:text-sm lg:text-base bg-green-500 text-white rounded-md flex-shrink-0"
      />
    </form>
  );
};

export default SearchBar;
