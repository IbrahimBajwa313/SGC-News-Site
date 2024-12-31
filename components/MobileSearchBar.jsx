import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

const MobileSearchBar = ({ setshowsearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const dropdownRef = useRef(null); // Ref for the dropdown and input area

  // Function to handle the search query submission
  const handleSearch = (query) => {
    if (!query.trim()) return; // Prevent empty search
    router.push(`/category/${query}?query=${query}`);
  };

  // Function to fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch("/api/getPosts");
      if (!response.ok) throw new Error("Failed to fetch suggestions");

      const result = await response.json();
      const filteredResults = result.data.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filteredResults);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]); // Close suggestions
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full lg:w-auto" ref={dropdownRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
        className="flex items-center w-full"
      >
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          className="border-2 border-gray-300 rounded-l-lg px-8 py-2 w-full outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white rounded-r-lg px-6 py-3 hover:bg-gray-800 transition duration-200"
        >
          {/* Search Icon */}
          <BsSearch className="text-white" size={20} />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto"
        >
          {suggestions.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                router.push(`/post/${item._id}`);
                setSuggestions([]); // Close suggestions on click
              }}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition ease-in-out duration-200"
            >
              <Image
                src={`/uploads/${item.post_img}`} // Use the correct image field
                alt={item.title}
                width={50}
                height={50}
                className="rounded-lg mr-2"
              />
              <span className="text-gray-800 font-semibold">{item.title}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MobileSearchBar;
