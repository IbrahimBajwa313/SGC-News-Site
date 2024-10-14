import { useState } from "react";
import { useRouter } from "next/router";

export default function UpdateUserPage() {
  const router = useRouter();
  const userId = router.query.id; // Simulate getting user ID from query params

  // Simulated user data, hardcoded for now
  const [userData, setUserData] = useState({
    user_id: 1,
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    role: "1",
  });

  const [formData, setFormData] = useState({
    f_name: userData.first_name,
    l_name: userData.last_name,
    username: userData.username,
    role: userData.role,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we simulate the update process (You would handle API calls here in a real app)
    console.log("Updated data:", formData);
    alert("User details updated successfully!");
    // Redirect after successful update
    router.push("/admin/users");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="w-full lg:w-2/3 mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-6">Modify User Details</h1>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <input type="hidden" name="user_id" value={userData.user_id} />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">First Name</label>
              <input
                type="text"
                name="f_name"
                value={formData.f_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="l_name"
                value={formData.l_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">User Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">User Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="0">Normal User</option>
                <option value="1">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
