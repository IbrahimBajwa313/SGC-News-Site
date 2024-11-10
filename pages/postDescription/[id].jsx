import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import Image from "next/image";

export default function PostPage() {
  const router = useRouter();
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract postId from the URL path if router.query is undefined
    const idFromPath = router.asPath.split("/").pop();
    if (!postId && idFromPath) {
      setPostId(idFromPath);
    }
  }, [router.asPath, postId]);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/getPostById/${postId}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.data);
        } else {
          console.error("Failed to fetch post:", data.message);
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

    fetchPost();
    fetchAllPosts();
  }, [postId]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 flex space-x-8">
      <main className="flex-1 bg-white rounded-lg shadow p-8">
  {post ? (
    <>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Image Container */}
<div className="relative w-full h-96 mb-8 overflow-hidden rounded-md shadow-lg">
  <Image
    src={`/uploads/${post.post_img}`}
    alt={post.title}
    layout="fill"                // Makes the image fill the parent container
    objectFit="cover"            // Ensures the image covers the area without distortion
    className="rounded-md"       // Adds rounded corners
  />
</div>


      <p className="text-sm text-gray-500 mb-4">
        By <span className="font-semibold">{post.author}</span> |{" "}
        <span>{new Date(post.post_date).toLocaleDateString()}</span>
      </p>
      <p className="text-gray-700 leading-relaxed">{post.description}</p>
    </>
  ) : (
    <p className="text-center text-gray-500 font-bold">Post not found.</p>
  )}
</main>


      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow">
        <Sidebar />
      </aside>
    </div>
  );
}
