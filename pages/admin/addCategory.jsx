import { useState } from "react";
import { useRouter } from "next/router";
import { FaCheck, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

export default function AddCategory() {
  const router = useRouter();
  const { showPopup, updatePopup, logout } = useUser();
  const [confirmation, setConfirmation] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/addCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category_name: categoryName }),
    });

    const data = await res.json();
    if (data.success) {
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
      }, 3000);
      router.push("/admin/categories");
    } else {
      alert("Failed to create category");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-12">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mt-16 mb-16 mx-auto sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Add New Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#22C55E] hover:bg-[#D0312D] text-white font-bold p-2 rounded-lg w-full sm:w-auto sm:px-6"
            >
              Add Category
            </button>
          </div>
        </form>

        {/* Popup for logout */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg text-center max-w-sm w-full">
              <div className="bg-red-200 p-6 rounded-full flex items-center justify-center mb-4">
                <FaSignOutAlt size={25} color="red" />
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
        )}

        {/* Confirmation Popup */}
        {confirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg text-center max-w-sm w-full">
              <div className="bg-green-400 p-6 rounded-full flex items-center justify-center mb-4">
                <FaCheck size={25} color="white" />
              </div>
              <div className="text-lg text-green-500">
                Category Added Successfully!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
