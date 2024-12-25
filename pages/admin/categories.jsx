import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSignOutAlt, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import Loader from "@/components/Loader";

const Categories = () => {
  const { showPopup, updatePopup, logout } = useUser();
  const [userRole, setUserRole] = useState(false);

  const [categories, setCategories] = useState([]);
  const [showDel, setShowDel] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("/api/getCategories");
    const data = await res.json();
    if (data.success) {
      setCategories(data.data);
      setLoading(false);
    } else {
      console.error("Failed to fetch categories:", data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deleteCategory/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        console.log("Category deleted successfully");
        setCategories((prevCat) =>
          prevCat.filter((cat) => cat._id !== categoryId)
        );
        setShowDel(false);
        setConfirmation(true);

        setTimeout(() => {
          setConfirmation(false);
        }, 3000);
      } else {
        console.error("Failed to delete category:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    const role = Number(localStorage.getItem("role"));
    setUserRole(role);
  }, []);

  if (isDeleting) return <Loader />;
  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:px-20 min-h-screen mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">All Categories</h1>
        {userRole && (
          <Link href="/admin/addCategory">
            <button className="bg-[#22C55E] font-bold text-white py-2 px-4 rounded-md hover:bg-[#D0312D] mt-4 sm:mt-0">
              Add Category
            </button>
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2 sm:p-3 text-left font-semibold">Index</th>
              <th className="p-2 sm:p-3 text-left font-semibold">
                Category Name
              </th>
              <th className="p-2 sm:p-3 text-left font-semibold">Post Count</th>
              {userRole && (
                <>
                  <th className="p-2 sm:p-3 text-center font-semibold">Edit</th>
                  <th className="p-2 sm:p-3 text-center font-semibold">
                    Delete
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category._id}
                className={`hover:bg-gray-200 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <td className="p-2 sm:p-3 text-gray-800">{index + 1}</td>
                <td className="p-2 sm:p-3 text-gray-800">
                  {category.category_name}
                </td>
                <td className="p-2 sm:p-3 text-gray-800">{category.post}</td>
                {userRole && (
                  <>
                    <td className="p-2 sm:p-3 text-center">
                      <Link
                        href={`/admin/editCategory/${category._id}`}
                        className="text-blue-500 hover:text-blue-700 hover:underline block w-fit mx-auto"
                      >
                        <FaEdit size={18} />
                      </Link>
                    </td>
                    <td className="p-2 sm:p-3 text-center">
                      <div
                        className="text-red-500 hover:text-red-700 hover:underline cursor-pointer block w-fit mx-auto"
                        onClick={() => {
                          setShowDel(true);
                          setCategoryId(category._id);
                        }}
                      >
                        <FaTrash size={16} />
                      </div>
                    </td>
                  </>
                )}
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

      {showDel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
                <FaTrash size={25} color="red" className="ml-1" />
              </div>
              <p className="mb-4 text-lg">
                Are you sure you want to delete this category?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    handleDelete();
                    setIsDeleting(true);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDel(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-green-400  p-6 rounded-full flex items-center justify-center">
                <FaCheck size={25} color="white" className="" />
              </div>
              <div className="flex justify-center gap-3">
                Category Deleted Successfully!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
