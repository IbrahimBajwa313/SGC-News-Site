import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isAuthorsDropdownOpen, setIsAuthorsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const toggleAuthorsDropdown = () => {
    setIsAuthorsDropdownOpen(!isAuthorsDropdownOpen);
    setIsCategoriesDropdownOpen(false); // Close the other dropdown
  };

  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
    setIsAuthorsDropdownOpen(false); // Close the other dropdown
  };

  const authorsList = ["Author", "Author", "Author"];
  const categoriesList = ["Category", "Category", "Category"];

  return (
    <header className="bg-[#111] text-white shadow-2xl z-50">
      <div className="flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link href={"/"}>
        <div className="flex items-center space-x-4">
          <Image
            src="/save-gaza-logo.png"
            alt="Save Gaza Campaign Logo"
            className="h-12 w-12"
            height={48}
            width={48}
          />
          <span className="text-2xl font-bold hover:text-green-500">Save Gaza Campaign</span>
        </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Authors Dropdown */}
          <div className="relative">
            <button
              onClick={toggleAuthorsDropdown}
              className="hover:text-green-500 transition-colors duration-300 flex items-center"
            >
              Authors
              <svg
                className={`ml-2 transition-transform duration-300 ${
                  isAuthorsDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isAuthorsDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-[#222] p-4 rounded shadow-lg">
                {authorsList.map((author, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block text-white hover:text-green-500 mb-2"
                  >
                    {author}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={toggleCategoriesDropdown}
              className="hover:text-green-500 transition-colors duration-300 flex items-center"
            >
              Categories
              <svg
                className={`ml-2 transition-transform duration-300 ${
                  isCategoriesDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isCategoriesDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-[#222] p-4 rounded shadow-lg">
                {categoriesList.map((category, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block text-white hover:text-green-500 mb-2"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link href="#">
            <span className="hover:text-green-500 cursor-pointer transition-colors duration-300">
              Latest
            </span>
          </Link>
          <Link href="#">
            <span className="hover:text-green-500 cursor-pointer transition-colors duration-300">
              Join Us
            </span>
          </Link>
          <button className="bg-white hover:text-green-500 text-black font-bold px-4 py-2 rounded-md transition-colors duration-300">
            Login
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="flex md:hidden cursor-pointer" onClick={toggleAuthorsDropdown}>
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isAuthorsDropdownOpen && (
        <div className="md:hidden bg-[#222] px-6 py-4 space-y-4">
          {/* Authors */}
          <div>
            <p className="text-lg font-bold">Authors</p>
            {authorsList.map((author, index) => (
              <Link
                key={index}
                href="#"
                className="block text-white hover:text-green-500"
              >
                {author}
              </Link>
            ))}
          </div>
          {/* Categories */}
          <div className="mt-4">
            <p className="text-lg font-bold">Categories</p>
            {categoriesList.map((category, index) => (
              <Link
                key={index}
                href="#"
                className="block text-white hover:text-green-500"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
