import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

export default function AddUser() {
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
    </div>
  );
}
