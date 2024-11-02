import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    role: "0"
  });

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
      alert("User updated successfully");
      router.push("/admin/users"); // Redirect after successful update
    } else {
      alert("Failed to update user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Modify User Details</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block font-medium text-gray-700">First Name</label>
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
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
            Update
          </button>  
        </form>
      </div>
    </div>
  );
};

export default EditUser;
