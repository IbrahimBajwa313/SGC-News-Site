import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import { FaSignOutAlt } from "react-icons/fa";

export default function UpdatePostPage() {
  const { showPopup, updatePopup, logout } = useUser();

  const router = useRouter();
  const postId = router.query.id; // Simulate getting post ID from query params

  // Simulated post data, hardcoded for now
  const [postData, setPostData] = useState({
    post_id: 1,
    title: "Sample Post Title",
    description: "This is the description of the post.",
    category: 1, // Assume 1 is the category ID
    post_img: "sample-image.jpg", // Simulated image file
  });

  const categories = [
    { category_id: 1, category_name: "Technology" },
    { category_id: 2, category_name: "Business" },
    { category_id: 3, category_name: "Health" },
  ];

  const [formData, setFormData] = useState({
    post_title: postData.title,
    postdesc: postData.description,
    category: postData.category,
    new_image: null,
    old_image: postData.post_img,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, new_image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we simulate the update process (You would handle API calls here in a real app)
    console.log("Updated data:", formData);
    alert("Post updated successfully!");
    // Redirect after successful update
    router.push("/admin/posts");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-2/3 mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Update Post
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-6"
          >
            <input type="hidden" name="post_id" value={postData.post_id} />

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="post_title"
                value={formData.post_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="postdesc"
                rows="5"
                value={formData.postdesc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Post Image
              </label>
              <img
                src={`/images/${postData.post_img}`}
                alt="Post"
                className="mb-4 w-full max-w-xs mx-auto rounded-lg"
              />
              <label className="block text-gray-700 font-medium mb-2">
                Change Image
              </label>
              <input
                type="file"
                name="new_image"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input type="hidden" name="old_image" value={postData.post_img} />
            </div>

            <button
              type="submit"
              className="w-full bg-[#22C55E] text-white font-medium py-2 rounded-lg hover:bg-[#D0312D] transition-all duration-300"
            >
              Update
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200 p-6 rounded-full flex items-center justify-center">
                <FaSignOutAlt size={25} color="red" className="ml-1" />
              </div>
              <p className="mb-4 text-lg">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    logout();
                    updatePopup(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => updatePopup(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useUser } from '../../context/UserContext';
// import { FaSignOutAlt } from "react-icons/fa";

// export default function UpdatePostPage() {
//   const { showPopup, updatePopup, logout } = useUser();

//   const router = useRouter();
//   const postId = router.query.id; // Simulate getting post ID from query params

//   // Simulated post data, hardcoded for now
//   const [postData, setPostData] = useState({
//     post_id: 1,
//     title: "Sample Post Title",
//     description: "This is the description of the post.",
//     category: 1, // Assume 1 is the category ID
//     post_img: "sample-image.jpg", // Simulated image file
//   });

//   const categories = [
//     { category_id: 1, category_name: "Technology" },
//     { category_id: 2, category_name: "Business" },
//     { category_id: 3, category_name: "Health" },
//   ];

//   const [formData, setFormData] = useState({
//     post_title: postData.title,
//     postdesc: postData.description,
//     category: postData.category,
//     new_image: null,
//     old_image: postData.post_img,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, new_image: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here we simulate the update process (You would handle API calls here in a real app)
//     console.log("Updated data:", formData);
//     alert("Post updated successfully!");
//     // Redirect after successful update
//     router.push("/admin/posts");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container mx-auto px-4">
//         <div className="w-full lg:w-2/3 mx-auto">
//           <h1 className="text-3xl font-semibold text-center mb-6">Update Post</h1>

//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//             <input type="hidden" name="post_id" value={postData.post_id} />

//             {/* Title */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="post_title"
//                 value={formData.post_title}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Description</label>
//               <textarea
//                 name="postdesc"
//                 rows="5"
//                 value={formData.postdesc}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>

//             {/* Category */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               >
//                 {categories.map((cat) => (
//                   <option key={cat.category_id} value={cat.category_id}>
//                     {cat.category_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Image */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Post Image</label>
//               <img src={`/images/${postData.post_img}`} alt="Post" className="mb-4 w-48 h-auto rounded-lg" />
//               <label className="block text-gray-700 font-medium mb-2">Change Image</label>
//               <input
//                 type="file"
//                 name="new_image"
//                 onChange={handleImageChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <input type="hidden" name="old_image" value={postData.post_img} />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
//             >
//               Update
//             </button>
//           </form>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg text-center">
//             <div className="flex flex-col justify-center items-center gap-5">
//               <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
//                 <FaSignOutAlt size={25} color="red" className="ml-1" />
//               </div>
//               <p className="mb-4 text-lg">Are you sure you want to logout?</p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => {
//                     logout();
//                     updatePopup(false);
//                   }}
//                   className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={() => updatePopup(false)}
//                   className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
