import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import { FaSignOutAlt } from "react-icons/fa";

export default function UpdateCategory() {
  const { showPopup, updatePopup, logout } = useUser();

  const router = useRouter();
  const { cid } = router.query; // Get the category ID from the query params

  const [category, setCategory] = useState({
    category_id: "",
    category_name: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the category information based on the category ID
  useEffect(() => {
    if (cid) {
      // Replace with actual fetch from MongoDB
      // For now, we simulate fetching data
      setLoading(true);
      setTimeout(() => {
        setCategory({
          category_id: cid,
          category_name: "Technology", // This is hardcoded for now
        });
        setLoading(false);
      }, 500); // Simulate API delay
    }
    console.log("showPopup", showPopup);
  }, [cid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category_id, category_name } = category;

    // Validate data before submitting
    if (!category_name) {
      setErrorMessage("Category Name is required.");
      return;
    }

    setErrorMessage("");

    // Simulate a PATCH request to update the category in MongoDB
    try {
      const res = await fetch(`/api/categories/${category_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_name,
        }),
      });

      if (res.ok) {
        router.push("/admin/categories"); // Redirect to the categories list
      } else {
        throw new Error("Failed to update category");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (loading) {
    return <p>Loading category...</p>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Update Category
      </h1>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="cat_id" value={category.category_id} />
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              name="cat_name"
              value={category.category_name}
              onChange={(e) =>
                setCategory({ ...category, category_name: e.target.value })
              }
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#22C55E] text-white px-4 py-2 rounded hover:bg-[#D0312D] w-full sm:w-auto"
          >
            Update Category
          </button>
        </form>
      </div>

      <div className="mt-4 text-center sm:text-left">
        <button
          onClick={() => router.push("/admin/categories")}
          className="text-gray-600 hover:underline"
        >
          Cancel
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200 p-6 rounded-full flex items-center justify-center">
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
}

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useUser } from "../../context/UserContext";
// import { FaSignOutAlt } from "react-icons/fa";

// export default function UpdateCategory() {
//   const { showPopup, updatePopup, logout } = useUser();

//   const router = useRouter();
//   const { cid } = router.query; // Get the category ID from the query params

//   const [category, setCategory] = useState({
//     category_id: "",
//     category_name: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch the category information based on the category ID
//   useEffect(() => {
//     if (cid) {
//       // Replace with actual fetch from MongoDB
//       // For now, we simulate fetching data
//       setLoading(true);
//       setTimeout(() => {
//         setCategory({
//           category_id: cid,
//           category_name: "Technology", // This is hardcoded for now
//         });
//         setLoading(false);
//       }, 500); // Simulate API delay
//     }
//     console.log("showPopup", showPopup);
//   }, [cid]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { category_id, category_name } = category;

//     // Validate data before submitting
//     if (!category_name) {
//       setErrorMessage("Category Name is required.");
//       return;
//     }

//     setErrorMessage("");

//     // Simulate a PATCH request to update the category in MongoDB
//     try {
//       const res = await fetch(`/api/categories/${category_id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category_name,
//         }),
//       });

//       if (res.ok) {
//         router.push("/admin/categories"); // Redirect to the categories list
//       } else {
//         throw new Error("Failed to update category");
//       }
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   if (loading) {
//     return <p>Loading category...</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Update Category</h1>

//       {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

//       <div className="bg-white p-8 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit}>
//           <input type="hidden" name="cat_id" value={category.category_id} />
//           <div className="mb-4">
//             <label className="block text-gray-700">Category Name</label>
//             <input
//               type="text"
//               name="cat_name"
//               value={category.category_name}
//               onChange={(e) =>
//                 setCategory({ ...category, category_name: e.target.value })
//               }
//               className="mt-1 p-2 border rounded w-full"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-[#22C55E] text-white px-4 py-2 rounded hover:bg-[#D0312D]"
//           >
//             Update Category
//           </button>
//         </form>
//       </div>

//       <div className="mt-4">
//         <button
//           onClick={() => router.push("/admin/categories")}
//           className="text-gray-600 hover:underline"
//         >
//           Cancel
//         </button>
//       </div>
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg text-center">
//             <div className="flex flex-col justify-center items-center gap-5">
//               <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
//                 <FaSignOutAlt size={25} color="red" className="ml-1" />
//               </div>
//               <p className="mb-4 text-lg">Are you sure you want to logout?</p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => {
//                     logout();
//                     updatePopup(false);
//                   }}
//                   className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={() => updatePopup(false)}
//                   className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
