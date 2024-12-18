// components/PostCard.js
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./Loader";

export default function PostCard({ selectedAuthor }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('inside postcard useeffect')
      try {
        const response = await fetch("/api/getPosts");
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Expected an array of posts but received:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      // const userRole = localStorage.getItem("role");
      // const userId = localStorage.getItem("userId"); // Retrieve userId from local storage
    
    
      // try {
      //   // Fetch users with headers containing role and user ID
      //   const res = await fetch("/api/getUsers", {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Role: userRole,
      //       "User-ID": userId,
      //     },
      //   });
    
      //   const data = await res.json();
    
      //   if (data.success) {
      //     console.log("Fetched users data:", data);
    
      //     // Parse the logged-in user from local storage
      //     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
          
      // } catch (error) {
      //   console.error("Error fetching users:", error);
      // } 
    };
    
    

    fetchPosts();
    fetchUsers()
  }, []);
  
  if (loading) return <Loader />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {posts.map((post) =>
    post && post._id ? (
      <div
        key={post._id}
        className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden"
      >
        <Link href={`/post/${post._id}`}>
          <div className="relative">
            <img
              className="h-72 w-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
              src={`/uploads/${post.post_img[0]}`}
              alt={post.title}
            />
            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-br-lg">
              {post.category}
            </div>
            {/* Darken overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-500 transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              By{" "}
              <span className="font-semibold">
                {post.authorDetails.username}
              </span>{" "}
              | <span>{new Date(post.post_date).toLocaleDateString()}</span>
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              {post.description.slice(0, 120)}...
            </p>
          </div>
        </Link>
      </div>
    ) : (
      <p key={Math.random()} className="text-red-500 font-bold">
        Invalid post data
      </p>
    )
  )}
</div>

  );
}
