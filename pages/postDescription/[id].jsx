// pages/postDesription/[id]
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "../../components/Loader";

export default function PostPage() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!postId) return;

    const fetchPost = async () => {
      try {
        if (postId) { 
          const response = await fetch(`/api/getPostById/${postId}`);
          console.log("hahahaha");
          const data = await response.json();
          if (data.success) {
            setPost(data.data);
          } else {
            console.error("Failed to fetch post:", data.message);
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`/api/getPosts`);
        const data = await response.json();
        if (data.success) {
          setAllPosts(data.data);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
      fetchAllPosts();
    }
  }, [postId]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 flex space-x-8">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">All Posts</h2>
        <ul className="space-y-2">
          {allPosts.map((item) => (
            <li key={item._id}>
              <Link href={`/postDescription/${item._id}`}>
                <a className="text-blue-600 hover:underline">{item.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Selected Post */}
      <main className="flex-1 bg-white rounded-lg shadow p-8">
        {post ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <img
              src={`/uploads/${post.post_img}`}
              alt={post.title}
              className="w-full h-96 object-cover mb-4"
            />
            <p className="text-sm text-gray-500 mb-4">
              By <span className="font-semibold">{post.author}</span> | <span>{new Date(post.post_date).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-700 leading-relaxed">{post.description}</p>
          </>
        ) : (
          <p className="text-center text-gray-500 font-bold">Post not found.</p>
        )}
      </main>
    </div>
  );
}
