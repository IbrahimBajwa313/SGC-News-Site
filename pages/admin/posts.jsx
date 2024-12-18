import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSignOutAlt, FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../../components/loader'


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [links, setLinks] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [postId, setPostId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showPopup, updatePopup, logout } = useUser();

  // Fetch posts from the API
  const fetchPosts = async () => {
    const userRole = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setLoading(true)

    const res = await fetch('/api/getUserBasedPosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Role': userRole, // Include user role in headers
        'User-ID': userId, // Include user ID in headers
      },
    });
    const data = await res.json();
    if (data.success) {
      setPosts(data.data); 
    setLoading(false)
    // Set the posts from the API response
    } else {
      console.error('Failed to fetch posts:', data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        console.log("Post deleted successfully");
        setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId)); // Remove deleted post
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
  }

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  if (isDeleting) return <Loader />;
      if (loading) return <Loader />;



  return (
    <div className="container mx-auto p-4 px-20 min-h-screen mt-8 ">
      {/* <div className="menu w-1/4 flex items-center gap-7" onClick={() => setLinks((prev) => !prev)}>
        <div className="logo bg-slate-600 py-3 px-5 flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-700">
          <i class="fas fa-bars text-2xl text-white"></i>
        </div>

        <AnimatePresence>
          {links && (
            <motion.div
              key="links" // This ensures React knows when the component enters or exits
              className="links flex justify-center items-center gap-5 py-2 px-4 rounded-lg bg-slate-700"
              initial={{ x: '-20%' }} // Start off-screen
              animate={{ x: '0%' }} // Slide to the visible position
              exit={{ x: '-20%' }} // Slide out to the left when links is false
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <Link href={'/admin/categories'} className="text-white cursor-pointer hover:text-gray-300">Categories</Link>
              <Link href={'/admin/posts'} className="text-white cursor-pointer hover:text-gray-300">Posts</Link>
              <Link href={'/admin/users'} className="text-white cursor-pointer hover:text-gray-300">Users</Link>
              <Link href={'/admin/settings'} className="text-white cursor-pointer hover:text-gray-300">Settings</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}



      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Posts</h1>
        <Link href="/admin/addPost">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Add Post
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
      <table className="table-auto w-full rounded-lg shadow-md overflow-hidden">
  <thead className="bg-gray-700 text-white">
    <tr>
      <th className="p-3 text-left font-semibold">Index</th>
      <th className="p-3 text-left font-semibold">Title</th>
      <th className="p-3 text-left font-semibold">Category</th>
      <th className="p-3 text-left font-semibold">Date</th>
      <th className="p-3 text-left font-semibold">Author</th>
      <th className="p-3 text-center font-semibold">Edit</th>
      <th className="p-3 text-center font-semibold">Delete</th>
    </tr>
  </thead>
  <AnimatePresence>
    <tbody>
      {posts.map((post, index) => (
        <motion.tr
          key={post._id}
          className={`hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}
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
          <td className="p-3 text-gray-800">{post.authorDetails.username}</td>
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



        {/* <table className="table-auto w-full border-collapse border border-gray-200">
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
          <AnimatePresence>
            <tbody>
              {posts.map((post, index) => (
                <motion.tr key={post._id}
                initial={{ x: 0 }}
                animate={{ x: showDel && postId === post._id ? 1000 : 0 }} 
                exit={{ x: 1000 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}> 
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{post.title}</td>
                  <td className="border border-gray-300 p-2">{post.category}</td>
                  <td className="border border-gray-300 p-2">{new Date(post.post_date).toLocaleDateString()}</td> 
                  <td className="border border-gray-300 p-2"> {post.authorDetails.username}</td>
                  <td className="border border-gray-300 p-2">

                    <Link href={`/admin/editPost/${post._id}`} className="text-blue-600 hover:underline block w-fit mx-auto cursor-pointer">
                        <FaEdit size={20} className="text-blue-600 hover:text-blue-700" />
                    </Link>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="text-red-600 hover:underline cursor-pointer w-fit mx-auto">
                        <FaTrash size={18} className="text-red-600 hover:text-red-700" onClick={() => {
                        setShowDel((prevState) => !prevState);
                        setPostId(post._id)
                      }}/>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </table> */}
      </div>

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
              <p className="mb-4 text-lg">Are you sure you want to delete this post?</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    handleDelete();
                    setIsDeleting(true)
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
