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

//   // Split description into chunks after every 300 words ending with "."
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
//   const images = post.post_img || [];

//   const totalItems = Math.max(descriptionChunks.length, images.length);

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//       {/* Main Content */}
//       <div className="flex-grow p-4 w-full lg:w-2/3 mx-auto overflow-y-auto scrollbar-none">
//         <div className="bg-white p-8 shadow-lg rounded-lg overflow-hidden">
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

//           {/* Alternating Images and Descriptions */}
//           {Array.from({ length: totalItems }).map((_, index) => (
//             <div key={index} className="mb-8">
//               {/* Render Image if available */}
//               {images[index] && (
//                 <img
//                   src={`/uploads/${images[index]}`}
//                   alt={`${post.title} - Image ${index + 1}`}
//                   className="w-full h-auto object-cover rounded-lg mb-4"
//                 />
//               )}

//               {/* Render Description if available */}
//               {descriptionChunks[index] && (
//                 <p className="text-gray-700 leading-relaxed mb-4">
//                   {descriptionChunks[index]}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Sidebar at the Bottom for Small Screens */}
//       <aside className="lg:hidden bg-gray-100 p-4 rounded-lg shadow mt-4 mb-4 h-48 overflow-y-auto">
//         <Sidebar />
//       </aside>

//       {/* Sidebar for Large Screens */}
//       <aside className="hidden lg:block lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow h-screen lg:sticky top-0">
//         <Sidebar />
//       </aside>
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

  // Split description into chunks after every 300 words ending with "."
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
  const images = post.post_img || [];

  const totalItems = Math.max(descriptionChunks.length, images.length);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-grow p-4 w-full lg:w-2/3 mx-auto overflow-y-auto scrollbar-none">
        <div className="bg-white p-8 shadow-lg rounded-lg overflow-hidden">
          {/* Title, Username, Date */}
          {images[0] && (
            <div className="">
              <img
                src={`/uploads/${images[0]}`}
                alt={`${post.title} - Image 1`}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
            </div>
          )}

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

          {/* Alternating Images and Descriptions */}
          {Array.from({ length: totalItems }).map((_, index) => (
            <div key={index} className="mb-8">
              {/* Render Description if available */}
              {descriptionChunks[index] && (
               <div className="">
                 <p className="text-gray-700 leading-relaxed mb-4">
                  {descriptionChunks[index]}
                </p>
                <img
                src={`/uploads/${images[index + 1]}`}
                alt={`${post.title} - Image ${index + 2}`}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
               </div>
              )}

              {/* Render Image if available */}
              {/* {images[index + 1] && (
                <img
                  src={`/uploads/${images[index + 1]}`}
                  alt={`${post.title} - Image ${index + 2}`}
                  className="w-full h-auto object-cover rounded-lg mb-4"
                />
              )} */}
            </div>
          ))}

        </div>
      </div>

      {/* Sidebar at the Bottom for Small Screens */}
      <aside className="lg:hidden bg-gray-100 p-4 rounded-lg shadow mt-4 mb-4 h-48 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:block lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow h-screen lg:sticky top-0">
        <Sidebar />
      </aside>
    </div>
  );
};

export default PostDetails;


