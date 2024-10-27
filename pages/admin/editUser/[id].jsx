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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modify User Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="form-group">
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="form-group">
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="form-group">
          <label className="block font-medium">User Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="0">Normal User</option>
            <option value="1">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
