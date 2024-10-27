import { useEffect, useState } from "react";
import Link from "next/link";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the API
  const fetchPosts = async () => {
    const res = await fetch('/api/getPosts');
    const data = await res.json();
    if (data.success) {
      setPosts(data.data); // Set the posts from the API response
    } else {
      console.error('Failed to fetch posts:', data.message);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Posts</h1>
        <Link href="/admin/addPost">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Add Post
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Index</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Author</th>
              <th className="border border-gray-300 p-2">Edit</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}> {/* Use the MongoDB _id as the key */}
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{post.title}</td>
                <td className="border border-gray-300 p-2">{post.category}</td>
                <td className="border border-gray-300 p-2">{new Date(post.post_date).toLocaleDateString()}</td> {/* Format date */}
                <td className="border border-gray-300 p-2">{post.author}</td>
                <td className="border border-gray-300 p-2">
                  <Link href={`/edit-post?id=${post._id}`}>
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">
                  <Link href={`/delete-post?id=${post._id}`}>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
