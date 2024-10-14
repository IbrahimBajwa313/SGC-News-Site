import { useState } from "react";
import Link from "next/link";

// Hardcoded post data
const posts = [
  {
    id: 1,
    title: "Understanding JavaScript",
    category: "Technology",
    date: "2024-10-01",
    author: "Admin",
  },
  {
    id: 2,
    title: "React.js for Beginners",
    category: "Technology",
    date: "2024-10-05",
    author: "Admin",
  },
  {
    id: 3,
    title: "Machine Learning 101",
    category: "Science",
    date: "2024-10-10",
    author: "John Doe",
  },
  // Add more posts as needed
];

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 7;

  // Pagination Logic
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPosts = posts.slice((page - 1) * limit, page * limit);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Posts</h1>
        <Link href="/add-post">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Add Post
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">S.No.</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Author</th>
              <th className="border border-gray-300 p-2">Edit</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr key={post.id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{post.title}</td>
                <td className="border border-gray-300 p-2">{post.category}</td>
                <td className="border border-gray-300 p-2">{post.date}</td>
                <td className="border border-gray-300 p-2">{post.author}</td>
                <td className="border border-gray-300 p-2">
                  <Link href={`/edit-post?id=${post.id}`}>
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">
                  <Link href={`/delete-post?id=${post.id}`}>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ul className="flex justify-center space-x-2">
          {page > 1 && (
            <li>
              <button
                onClick={() => setPage(page - 1)}
                className="bg-gray-300 py-1 px-3 rounded-md hover:bg-gray-400"
              >
                Prev
              </button>
            </li>
          )}
          {[...Array(totalPages)].map((_, i) => (
            <li key={i}>
              <button
                onClick={() => setPage(i + 1)}
                className={`py-1 px-3 rounded-md ${
                  i + 1 === page ? "bg-blue-600 text-white" : "bg-gray-300"
                } hover:bg-gray-400`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          {page < totalPages && (
            <li>
              <button
                onClick={() => setPage(page + 1)}
                className="bg-gray-300 py-1 px-3 rounded-md hover:bg-gray-400"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PostsPage;
