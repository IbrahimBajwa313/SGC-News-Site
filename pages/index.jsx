// pages/index.js
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Wrapper from "../components/Wrapper";
import PostCard from "../components/PostCard";

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
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800">Save Gaza News</h1>
        {loading ? (
          <Loader /> 
        ) : (
          <Wrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500 font-bold">No posts available.</p>
              ) : (
                posts.map((post) => <PostCard key={post._id} post={post} />)
              )}
            </div>
          </Wrapper>
        )}
      </div>
    </div>
  );
}
