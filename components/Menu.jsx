import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
import { useUser } from '../context/UserContext';

const Menu = ({ showCatMenu, setShowCatMenu, showAuthorMenu, setShowAuthorMenu }) => {
  const { user, logout, updatePopup, } = useUser();
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [adminPage, setAdminPage] = useState(false);
  const router = useRouter();

  const data = [
    { id: 1, name: "About", url: "/about" },
    { id: 2, name: "Categories", subMenu: true },
    { id: 3, name: "Authors", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  // Fetch categories and authors
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
      const res = await fetch("/api/getUsers");
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

    if(router.pathname.includes('/admin')){
      setAdminPage(true)
    } else{
      setAdminPage(false)
    }
  }, [router]);

  return (
    <div>
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
                      categories.map(({ category_name, _id }) => (
                        <Link
                          key={_id}
                          href={`/category/${_id}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="cursor-pointer flex justify-between items-center px-3 hover:shadow-sm hover:bg-gray-100 rounded-md">
                            {category_name}
                          </li>
                        </Link>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No categories found</li>
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
                  <ul className="bg-white z-40 top-10 absolute left-4 min-w-[250px] text-black shadow-xl max-h-40 overflow-y-auto">
                    {authors.length > 0 ? (
                      authors.map(({ username, _id }) => (
                        <Link
                          key={_id}
                          href={`/authors/${_id}`}
                          onClick={() => setShowAuthorMenu(false)}
                        >
                          <li className="cursor-pointer flex justify-between items-center px-3 hover:shadow-sm hover:bg-gray-100 rounded-md">
                            {username}
                          </li>
                        </Link>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500">No authors found</li>
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

        <li className="cursor-pointer border border-transparent rounded-md transition-transform duration-300 hover:scale-105 px-4 py-2">
          {(localStorage.getItem("loggedInUser") || adminPage) ? (
            <span onClick={()=>updatePopup(true)} className="cursor-pointer">
              Logout
            </span>
          ) : (
            <Link href='/login'>Login</Link>
          )}
        </li>
      </ul>

      
    </div>
  );
};

export default Menu;
