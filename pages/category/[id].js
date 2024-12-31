import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";

export default function AuthorPage() {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getCategoryPosts?id=${id}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) return <Loader />;

  if (posts.length === 0) {
    return (
      <div className="mt-3 flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No Posts Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find any posts in the selected category. Check back later.
          </p>
          <Link href="/" passHref>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300 ease-in-out">
              Go Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Wrapper>
        <h1 className="text-3xl my-6 flex items-center justify-center font-bold mb-8">
          <span>Posts on</span>{" "}
          <span className="text-primary">{posts[0]?.category}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden"
            >
              <div className="relative">
                <img
                  className="h-72 w-full object-cover"
                  src={`/uploads/${post.post_img[0]}`}
                  alt={post.title || "Post Image"}
                />
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-br-lg">
                  {post.category || "Uncategorized"}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-500 transition-colors duration-300">
                  {post.title || "Untitled Post"}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Author{" "}
                  <span className="font-semibold">
                    {post.authorDetails?.username || "Unknown Author"}
                  </span>{" "}
                  | <span>{new Date(post.post_date).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.description?.slice(0, 120) || "No description available..."}
                  ...
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
