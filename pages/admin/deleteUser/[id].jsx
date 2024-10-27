import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const DeleteUser = () => {
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

  // Handle user deletion
  const handleDelete = async () => {
    const confirmation = confirm(`Are you sure you want to delete user ${user.username}?`);
    if (!confirmation) return;

    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      alert("User deleted successfully");
      router.push("/admin/users"); // Redirect after successful deletion
    } else {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete User</h1>
      <div className="space-y-4">
        <div className="form-group">
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name} // Display the current first name
            disabled
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="form-group">
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name} // Display the current last name
            disabled
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="form-group">
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={user.username} // Display the current username
            disabled
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="form-group">
          <label className="block font-medium">User Role</label>
          <select
            name="role"
            value={user.role} // Display the current role
            disabled
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="0">Normal User</option>
            <option value="1">Admin</option>
          </select>
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-lg w-full"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
