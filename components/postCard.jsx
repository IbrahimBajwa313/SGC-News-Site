// components/PostCard.js
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./Loader";

export default function PostCard({ selectedAuthor }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
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

    fetchPosts();
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
                className="h-72 w-full object-cover"
                src={`/uploads/${post.post_img}`}
                alt={post.title}
              />
              <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-br-lg">
                {post.category}
              </div>
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
            </div></Link>
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
