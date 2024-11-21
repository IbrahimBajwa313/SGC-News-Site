import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./Loader";

export default function PostCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const postsWithAuthors = await Promise.all(
            data.data.map(async (post) => {
              if (post.author) {
                try {
                  try {
                    const authorResponse = await fetch(`/api/getUsers?_id=${post.author}`);
                    const authorData = await authorResponse.json();
                    console.log("Author API response for post:", post.author, authorData);
                    return { ...post, authorName: authorData.username || "Unknown" };
                  } catch (error) {
                    console.error("Error fetching author:", error);
                    return { ...post, authorName: "Unknown" };
                  }
                  
                  return { ...post, authorName: authorData.username || "Unknown" };
                } catch (error) {
                  console.error("Error fetching author:", error);
                  return { ...post, authorName: "Unknown" };
                }
              }
              return { ...post, authorName: "Unknown" };
            })
          );
          setPosts(postsWithAuthors);
        } else {
          console.error("Unexpected posts data:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loader />;
  if (posts.length === 0)
    return <p className="text-center text-gray-500 font-bold">No posts available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) =>
        post && post._id ? (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden"
          >
            <Link href={`/postDescription/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
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
            </Link>
            <div className="p-6">
              <Link href={`/postDescription/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-500 transition-colors duration-300">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500 mb-4">
                By <span className="font-semibold">{post.authorName}</span> |{" "}
                <span>{new Date(post.post_date).toLocaleDateString()}</span>
              </p>
              <Link href={`/postDescription/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                <p className="text-gray-700 leading-relaxed mb-4">{post.description.slice(0, 120)}...</p>
                Read more →
              </Link>
            </div>
          </div>
        ) : (
          <p key={Math.random()} className="text-red-500 font-bold">Invalid post data</p>
        )
      )}
    </div>
  );
}
