import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "About", url: "/about" },
  { id: 2, name: "Categories", subMenu: true },
  { id: 3, name: "Contact", url: "/contact" },
  { id: 4, name: "Login", url: "/login" },
];

const Menu = ({
  showCatMenu,
  setShowCatMenu,
  showSortMenu,
  setShowSortMenu,
}) => {
  const [categories, setCategories] = useState([]);

 // Fetch categories from the API
const fetchCategories = async () => {
    try {
      const res = await fetch("/api/getCategories");
      const data = await res.json();
      if (data.success) {
        // Extract only the `category_name` field from the response
        const categoryNames = data.data.map((category) => category.category_name);
        setCategories(categoryNames);
        console.log("Fetched categories:", categoryNames);
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);
//   console.log(categories)

  return (
    <>
      <ul className="hidden lg:flex items-center font-medium text-black">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {item?.subMenu && (
              <li
                className="cursor-pointer z-40 gap-2 flex text-center relative border border-transparent rounded-md hover:shadow-lg px-4 py-2"
                onMouseEnter={() => {
                  setShowCatMenu(true);
                  setShowSortMenu(false); // Close sort menu
                }}
                onMouseLeave={() => {
                  setShowCatMenu(false);
                }}
              >
                {item.name}
                <BsChevronDown size={18} className="mt-1" />
                {showCatMenu && (
                  <ul className="bg-white z-40 top-10 absolute left-4 min-w-[250px] text-black shadow-xl">
                    {categories.length > 0 ? (
                      categories.map((name, index) => (
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
