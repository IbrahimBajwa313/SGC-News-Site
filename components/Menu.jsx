import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "About", url: "/about" },
  { id: 2, name: "Categories", subMenu: true },
  { id: 3, name: "Authors", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
  { id: 5, name: "Login", url: "/login" },
];

const Menu = ({
  showCatMenu,
  setShowCatMenu,
  showAuthorMenu,
  setShowAuthorMenu,
}) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/getCategories");
      const data = await res.json();
      if (data.success) {
        const categoryNames = data.data.map((category) => category.category_name);
        setCategories(categoryNames);
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch authors from the API
  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/getUsers");
      const data = await res.json();
      if (data.success) {
        const usernames = data.data.map((user) => user.username);
        setAuthors(usernames);
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

  return (
    <>
      <ul className="hidden lg:flex items-center font-medium text-black">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {item?.subMenu && item.name === "Categories" && (
              <li
                className="cursor-pointer z-40 gap-2 flex text-center relative border border-transparent rounded-md hover:shadow-lg px-4 py-2"
                onMouseEnter={() => {
                  setShowCatMenu(true);
                  setShowAuthorMenu(false);
                }}
                onMouseLeave={() => {
                  setShowCatMenu(false);
                }}
              >
                {item.name}
                <BsChevronDown size={18} className="mt-1" />
                {showCatMenu && (
                  <ul className="bg-white z-40 top-10 absolute left-4 min-w-[250px] text-black shadow-xl max-h-40 overflow-y-auto">
                    {categories.length > 0 ? (
                      categories.slice(0, 5).map((name, index) => (
                        <a
                          key={index}
                          href={`/services/${name}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="cursor-pointer flex justify-between items-center px-3 hover:shadow-sm hover:bg-gray-100 rounded-md">
                            {name}
                          </li>
                        </a>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No categories found</li>
                    )}
                    {categories.length > 5 && (
                      <li className="p-3 text-gray-500 text-center">Scroll for more...</li>
                    )}
                  </ul>
                )}
              </li>
            )}

            {item?.subMenu && item.name === "Authors" && (
              <li
                className="cursor-pointer z-40 gap-2 flex text-center relative border border-transparent rounded-md hover:shadow-lg px-4 py-2"
                onMouseEnter={() => {
                  setShowAuthorMenu(true);
                  setShowCatMenu(false);
                }}
                onMouseLeave={() => {
                  setShowAuthorMenu(false);
                }}
              >
                {item.name}
                <BsChevronDown size={18} className="mt-1" />
                {showAuthorMenu && (
                  <ul className="bg-white z-40 top-10 absolute left-4 min-w-[250px] text-black shadow-xl max-h-28px overflow-y-auto">
                    {authors.length > 0 ? (
                      authors.map((username, index) => (
                        <a
                          key={index}
                          href={`/authors/${username}`}
                          onClick={() => setShowAuthorMenu(false)}
                        >
                          <li className="cursor-pointer flex justify-between items-center px-3 hover:shadow-sm hover:bg-gray-100 rounded-md">
                            {username}
                          </li>
                        </a>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No authors found</li>
                    )}
                    {/* {authors.length > 5 && (
                      <li className="p-3 text-gray-500 text-center">Scroll for more...</li>
                    )} */}
                  </ul>
                )}
              </li>
            )}

            {!item?.subMenu && (
              <li className="cursor-pointer border border-transparent rounded-md transition-transform duration-300 hover:scale-105 px-4 py-2">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default Menu;