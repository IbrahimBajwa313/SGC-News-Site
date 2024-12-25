import { useState, useEffect } from "react";
import { FaSignOutAlt, FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUser } from "../../../context/UserContext";
import Loader from "@/components/Loader";

export default function EditCat() {
  const router = useRouter();
  const { showPopup, updatePopup, logout } = useUser();
  const { id } = router.query;
  const [confirmation, setConfirmation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cat, setCat] = useState("");

  useEffect(() => {
    if (id) {
      // Fetch category data when the component loads and id is available
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/getCategory?id=${id}`);
          const data = await response.json();

          if (data.success && data.data) {
            setCat(data.data.category_name);
            console.log(data);
          } else {
          }
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };

      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/editCategory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_name: cat }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setConfirmation(true);
        setTimeout(() => {
          setConfirmation(false);
        }, 3000);
      } else {
        console.log(data.message || "Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isUpdating) return <Loader />;

  return (
    <div className="p-6 sm:p-8 md:p-12 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        Update Category
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </div>
      </form>

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

      {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-green-400 p-6 rounded-full flex items-center justify-center">
                <FaCheck size={25} color="white" />
              </div>
              <div className="flex justify-center gap-3">
                Category Updated Successfully!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { FaSignOutAlt, FaCheck } from 'react-icons/fa';
// import { useRouter } from "next/router";
// import { useUser } from '../../../context/UserContext';
// import Loader from "@/components/loader";

// export default function editCat() {
//   const router = useRouter();
//     const { showPopup, updatePopup, logout } = useUser();
//     const { id } = router.query;
//   const [confirmation, setConfirmation] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false)

//     const [cat, setCat] = useState('')

//       useEffect(() => {
//         if (id) {
//           // Fetch category data when the component loads and id is available
//           const fetchCategory = async () => {
//             try {
//               const response = await fetch(`/api/getCategory?id=${id}`);
//               const data = await response.json();

//               if (data.success && data.data) {
//                 setCat(data.data.category_name);
//                 console.log(data)
//               } else {
//               }
//             } catch (error) {
//               console.error("Error fetching category:", error);
//             }
//           };

//           fetchCategory();
//         }
//       }, [id]);

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsUpdating(true);

//         try {
//           const response = await fetch(`/api/editCategory/${id}`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ category_name: cat }),
//           });

//           const data = await response.json();

//           if (response.ok && data.success) {
//             setConfirmation(true);

//             setTimeout(() => {
//             setConfirmation(false);
//             }, 3000);
//           } else {
//             console(data.message || "Failed to update category.");
//           }
//         } catch (error) {
//           console.error("Error updating category:", error);
//         } finally {
//           setIsUpdating(false);
//         }
//       };

//       if (isUpdating) return <Loader />;

//   return (
//     <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Update Category</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Category Name</label>
//           <input
//             type="text"
//             value={cat}
//             onChange={(e) => setCat(e.target.value)}
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             required
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded-lg w-full"
//           >
//             Update
//           </button>
//         </div>
//       </form>

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

//       {confirmation && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-md shadow-lg text-center">
//                   <div className="flex flex-col justify-center items-center gap-5">
//                     <div className="bg-green-400  p-6 rounded-full flex items-center justify-center">
//                       <FaCheck size={25} color="white" className="" />
//                     </div>
//                     <div className="flex justify-center gap-3">
//                       Category Updated Successfully!
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//     </div>
//   )
// }
