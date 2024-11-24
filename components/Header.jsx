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
  
  const Header = () => {
    const [Number, setNumber] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setsearch] = useState("Search...");
    const [showsearch, setshowsearch] = useState(false);
  
   
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [showAuthorMenu, setShowAuthorMenu] = useState(false);
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

  
            {/* Navbar Menu items, category sub-menu */}
            <Menu
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              showAuthorMenu={showAuthorMenu}
              setShowAuthorMenu={setShowAuthorMenu} 
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
  
