<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
=======
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Wrapper from "./Wrapper";
>>>>>>> origin/main
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
<<<<<<< HEAD
=======
import { BsCart3 } from "react-icons/bs";
>>>>>>> origin/main
import { VscChromeClose } from "react-icons/vsc";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
<<<<<<< HEAD
import MobileSearchBar from "./MobileSearchBar"; // Import the MobileSearchBar component
=======
>>>>>>> origin/main

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showAuthorMenu, setShowAuthorMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showsearch, setshowsearch] = useState(false);
  const [isClient, setIsClient] = useState(false);
<<<<<<< HEAD
  const headerRef = useRef(null); // Ref for the header
=======
>>>>>>> origin/main

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
<<<<<<< HEAD
    <div className="bg-white w-screen" ref={headerRef}>
=======
    <div className="bg-white w-screen">
>>>>>>> origin/main
      {isClient && showsearch}

      {isClient && !showsearch && (
        <motion.div
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex pt-3 pb-1 items-center justify-between mx-6"
        >
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
              <span className="text-2xl font-bold hover:text-gray-500">
                Save Gaza Campaign
              </span>
            </div>
          </Link>

          {/* Navbar Menu */}
          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            showAuthorMenu={showAuthorMenu}
            setShowAuthorMenu={setShowAuthorMenu}
          />

          {/* Mobile Menu */}
          {mobileMenu && (
            <MenuMobile
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              showCatMenu={showCatMenu}
<<<<<<< HEAD
              showAuthorMenu={showAuthorMenu}
              setShowAuthorMenu={setShowAuthorMenu}
              headerHeight={headerRef.current?.clientHeight} // Pass header height
=======
              showSortMenu={showSortMenu}
              setShowSortMenu={setShowSortMenu}
>>>>>>> origin/main
            />
          )}

          {/* Icons */}
          <div className="flex items-center gap-6 text-black">
            {mobileMenu ? (
              <VscChromeClose
                className="me-8 relative text-[22px] left-12 lg:hidden md:text-[28px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <div className="flex mr-10 lg:mr-0">
                <BiMenu
                  className="relative left-12 text-[22px] lg:hidden md:text-[28px]"
                  onClick={() => setMobileMenu(true)}
                />
<<<<<<< HEAD
              </div>
            )}
            <div className="hidden lg:block">
              <SearchBar setshowsearch={setshowsearch} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Search Bar */}
      {mobileMenu && (
        <div className="lg:hidden">
          <MobileSearchBar setShowSearch={setMobileMenu} />
        </div>
      )}
=======
                <CiSearch
                  onClick={() => {
                    setshowsearch(true);
                  }}
                  className="relative ml-5 left-12 text-[22px] lg:hidden md:text-[28px]"
                />
              </div>
            )}
            <SearchBar />
          </div>
        </motion.div>
      )}
>>>>>>> origin/main
    </div>
  );
};

export default Header;
