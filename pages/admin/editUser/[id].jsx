import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCheck, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "@/context/UserContext";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    role: "0",
  });
  const [confirmation, setConfirmation] = useState(false);
  const { showPopup, updatePopup, logout } = useUser();

  // Fetch user data when 'id' changes
  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setUser(data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (data.success) {
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
      }, 3000);
      router.push("/admin/users"); // Redirect after successful update
    } else {
      alert("Failed to update user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xl px-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Modify User Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="form-group">
            <label className="block font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="form-group">
            <label className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="form-group">
            <label className="block font-medium text-gray-700">User Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            >
              <option value="0">Normal User</option>
              <option value="1">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>

      {/* Confirmation Popup */}
      {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-green-400 p-6 rounded-full flex items-center justify-center">
                <FaCheck size={25} color="white" />
              </div>
              <div className="flex justify-center gap-3">
                User Updated Successfully!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200 p-6 rounded-full flex items-center justify-center">
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
        </div>
      )}
    </div>
  );
};

export default EditUser;

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { FaCheck, FaSignOutAlt } from "react-icons/fa";
// import { useUser } from "@/context/UserContext";

// const EditUser = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [user, setUser] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     role: "0"
//   });
//   const [confirmation, setConfirmation] = useState(false);
//   const { showPopup, updatePopup, logout } = useUser();

//   // Fetch user data when 'id' changes
//   useEffect(() => {
//     if (id) {
//       fetch(`/api/users/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) setUser(data.data);
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch(`/api/users/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });

//     const data = await res.json();
//     if (data.success) {
//       // alert("User updated successfully");
//       setConfirmation(true)
//       setTimeout(() => {
//         setConfirmation(false);
//       }, 3000);
//       router.push("/admin/users"); // Redirect after successful update
//     } else {
//       alert("Failed to update user");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <div className="w-[40%]">
//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Modify User Details</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="form-group">
//             <label className="block font-medium text-gray-700">First Name</label>
//             <input
//               type="text"
//               name="first_name"
//               value={user.first_name}
//               onChange={handleChange}
//               className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="block font-medium text-gray-700">Last Name</label>
//             <input
//               type="text"
//               name="last_name"
//               value={user.last_name}
//               onChange={handleChange}
//               className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="block font-medium text-gray-700">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={user.username}
//               onChange={handleChange}
//               className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="block font-medium text-gray-700">User Role</label>
//             <select
//               name="role"
//               value={user.role}
//               onChange={handleChange}
//               className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="0">Normal User</option>
//               <option value="1">Admin</option>
//             </select>
//           </div>
//           <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
//             Update
//           </button>
//         </form>
//       </div>
//       {confirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg text-center">
//             <div className="flex flex-col justify-center items-center gap-5">
//               <div className="bg-green-400  p-6 rounded-full flex items-center justify-center">
//                 <FaCheck size={25} color="white" className="" />
//               </div>
//               <div className="flex justify-center gap-3">
//                 User Updated Successfully!
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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
// };

// export default EditUser;
