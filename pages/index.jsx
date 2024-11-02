import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../components/Loader";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error('Expected an array of posts but received:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Latest News</h1>
      {loading ? (
        <Loader />  // Use the Loader component here
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 font-bold">No posts available.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={`/uploads/${post.post_img}`} alt={post.title} />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-500 transition">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      <span className="font-semibold">{post.category}</span> | <span>{post.author}</span> |{' '}
                      <span>{new Date(post.post_date).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-700 mb-4">{post.description.slice(0, 100)}...</p>
                    <Link href={`/post/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
