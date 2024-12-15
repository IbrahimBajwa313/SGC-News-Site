import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { useUser } from '../../context/UserContext';

const Categories = () => {
  const { showPopup, updatePopup, logout } = useUser();

  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  const fetchCategories = async () => {
    const res = await fetch('/api/getCategories');
    const data = await res.json();
    if (data.success) {
      setCategories(data.data); // Set the categories from the API response
    } else {
      console.error('Failed to fetch categories:', data.message);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Categories</h1>
        <Link href="/admin/addCategory">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Add Category
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Index</th>
              <th className="border border-gray-300 p-2">Category Name</th>
              <th className="border border-gray-300 p-2">Post Count</th>
              <th className="border border-gray-300 p-2">Edit</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}> {/* Use the MongoDB _id as the key */}
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{category.category_name}</td>
                <td className="border border-gray-300 p-2">{category.post}</td>
                <td className="border border-gray-300 p-2">
                  <Link href={`/admin/editCategory/${category._id}`}>
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">
                  <Link href={`/admin/deleteCategory/${category._id}`}>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
                <FaSignOutAlt size={25} color="red" className="ml-1" />
              </div>
              <p className="mb-4 text-lg">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    logout();
                    updatePopup(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => updatePopup(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;