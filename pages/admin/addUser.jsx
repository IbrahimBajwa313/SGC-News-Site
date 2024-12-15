import { useState } from "react";
import { useRouter } from "next/router";
import { FaSignOutAlt } from "react-icons/fa";
import { useUser } from '../../context/UserContext'; // Import useRouter

export default function AddUser() {
  const { showPopup, updatePopup, logout } = useUser();

  const router = useRouter(); // Initialize the router
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the user data
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      role,
    };

    // Make a POST request to your API to create a new user
    const res = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (data.success) {
      alert("User created successfully");
      router.push("/admin/users"); // Navigate to /admin/users page
    } else {
      alert("Please fill all the details");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="0">Normal User</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full"
          >
            Add User
          </button>
        </div>
      </form>

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
}
