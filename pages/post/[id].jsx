// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar"; // Adjust the path as needed
// import Loader from "../../components/Loader";

// const PostDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       const fetchPost = async () => {
//         try {
//           const res = await fetch(`/api/posts/${id}`);
//           const data = await res.json();
//           if (data.success) {
//             setPost(data.data);
//           } else {
//             console.error("Error fetching post details:", data.message);
//           }
//         } catch (error) {
//           console.error("Fetch error:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchPost();
//     }
//   }, [id]);

//   if (loading) return <Loader />;

//   if (!post) return <p className="text-center text-red-500">Post not found</p>;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow h-screen sticky top-0">
//         <Sidebar />
//       </aside>

//       {/* Main Content with Invisible Scrollbar */}
//       <div className="flex-grow p-8 w-2/3 overflow-y-auto scrollbar-none">
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <img
//             src={`/uploads/${post.post_img[0]}`}
//             alt={post.title}
//             className="w-full h-96 object-cover"
//           />
//           <div className="p-6">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               {post.title}
//             </h1>
//             <p className="text-gray-500 mb-4">
//               By{" "}
//               <span className="font-semibold">
//                 {post.authorDetails.username}
//               </span>{" "}
//               | {new Date(post.post_date).toLocaleDateString()}
//             </p>
//             <p className="text-gray-700 leading-relaxed">{post.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;


import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar"; // Adjust the path as needed
import Loader from "../../components/Loader";

const PostDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loader />;

  if (!post) return <p className="text-center text-red-500">Post not found</p>;

  const descriptionChunks = splitDescription(post.description);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-4 w-2/3 overflow-y-auto scrollbar-none">
        <div className="bg-white p-8 shadow-lg rounded-lg overflow-hidden">
          {/* Render First Image */}
          {post.post_img[0] && (
            <img
              src={`/uploads/${post.post_img[0]}`}
              alt={`${post.title} - Image 1`}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
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
    </div>
  );
};

export default PostDetails;

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar"; // Adjust the path as needed
// import Loader from "../../components/Loader";

// const PostDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       const fetchPost = async () => {
//         try {
//           const res = await fetch(`/api/posts/${id}`);
//           const data = await res.json();
//           if (data.success) {
//             setPost(data.data);
//           } else {
//             console.error("Error fetching post details:", data.message);
//           }
//         } catch (error) {
//           console.error("Fetch error:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchPost();
//     }
//   }, [id]);

//   const splitDescription = (desc) => {
//     const words = desc.split(" ");
//     let chunks = [];
//     let temp = [];

//     words.forEach((word) => {
//       temp.push(word);
//       if (temp.length >= 300 && word.endsWith(".")) {
//         chunks.push(temp.join(" "));
//         temp = [];
//       }
//     });

//     if (temp.length) chunks.push(temp.join(" "));
//     return chunks;
//   };

//   if (loading) return <Loader />;

//   if (!post) return <p className="text-center text-red-500">Post not found</p>;

//   const descriptionChunks = splitDescription(post.description);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow h-screen sticky top-0">
//         <Sidebar />
//       </aside>

//       {/* Main Content */}
//       <div className="flex-grow p-4 w-2/3 overflow-y-auto scrollbar-none">
//         <div className="bg-white p-8 shadow-lg rounded-lg overflow-hidden">
//           {/* Render First Image */}
//           {post.post_img[0] && (
//             <img
//               src={`/uploads/${post.post_img[0]}`}
//               alt={`${post.title} - Image 1`}
//               className="w-full h-auto object-cover rounded-lg mb-4"
//             />
//           )}

//           {/* Title, Username, Date */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               {post.title}
//             </h1>
//             <p className="text-gray-500">
//               By{" "}
//               <span className="font-semibold">
//                 {post.authorDetails.username}
//               </span>{" "}
//               | {new Date(post.post_date).toLocaleDateString()}
//             </p>
//           </div>

//           {/* First Description Chunk */}
//           {descriptionChunks[0] && (
//             <p className="text-gray-700 leading-relaxed mb-8">
//               {descriptionChunks[0]}
//             </p>
//           )}

//           {/* Alternate Images and Description Chunks */}
//           {descriptionChunks.slice(1).map((chunk, index) => (
//             <div key={index} className="mb-8">
//               {/* Images corresponding to each subsequent chunk */}
//               {post.post_img[index + 1] && (
//                 <img
//                   src={`/uploads/${post.post_img[index + 1]}`}
//                   alt={`${post.title} - Image ${index + 2}`}
//                   className="w-full h-auto object-cover rounded-lg mb-4"
//                 />
//               )}
//               {/* Description Chunk */}
//               <p className="text-gray-700 leading-relaxed">{chunk}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;
