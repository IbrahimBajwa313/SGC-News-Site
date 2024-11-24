<<<<<<< HEAD
  import React, { useEffect, useState } from "react";
  import { CiSearch } from "react-icons/ci";
  import Wrapper from "./Wrapper";
  import Menu from "./Menu";
  import MenuMobile from "./MenuMobile";
  import Link from "next/link";
  import { BiMenu } from "react-icons/bi";
  import { BsCart3 } from "react-icons/bs";
  import { VscChromeClose } from "react-icons/vsc";
  import Image from "next/image";
  import { useRouter } from "next/router";
  import { motion } from "framer-motion";
  import { RxCross1 } from "react-icons/rx";
  
  const Header = (cart) => {
    const [Number, setNumber] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setsearch] = useState("Search...");
    const [showsearch, setshowsearch] = useState(false);
  
    useEffect(() => {
      if (typeof localStorage !== "undefined" && localStorage.getItem("cart")) {
        setNumber(Object.keys(JSON.parse(localStorage.getItem("cart"))).length);
      }
    }, [cart]);
  
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [suggestions, setSuggestions] = useState(undefined);
  
    const handleSearch = async (query) => {
      window.location.href = `/category/${query}?query=${query}`;
    };
  
    const router = useRouter();
  
    const searchSuggestion = async (query) => {
      const response = await fetch("/api/getProducts");
      const result = await response.json();
  
      // Filter products based on the search query
      const filteredResults = result.products.filter((product) => {
        console.log(query);
        if (query != "") {
          console.log("very tur");
          return product.title.toLowerCase().includes(query?.toLowerCase());
        }
      });
      setSuggestions(filteredResults);
  
      // setSearchQuery('')
    };
  
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return (
      <div className="bg-white w-screen ">
        {isClient && showsearch && (
          <motion.div
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className=" pt-3 pb-3 justify-between right-3  items-center gap-4 text-black"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
              }}
              className="flex justify-center   items-center"
            >
              <input
                type="text"
                placeholder={search}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchSuggestion(e.target.value);
                  if (e.target.value == "") {
                    console.log(true);
                    setSuggestions(undefined);
                  }
                }}
                className="border ml-2 sm:w-4/12 w-6/12 relative border-gray-600 rounded-lg p-1 outline-none"
              />
              {suggestions && (
                <div className="bg-white max-h-60 overflow-y-auto z-40 top-12 absolute rounded-lg text-black shadow-xl">
                  {suggestions?.map((keys) => {
                    return (
                      <>
                        <div
                          onClick={() => {
                            router.push(`/product/${keys._id}`);
                          }}
                          className="px-3 cursor-pointer flex justify-between mb-2 hover:bg-gray-100 "
                        >
                          <div>{keys.title}</div>
                          <Image
                            className="w-20"
                            src= "/productIamages/${keys.img}/thumbnail.webp"
                            width={90}
                            height={90}
                            alt=""
                          />{" "}
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
              <input
                type="submit"
                className="bg-black ml-1 sm:w-2/12 w-3/12  rounded-lg text-white  px-3 py-1"
              />
  
              <RxCross1
                onClick={() => {
                  setshowsearch(false);
                  setSearchQuery("");
                  setSuggestions(undefined);
                }}
                className="ml-6  text-xl"
              />
            </form>
          </motion.div>
        )}
  
        {isClient && !showsearch && (
          <motion.wrapper
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex pt-3 pb-1 items-center justify-between mx-6"
          >
            {/* Logo of the Store */}
            <Link href={"/"}>
            <div className="flex items-center space-x-4">
               <Image
=======
  import { useState, useEffect } from "react";
  import Link from "next/link";
  import Image from "next/image";
  import PostCard from "./postCard";

  export default function Header() {
    const [isAuthorsDropdownOpen, setIsAuthorsDropdownOpen] = useState(false);
    const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
      useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [authorsList, setAuthorsList] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null); // Track selected author

    const handleAuthorSelect = (author) => {
      setSelectedAuthor(author); // Set selected author
      setIsAuthorsDropdownOpen(false); // Close dropdown
    };

    const toggleAuthorsDropdown = () => {
      setIsAuthorsDropdownOpen(!isAuthorsDropdownOpen);
      setIsCategoriesDropdownOpen(false); // Close the other dropdown
    };

    const toggleCategoriesDropdown = () => {
      setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
      setIsAuthorsDropdownOpen(false); // Close the other dropdown
    };

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
      setIsAuthorsDropdownOpen(false);
      setIsCategoriesDropdownOpen(false);
    };

    // Fetch authors from the API
    useEffect(() => {
      const fetchAuthors = async () => {
        try {
          const response = await fetch("/api/getPosts"); // Replace with your API endpoint
          const result = await response.json();

          if (result.success) {
            // Extract unique authors
            const authors = [
              ...new Set(result.data.map((post) => post.authorDetails.username)),
            ];
            setAuthorsList(authors);
          }
        } catch (error) {
          console.error("Error fetching authors:", error.message);
        }
      };

      fetchAuthors();
    }, []);
    const categoriesList = ["Category", "Category", "Category"];

    return (
      <header className="bg-[#111] text-white shadow-2xl z-50">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center space-x-4">
              <Image
>>>>>>> 357db612a4211caf613a9b2102526b8371fcff76
                src="/save-gaza-logo.png"
                alt="Save Gaza Campaign Logo"
                className="h-12 w-12"
                height={48}
                width={48}
              />
              <span className="text-2xl font-bold hover:text-green-500">
                Save Gaza Campaign
              </span>
            </div>
          </Link>

<<<<<<< HEAD
  
            {/* Navbar Menu items, category sub-menu */}
            <Menu
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              showSortMenu={showSortMenu}
              setShowSortMenu={setShowSortMenu}
            />
  
            {mobileMenu && (
              <MenuMobile
                setShowCatMenu={setShowCatMenu}
                setMobileMenu={setMobileMenu}
                showCatMenu={showCatMenu}
                showSortMenu={showSortMenu}
                setShowSortMenu={setShowSortMenu}
              />
            )}
  
            {/* Mobile Menu Icon */}
            <div className="flex items-center gap-6 text-black">
              {mobileMenu ? (
                <VscChromeClose
                  className="me-8 relative text-[22px] left-12 lg:hidden md:text-[28px]"
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <div className="flex mr-10  lg:mr-0">
                  <BiMenu
                    className={`${setsearch}?hidden relative left-12 text-[22px] lg:hidden md:text-[28px]`}
                    onClick={() => setMobileMenu(true)}
                  />
                  <CiSearch
                    onClick={() => {
                      setshowsearch(true);
                    }}
                    className="relative ml-5 left-12 text-[22px] lg:hidden md:text-[28px]"
                  />
                </div>
              )}
  
              {/* Other items, placed at the right */}
  
              {/* Search Interface */}
              <div className=" border lg:flex hidden  items-center gap-4 text-black">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(searchQuery);
                  }}
                  className="flex items-center"
                >
                  <input
                    type="search"
                    placeholder={search}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      searchSuggestion(e.target.value);
                      if (e.target.value == "") {
                        console.log(true);
                        setSuggestions(undefined);
                      }
                    }}
                    className=" px-2 relative border border-gray-600 rounded-lg p-1 outline-none"
                  />
                  {suggestions && (
                    <div className="bg-white max-h-72 overflow-y-auto z-40 top-16 absolute  text-black shadow-xl">
                      {suggestions?.map((keys) => {
                        //
                        return (
                          <>
                            <div
                              onClick={() => {
                                window.location.replace(`/product/${keys._id}`);
                              }}
                              className="px-3 cursor-pointer flex justify-between mb-2 "
                            >
                              <div className="text-gray-500 hover:text-black">
                                {keys.title}
                              </div>
                              <img
                                className="w-20"
                                src={`/productIamages/${keys.img}/thumbnail.webp`}
                                alt=""
                              />{" "}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}
                  <input
                    type="submit"
                    className="bg-black  text-white rounded-lg px-3 ml-1 py-1 "
                    placeholder="Search"
                  />
                </form>
              </div>
  
             </div>
          </motion.wrapper>
        )}
      </div>
    );
  };
  
  export default Header;
  
=======
          {/* Desktop Navigation */}
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
                  {authorsList.length > 0 ? (
                    authorsList.map((author, index) => (
                      <button
                        key={index}
                        onClick={() => handleAuthorSelect(author)}
                        className="block px-2 text-white hover:text-green-500 mb-2"
                      >
                        {author}
                      </button>
                    ))
                  ) : (
                    <span className="text-gray-400">No authors found</span>
                  )}
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
                      className="block px-2 text-white hover:text-green-500 mb-2"
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
                About Us
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
          <div
            className="flex md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
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
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#222] px-6 py-4 space-y-4">
            {/* Authors */}
            <div>
              <button
                onClick={toggleAuthorsDropdown}
                className="flex justify-between w-full text-white hover:text-green-500"
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
                <div className="mt-2">
                  {authorsList.map((author, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-white hover:text-green-500 hover:bg-[#333] rounded"
                    >
                      {author}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Categories */}
            <div>
              <button
                onClick={toggleCategoriesDropdown}
                className="flex justify-between w-full text-white hover:text-green-500"
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
                <div className="mt-2">
                  {categoriesList.map((category, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-white hover:text-green-500 hover:bg-[#333] rounded"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Links */}
            <div>
              <Link href="#">
                <span className="block text-white hover:text-green-500">
                  Latest
                </span>
              </Link>
              <Link href="#">
                <span className="block text-white hover:text-green-500">
                  Join Us
                </span>
              </Link>
              <button className="bg-white hover:text-green-500 text-black font-bold px-4 py-2 mt-4 rounded-md transition-colors duration-300">
                Login
              </button>
            </div>
          </div>
        )}

        {/* Pass selectedAuthor to PostCard */}
        <PostCard selectedAuthor={selectedAuthor} />
      </header>
    );
  }
>>>>>>> 357db612a4211caf613a9b2102526b8371fcff76
