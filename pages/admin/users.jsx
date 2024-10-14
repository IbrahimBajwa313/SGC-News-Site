// pages/admin/users.js
import { useState } from "react";
import Link from "next/link";

export default function Users() {
  // Hardcoded user data
  const users = [
    {
      user_id: 1,
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
      role: 1,
    },
    {
      user_id: 2,
      first_name: "Jane",
      last_name: "Smith",
      username: "janesmith",
      role: 0,
    },
    {
      user_id: 3,
      first_name: "Mark",
      last_name: "Brown",
      username: "markbrown",
      role: 0,
    },
    {
      user_id: 4,
      first_name: "Sarah",
      last_name: "Lee",
      username: "sarahlee",
      role: 1,
    },
    {
      user_id: 5,
      first_name: "James",
      last_name: "White",
      username: "jameswhite",
      role: 0,
    },
    {
      user_id: 6,
      first_name: "Emily",
      last_name: "Jones",
      username: "emilyjones",
      role: 1,
    },
    {
      user_id: 7,
      first_name: "Michael",
      last_name: "Johnson",
      username: "michaeljohnson",
      role: 0,
    },
  ];

  const limit = 5; // Limit per page
  const [page, setPage] = useState(1); // Current page
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(users.length / limit);

  // Paginated users for the current page
  const paginatedUsers = users.slice(offset, offset + limit);

  return (
    <div className="container mx-auto p-20">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Users</h1>
        <Link
          href="/admin/add-user"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add User
        </Link>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left">S.No.</th>
            <th className="py-3 px-4 text-left">Full Name</th>
            <th className="py-3 px-4 text-left">Username</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Edit</th>
            <th className="py-3 px-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={user.user_id} className="border-t">
              <td className="py-3 px-4">{user.user_id}</td>
              <td className="py-3 px-4">
                {user.first_name} {user.last_name}
              </td>
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">
                {user.role === 1 ? "Admin" : "Normal User"}
              </td>
              <td className="py-3 px-4">
                <Link
                  href={`/admin/edit-user/${user.user_id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
              <td className="py-3 px-4">
                <Link
                  href={`/admin/delete-user/${user.user_id}`}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ul className="flex space-x-2">
          {page > 1 && (
            <li>
              <button
                className="px-3 py-2 bg-gray-300 rounded"
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
            </li>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li key={pageNumber}>
                <button
                  className={`px-3 py-2 rounded ${
                    pageNumber === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
          {page < totalPages && (
            <li>
              <button
                className="px-3 py-2 bg-gray-300 rounded"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
