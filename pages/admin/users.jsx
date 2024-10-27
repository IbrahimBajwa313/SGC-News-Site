// pages/admin/users.js
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Users() {  
  const [users, setUsers] = useState([]);
   
  // Fetch users from the API
  const fetchUsers = async () => {
    const res = await fetch('/api/getUsers');
    const data = await res.json();
    if (data.success) {
      setUsers(data.data); // Set the users from the API response
    } else {
      console.error('Failed to fetch users:', data.message);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <div className="container mx-auto p-20">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Users</h1>
        <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/admin/addUser"> 
            Add User 
        </Link>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left">Index</th>
            <th className="py-3 px-4 text-left">Full Name</th>
            <th className="py-3 px-4 text-left">Username</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Edit</th>
            <th className="py-3 px-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.user_id} className="border-t">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                {user.first_name} {user.last_name}
              </td>
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">
                {user.role === 1 ? "Admin" : "Normal User"}
              </td>
              <td className="py-3 px-4">
                <Link className="text-blue-500 hover:underline" href={`/admin/editUser/${user._id}`}>
                  Edit
                </Link>
              </td>
              <td className="py-3 px-4">
                <Link className="text-blue-500 hover:underline" href={`/admin/deleteUser/${user._id}`}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
