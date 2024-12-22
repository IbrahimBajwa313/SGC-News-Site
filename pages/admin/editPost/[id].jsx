import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import Loader from "@/components/Loader";

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
    post_img: [], // This should contain URLs of initial images
  });
  const [newImages, setNewImages] = useState([]); // For storing new images
  const [loading, setisLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  // Fetch post data when 'id' changes
  useEffect(() => {
    if (id) {
      setisLoading(true);
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setPost(data.data);
          setisLoading(false);
        })
        .catch((err) => console.error("Error fetching post:", err));
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Handle new image file change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]); // Append new images
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("category", post.category);

    // Combine existing images and new images into a single array
    const allImages = [...post.post_img, ...newImages];

    // Append all images (existing and new) as a single array
    allImages.forEach((image) => {
      if (typeof image === "string") {
        formData.append("images", image);
      } else {
        formData.append("images", image.name);
      }
    });

    setisLoading(true);

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setisLoading(false);
      setConfirmation(true);

      setTimeout(() => {
        setConfirmation(false);
      }, 2000);

      router.push("/admin/posts");
    } else {
      alert("Failed to update post");
    }
  };

  // Remove selected image from newImages array
  const handleRemoveImage = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl text-center font-bold mb-4">
          Modify Post Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="form-group">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={post.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="block font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={post.category}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="form-group">
            <label className="block font-medium">Post Image</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-44 mt-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {post.post_img.length > 0 && (
            <div className="mt-4 space-x-4 flex overflow-x-auto">
              {post.post_img.map((image, index) => (
                <div key={index} className="w-32 h-32 relative">
                  <img
                    src={`/uploads/${image}`} // Assuming the image path from the server
                    alt={`Post Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPost((prevState) => {
                        const updatedImages = prevState.post_img.filter(
                          (_, i) => i !== index
                        );
                        return { ...prevState, post_img: updatedImages };
                      });
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New Image Previews */}
          {newImages.length > 0 && (
            <div className="mt-4 space-x-4 flex overflow-x-auto">
              {newImages.map((image, index) => (
                <div key={index} className="w-32 h-32 relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4"
          >
            Update Post
          </button>
        </form>
      </div>

      {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-green-400  p-6 rounded-full flex items-center justify-center">
                <FaCheck size={25} color="white" className="" />
              </div>
              <div className="flex justify-center gap-3">
                Post Edited Successfully!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaCheck } from "react-icons/fa";
// import Loader from "@/components/loader";

// const EditPost = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [post, setPost] = useState({
//     title: "",
//     description: "",
//     // category: "",
//     post_img: [], // This should contain URLs of initial images
//   });
//   const [newImages, setNewImages] = useState([]); // For storing new images
//   const [loading, setisLoading] = useState(false);
//   const [confirmation, setConfirmation] = useState(false);

//   // Fetch post data when 'id' changes
//   useEffect(() => {
//     if (id) {
//       setisLoading(true)
//       fetch(`/api/posts/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) setPost(data.data);
//       setisLoading(false)

//         })
//         .catch((err) => console.error("Error fetching post:", err));
//     }
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   // Handle new image file change
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages((prevImages) => [...prevImages, ...files]); // Append new images
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", post.title);
//     formData.append("description", post.description);
//     formData.append("category", post.category);

//     // Combine existing images and new images into a single array
//     const allImages = [...post.post_img, ...newImages];

//     // Append all images (existing and new) as a single array
//     allImages.forEach((image) => {
//       // If it's a URL, just append it directly
//       if (typeof image === "string") {
//         formData.append("images", image);
//       } else {
//         // If it's a file, append it as a file object
//         formData.append("images", image.name);
//       }
//     });

//     setisLoading(true)

//     // Send the form data
//     const res = await fetch(`/api/posts/${id}`, {
//       method: "PUT",
//       body: formData,
//     });

//     const data = await res.json();
//     if (data.success) {
//       setisLoading(false)
//       setConfirmation(true);

//       setTimeout(() => {
//         setConfirmation(false);
//       }, 2000);

//       router.push("/admin/posts");
//     } else {
//       alert("Failed to update post");
//     }
//   };

//   // Remove selected image from newImages array
//   const handleRemoveImage = (index) => {
//     setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//     if (loading) return <Loader />;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
//         <h1 className="text-3xl text-center font-bold mb-4">Modify Post Details</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="form-group">
//             <label className="block font-medium">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={post.title}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label className="block font-medium">Description</label>
//             <textarea
//               name="description"
//               value={post.description}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label className="block font-medium">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={post.category}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label className="block font-medium">Post Image</label>
//             <div className="flex items-center justify-center w-full">
//               <label
//                 htmlFor="dropzone-file"
//                 className="flex flex-col items-center justify-center w-full h-44 mt-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
//               >
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <svg
//                     className="w-8 h-8 mb-4 text-gray-500"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 16"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                     />
//                   </svg>
//                   <p className="mb-2 text-sm text-gray-500">
//                     <span className="font-semibold">Click to upload</span> or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//                 </div>
//                 <input
//                   id="dropzone-file"
//                   type="file"
//                   className="hidden"
//                   multiple
//                   onChange={handleImageChange}
//                   required
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Image Preview */}
//           {post.post_img.length > 0 && (
//             <div className="mt-4 space-x-4 flex overflow-x-auto">
//               {post.post_img.map((image, index) => (
//                 <div key={index} className="w-32 h-32 relative">
//                   <img
//                     src={`/uploads/${image}`} // Assuming the image path from the server
//                     alt={`Post Image ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setPost((prevState) => {
//                         const updatedImages = prevState.post_img.filter((_, i) => i !== index);
//                         return { ...prevState, post_img: updatedImages };
//                       });
//                     }}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                   >
//                     <AiOutlineClose size={20} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* New Image Previews */}
//           {newImages.length > 0 && (
//             <div className="mt-4 space-x-4 flex overflow-x-auto">
//               {newImages.map((image, index) => (
//                 <div key={index} className="w-32 h-32 relative">
//                   <img
//                      src={URL.createObjectURL(image)}
//                     alt={`New Image ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveImage(index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                   >
//                     <AiOutlineClose size={20} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
//             Update Post
//           </button>
//         </form>
//       </div>

//         {confirmation && (
//                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                  <div className="bg-white p-6 rounded-md shadow-lg text-center">
//                    <div className="flex flex-col justify-center items-center gap-5">
//                      <div className="bg-green-400  p-6 rounded-full flex items-center justify-center">
//                        <FaCheck size={25} color="white" className="" />
//                      </div>
//                      <div className="flex justify-center gap-3">
//                        Post Edited Successfully!
//                      </div>
//                    </div>
//                  </div>
//                </div>
//              )}
//     </div>
//   );
// };

// export default EditPost;
