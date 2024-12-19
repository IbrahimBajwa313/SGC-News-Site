// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const Sidebar = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("/api/getPosts");
//         const data = await response.json();
//         if (data.success && Array.isArray(data.data)) {
//           setPosts(data.data);
//         } else {
//           console.error("Expected an array of posts but received:", data);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // For handling the search input (this will eventually submit to the backend)
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <div className="w-full p-6 bg-white rounded-lg shadow-lg">
//       {/* Search Box */}
//       <div className="mb-8">
//         <h4 className="text-xl font-bold mb-4 text-gray-900">Search</h4>
//         <form onSubmit={handleSearch} className="flex items-center">
//           <input
//             type="text"
//             name="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-l-md focus:ring focus:ring-blue-500 focus:outline-none"
//             placeholder="Search..."
//           />
//           <button
//             type="submit"
//             className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
//           >
//             Search
//           </button>
//         </form>
//       </div>

//       {/* Recent Posts with Scrollable Area */}
//       <div>
//         <h4 className="text-xl font-bold mb-4 text-gray-900">Recent Posts</h4>
//         <div className="max- h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
//           {posts.map((post) => (
//             <div key={post._id} className="flex items-start mb-4">
//           <Link href={`/post/${post._id}`}>

//                 <div className="block w-16 h-16 overflow-hidden rounded-md shadow-lg relative cursor-pointer">
//                   <Image
//                     src={`/uploads/${post.post_img}`}
//                     alt={post.title}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-md"
//                   />
//                 </div>
//               <div className="ml-4">
//                 <h5 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition">

//                     {post.title}
//                 </h5>
//                 </Link>
//                 <div className="text-sm text-gray-500">
//                   <span className="mr-2 flex items-center">
//                     <i className="fa fa-tags mr-1"></i>
//                     <Link href={`/category/${post.category.toLowerCase()}`}>
//                       <span className="hover:underline">{post.category}</span>
//                     </Link>
//                   </span>
//                 </div>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/getPosts");
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Expected an array of posts but received:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPosts();
  }, []);

  // For handling the search input (this will eventually submit to the backend)
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg h-[92vh] overflow-auto custom-scrollbar">
      {/* Search Box */}
      {/* <div className="mb-8">
        <h4 className="text-xl font-bold mb-4 text-gray-900">Search</h4>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
      </div> */}

      {/* Recent Posts with Scrollable Area */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-gray-900">Recent Posts</h4>
        <div className="max  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
          {posts.map((post) => (
            <div key={post._id} className="flex items-start mb-4">
              <Link href={`/post/${post._id}`}>
                <div className="block w-16 h-16 overflow-hidden rounded-md shadow-lg relative cursor-pointer">
                  <Image
                    src={`/uploads/${post.post_img[0]}`}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </Link>
              <div className="ml-4">
                <Link href={`/post/${post._id}`}>
                  <h5 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition">
                    {post.title}
                  </h5>
                </Link>

                <div className="text-sm text-gray-500">
                  <span className="mr-2 flex items-center">
                    <i className="fa fa-tags mr-1"></i>
                    <Link
                      href={`/category/${post.category.toLowerCase()}`}
                      className="hover:underline"
                    >
                      {post.category}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>






      <style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
     background: #e2e8f0;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1; /* Tailwind's gray-300 */
    border-radius: 10px;
    border: 2px solid #f1f1f1; /* Adds spacing around the thumb */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8; /* Tailwind's gray-400 */
  }
`}</style>

    </div>


    
  );
};

export default Sidebar;
