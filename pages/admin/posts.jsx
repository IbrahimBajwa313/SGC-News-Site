import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSignOutAlt, FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../components/Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [links, setLinks] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [postId, setPostId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showPopup, updatePopup, logout } = useUser();

  // Fetch posts from the API
  const fetchPosts = async () => {
    const userRole = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setLoading(true);

    const res = await fetch("/api/getUserBasedPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Role: userRole, // Include user role in headers
        "User-ID": userId, // Include user ID in headers
      },
    });
    const data = await res.json();
    if (data.success) {
      setPosts(data.data);
      setLoading(false);
    } else {
      console.error("Failed to fetch posts:", data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        ); // Remove deleted post
        setShowDel(false);
        setConfirmation(true);

        setTimeout(() => {
          setConfirmation(false);
        }, 3000);
      } else {
        console.error("Failed to delete post:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  if (isDeleting) return <Loader />;
  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4 px-4 sm:px-8 min-h-screen mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-2xl font-semibold">All Posts</h1>
        <Link href="/admin/addPost">
          <button className="bg-[#22C55E] text-white py-2 px-4 rounded-md hover:bg-[#D0312D] transition-all duration-300 text-sm sm:text-base">
            Add Post
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 text-left font-semibold text-sm sm:text-base">
                Index
              </th>
              <th className="p-3 text-left font-semibold text-sm sm:text-base">
                Title
              </th>
              <th className="p-3 text-left font-semibold text-sm sm:text-base">
                Category
              </th>
              <th className="p-3 text-left font-semibold text-sm sm:text-base">
                Date
              </th>
              <th className="p-3 text-left font-semibold text-sm sm:text-base">
                Author
              </th>
              <th className="p-3 text-center font-semibold text-sm sm:text-base">
                Edit
              </th>
              <th className="p-3 text-center font-semibold text-sm sm:text-base">
                Delete
              </th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {posts.map((post, index) => (
                <motion.tr
                  key={post._id}
                  className={`hover:bg-gray-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  }`}
                  initial={{ x: 0 }}
                  animate={{ x: showDel && postId === post._id ? 1000 : 0 }}
                  exit={{ x: 1000 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <td className="p-3 text-gray-800">{index + 1}</td>
                  <td className="p-3 text-gray-800">{post.title}</td>
                  <td className="p-3 text-gray-800">{post.category}</td>
                  <td className="p-3 text-gray-800">
                    {new Date(post.post_date).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-800">
                    {post.authorDetails.username}
                  </td>
                  <td className="p-3 ">
                    <Link
                      href={`/admin/editPost/${post._id}`}
                      className="text-blue-500 hover:text-blue-700 hover:underline block w-fit mx-auto"
                    >
                      <FaEdit size={20} />
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className="text-red-500 hover:text-red-700 hover:underline cursor-pointer block w-fit mx-auto"
                      onClick={() => {
                        setShowDel((prevState) => !prevState);
                        setPostId(post._id);
                      }}
                    >
                      <FaTrash size={18} />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Additional components for popups */}
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

      {showDel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
                <FaTrash size={25} color="red" className="ml-1" />
              </div>
              <p className="mb-4 text-lg">
                Are you sure you want to delete this post?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    handleDelete();
                    setIsDeleting(true);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDel(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-green-400  p-6 rounded-full flex items-center justify-center">
                <FaCheck size={25} color="white" className="" />
              </div>
              <div className="flex justify-center gap-3">
                Post Deleted Successfully!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
