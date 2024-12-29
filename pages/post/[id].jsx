import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar"; // Adjust the path as needed
import Loader from "../../components/Loader";
import PostCard from "../../components/PostCard"; // Adjust the path as needed

const PostDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const res = await fetch(`/api/posts/${id}`);
          const data = await res.json();
          if (data.success) {
            setPost(data.data);
          } else {
            console.error("Error fetching post details:", data.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id]);

  const splitDescription = (desc) => {
    const words = desc.split(" ");
    let chunks = [];
    let temp = [];

    words.forEach((word) => {
      temp.push(word);
      if (temp.length >= 300 && word.endsWith(".")) {
        chunks.push(temp.join(" "));
        temp = [];
      }
    });

    if (temp.length) chunks.push(temp.join(" "));
    return chunks;
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader />
      </div>
    );

  // if (loading) return <Loader />;

  if (!post) return <p className="text-center text-red-500">Post not found</p>;

  const descriptionChunks = splitDescription(post.description);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-grow p-4 w-full lg:w-2/3 mx-auto overflow-y-auto scrollbar-none">
        <div className="p-8 rounded-lg overflow-hidden">
          {/* Render First Image
          {post.post_img[0] && (
            <img
              src={`/uploads/${post.post_img[0]}`}
              alt={`${post.title} - Image 1`}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
          )} */}
          {/* Render First Image */}
          {post.post_img[0] && (
            <div className="relative w-full h-auto max-h-[400px] mb-4 overflow-hidden">
              <img
                src={`/uploads/${post.post_img[0]}`}
                alt={`${post.title} - Image 1`}
                className="w-full h-full object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}

          {/* Title, Username, Date */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            <p className="text-gray-500">
              By{" "}
              <span className="font-semibold">
                {post.authorDetails.username}
              </span>{" "}
              | {new Date(post.post_date).toLocaleDateString()}
            </p>
          </div>

          {/* First Description Chunk */}
          {descriptionChunks[0] && (
            <p className="text-gray-700 leading-relaxed mb-8">
              {descriptionChunks[0]}
            </p>
          )}

          {/* Alternate Images and Description Chunks */}
          {descriptionChunks.slice(1).map((chunk, index) => (
            <div key={index} className="mb-8">
              {/* Images corresponding to each subsequent chunk */}
              {post.post_img[index + 1] && (
                <img
                  src={`/uploads/${post.post_img[index + 1]}`}
                  alt={`${post.title} - Image ${index + 2}`}
                  className="w-full h-auto object-cover rounded-lg mb-4"
                />
              )}
              {/* Description Chunk */}
              <p className="text-gray-700 leading-relaxed">{chunk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Posts for Small and Medium Screens */}
      <div className="lg:hidden p-4 w-full">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-4">
          Related Posts
        </h2>
        <PostCard />
      </div>

      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:block lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow h-screen lg:sticky top-0">
        <Sidebar />
      </aside>
    </div>
  );
};

export default PostDetails;
