// import { useRouter } from 'next/router'; 
// import Image from 'next/image'; // Import Next.js Image component

// // Hardcoded category and post data
// const categories = {
//   1: {
//     category_name: "Technology",
//     posts: [
//       {
//         post_id: 1,
//         title: "The Future of AI",
//         description: "AI is transforming the world in various industries, from healthcare to finance. This post explores...",
//         post_img: "sample-image.jpg",
//         author: 1,
//         post_date: "2024-10-12",
//         username: "JohnDoe",
//         category_name: "Technology",
//       },
//       {
//         post_id: 2,
//         title: "Quantum Computing 101",
//         description: "Quantum computing is set to revolutionize problem-solving. Learn how it works and what the future holds...",
//         post_img: "sample-image.jpg",
//         author: 2,
//         post_date: "2024-09-25",
//         username: "JaneSmith",
//         category_name: "Technology",
//       },
//     ],
//   },
//   2: {
//     category_name: "Health",
//     posts: [
//       {
//         post_id: 3,
//         title: "Benefits of a Balanced Diet",
//         description: "A balanced diet is essential for maintaining optimal health. Learn about key nutrients and meal planning...",
//         post_img: "sample-image.jpg",
//         author: 3,
//         post_date: "2024-09-15",
//         username: "AliceWonder",
//         category_name: "Health",
//       },
//     ],
//   },
// };

// export default function CategoryPage() {
//   const router = useRouter();
//   const { cid } = router.query;
//   const category = categories[cid];

//   // If the category doesn't exist, show a fallback
//   if (!category) {
//     return <p>Category not found</p>;
//   }

//   const posts = category.posts;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {/* Sidebar (assuming sidebar is already a component) */}
//         {/* <div className="hidden md:block md:col-span-1"> 
//           <Sidebar /> 
//         </div> */}

//         {/* Main Content */}
//         <div className="md:col-span-3">
//           <h2 className="page-heading text-2xl font-bold mb-6">{category.category_name}</h2>
          
//           {/* Loop through the posts */}
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post.post_id} className="post-container mb-8 p-4 bg-white shadow rounded-lg">
//                 <div className="post-content flex flex-col md:flex-row gap-4">
//                   <div className="w-full md:w-1/3">
//                     <a href={`/post/${post.post_id}`}>
//                       <Image
//                         src={`/admin/upload/${post.post_img}`} // Image path
//                         alt={post.title}
//                         width={300} // Set width and height for optimization
//                         height={200}
//                         className="w-full h-48 object-cover rounded-lg"
//                       />
//                     </a>
//                   </div>
//                   <div className="md:w-2/3">
//                     <h3 className="text-xl font-semibold mb-2">
//                       <a href={`/post/${post.post_id}`} className="hover:underline">{post.title}</a>
//                     </h3>
//                     <div className="post-information text-gray-500 mb-2">
//                       <span>
//                         <i className="fa fa-tags mr-1"></i> {post.category_name}
//                       </span>
//                       <span className="ml-4">
//                         <i className="fa fa-user mr-1"></i> {post.username}
//                       </span>
//                       <span className="ml-4">
//                         <i className="fa fa-calendar mr-1"></i> {post.post_date}
//                       </span>
//                     </div>
//                     <p className="description text-gray-700">
//                       {post.description.slice(0, 150)}...
//                     </p>
//                     <a className="text-blue-500 hover:underline" href={`/post/${post.post_id}`}>
//                       Read more
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No records found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// pages/authors/[id].js
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
    console.log(router.query)
    if (!id) return;

    console.log('catID',id)

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getCategoryPosts?id=${id}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
          setLoading(false);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
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
            Sorry, we couldn't find any posts on the selected category. Check back later.
          </p>
          <Link href="/" passHref>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300 ease-in-out">
              Go Back to Homepage
            </button>
          </Link>
        </div>
        {/* <div className="mt-8">
          <img src="/no-posts.png" alt="No posts illustration" className="w-full h-64" />
        </div> */}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Wrapper>
        <h1 className="text-3xl my-6 flex items-center justify-center font-bold mb-8 space-x-2">
          <span>Posts on</span> <span className="text-primary">{posts[0]?.category}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden">
              <div className="relative">
                <img className="h-72 w-full object-cover" src={`/uploads/${post.post_img[0]}`} alt={post.title || "Post Image"} />
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-br-lg">
                  {post.category || "Uncategorized"}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-500 transition-colors duration-300">
                  {post.title || "Untitled Post"}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  By <span className="font-semibold">{post.authorDetails?.username || "Unknown Author"}</span> | <span>{new Date(post.post_date).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.description?.slice(0, 120) || "No description available..."}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}