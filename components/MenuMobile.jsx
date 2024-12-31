import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [showAuthorMenu, setShowAuthorMenu] = useState(false);

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
                    {categories.length > 0 ? (
                      categories.map(({ category_name, _id }) => (
                        <Link
                          key={_id}
                          href={`/category/${_id}`}
                          onClick={() => setMobileMenu(false)}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {category_name}
                          </li>
                        </Link>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No categories found</li>
                    )}
                  </motion.ul>
                )}
              </li>
            )}

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
                    {authors.length > 0 ? (
                      authors.map(({ username, _id }) => (
                        <Link
                          key={_id}
                          href={`/authors/${_id}`}
                          onClick={() => setMobileMenu(false)}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {username}
                          </li>
                        </Link>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No authors found</li>
                    )}
                  </motion.ul>
                )}
              </li>
            )}

            {/* Regular Links */}
            {!item.subMenu && (
              <li className="py-4 px-5 border-b">
                <Link href={item.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};

export default MenuMobile;
