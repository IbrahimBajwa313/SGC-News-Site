import Link from "next/link";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  showAuthorMenu,
  setShowAuthorMenu,
  setMobileMenu,
}) => {
  const { user, logout, updatePopup } = useUser();
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [adminPage, setAdminPage] = useState(false);
  const router = useRouter();

  const data = [
    { id: 1, name: "About", url: "/about" },
    { id: 2, name: "Categories", subMenu: true },
    { id: 3, name: "Authors", subMenu: true },
  ];

  // Fetch categories and authors
=======
import { motion } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [showAuthorMenu, setShowAuthorMenu] = useState(false);

>>>>>>> origin/main
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/getCategories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/getAllUsers");
      const data = await res.json();
      if (data.success) {
        setAuthors(data.data);
      } else {
        console.error("Failed to fetch authors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
<<<<<<< HEAD

    if (router.pathname.includes("/admin")) {
      setAdminPage(true);
    } else {
      setAdminPage(false);
    }
  }, [router]);

  return (
    <div>
      <ul className="flex flex-col z-40 lg:hidden absolute top-[105px] font-medium left-0 w-full h-[calc(100vh-210px)] text-black bg-white border-t">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {item?.subMenu && item.name === "Categories" && (
              <li
                className="cursor-pointer z-40 gap-2 flex text-center relative border border-transparent rounded-md hover:shadow-lg px-4 py-2"
                onClick={() => {
                  setShowCatMenu(!showCatMenu);
                  setShowAuthorMenu(false);
                }}
              >
                {item.name}
                {!showCatMenu ? (
                  <BsChevronDown size={18} className="mt-1" />
                ) : (
                  <BsChevronUp size={18} className="mt-1" />
                )}
                {showCatMenu && (
                  <ul className="bg-white z-40 mt-2 left-0 w-full text-black shadow-xl max-h-40 overflow-y-auto">
=======
  }, []);

  const menuData = [
    { id: 1, name: "About", url: "/about" },
    { id: 1, name: "Contact", url: "/contact" },
    { id: 2, name: "Categories", subMenu: true },
    { id: 3, name: "Authors", subMenu: true },
  ];

  return (
    <div>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col z-40 lg:hidden absolute top-[50px] font-medium left-0 w-full h-[calc(100vh-50px)] text-black bg-white border-t"
      >
        {menuData.map((item) => (
          <React.Fragment key={item.id}>
            {/* Categories Submenu */}
            {item.subMenu && item.name === "Categories" && (
              <li
                className="py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex items-center">
                  {item.name}
                  {!showCatMenu ? (
                    <BsChevronDown size={18} className="ml-2" />
                  ) : (
                    <BsChevronUp size={18} className="ml-2" />
                  )}
                </div>
                {showCatMenu && (
                  <motion.ul
                    animate={{ y: 0 }}
                    initial={{ y: -30 }}
                    transition={{ duration: 0.4 }}
                    className="bg-black/[0.05] -mx-5 mt-4 -mb-4"
                  >
>>>>>>> origin/main
                    {categories.length > 0 ? (
                      categories.map(({ category_name, _id }) => (
                        <Link
                          key={_id}
                          href={`/category/${_id}`}
<<<<<<< HEAD
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="cursor-pointer flex justify-between items-center px-3 py-2 hover:shadow-sm hover:bg-gray-100 rounded-md">
=======
                          onClick={() => setMobileMenu(false)}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
>>>>>>> origin/main
                            {category_name}
                          </li>
                        </Link>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No categories found</li>
                    )}
<<<<<<< HEAD
                  </ul>
=======
                  </motion.ul>
>>>>>>> origin/main
                )}
              </li>
            )}

<<<<<<< HEAD
            {item?.subMenu && item.name === "Authors" && (
              <li
                className="cursor-pointer z-40 gap-2 flex text-center relative border border-transparent rounded-md hover:shadow-lg px-4 py-2"
                onClick={() => {
                  setShowAuthorMenu(!showAuthorMenu);
                  setShowCatMenu(false);
                }}
              >
                {item.name}
                {!showAuthorMenu ? (
                  <BsChevronDown size={18} className="mt-1" />
                ) : (
                  <BsChevronUp size={18} className="mt-1" />
                )}
                {showAuthorMenu && (
                  <ul className="bg-white z-40 mt-2 left-0 w-full text-black shadow-xl max-h-40 overflow-y-auto">
=======
            {/* Authors Submenu */}
            {item.subMenu && item.name === "Authors" && (
              <li
                className="py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowAuthorMenu(!showAuthorMenu)}
              >
                <div className="flex items-center">
                  {item.name}
                  {!showAuthorMenu ? (
                    <BsChevronDown size={18} className="ml-2" />
                  ) : (
                    <BsChevronUp size={18} className="ml-2" />
                  )}
                </div>
                {showAuthorMenu && (
                  <motion.ul
                    animate={{ y: 0 }}
                    initial={{ y: -30 }}
                    transition={{ duration: 0.4 }}
                    className="bg-black/[0.05] -mx-5 mt-4 -mb-4"
                  >
>>>>>>> origin/main
                    {authors.length > 0 ? (
                      authors.map(({ username, _id }) => (
                        <Link
                          key={_id}
                          href={`/authors/${_id}`}
<<<<<<< HEAD
                          onClick={() => setShowAuthorMenu(false)}
                        >
                          <li className="cursor-pointer flex justify-between items-center px-3 py-2 hover:shadow-sm hover:bg-gray-100 rounded-md">
=======
                          onClick={() => setMobileMenu(false)}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
>>>>>>> origin/main
                            {username}
                          </li>
                        </Link>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No authors found</li>
                    )}
<<<<<<< HEAD
                  </ul>
=======
                  </motion.ul>
>>>>>>> origin/main
                )}
              </li>
            )}

<<<<<<< HEAD
            {!item?.subMenu && (
              <li className="cursor-pointer border border-transparent rounded-md transition-transform duration-300 hover:scale-105 px-4 py-2">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
=======
            {/* Regular Links */}
            {!item.subMenu && (
              <li className="py-4 px-5 border-b">
                <Link href={item.url} onClick={() => setMobileMenu(false)}>
>>>>>>> origin/main
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
<<<<<<< HEAD

        <li className="cursor-pointer border border-transparent rounded-md transition-transform duration-300 hover:scale-105 px-4 py-2">
          {localStorage.getItem("loggedInUser") && adminPage && (
            <span onClick={() => updatePopup(true)} className="cursor-pointer">
              Logout
            </span>
          )}
          {localStorage.getItem("loggedInUser") && !adminPage && (
            <Link href="/admin/posts" className="cursor-pointer">
              Admin Panel
            </Link>
          )}
          {!localStorage.getItem("loggedInUser") && (
            <Link href="/login">Login</Link>
          )}
        </li>
      </ul>
=======
      </motion.ul>
>>>>>>> origin/main
    </div>
  );
};

export default MenuMobile;
