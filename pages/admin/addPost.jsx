import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCheck, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { useUser } from '../../context/UserContext';
import Loader from "@/components/loader";

const AddPost = () => {
  const { showPopup, updatePopup, logout } = useUser();

  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [postImages, setPostImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setisLoading] = useState(false);
  const [msg, setMsg] = useState('');


  // Handle input changes
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Handle file input change
  // const handleImageChange = (e) => {
  //   setPostImages(e.target.files[0]);
  // };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setPostImages((prevImages) => [...prevImages, ...files]);
    console.log('imgs', postImages)
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true)

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("category", post.category);
    formData.append("author", localStorage.getItem("userId"));

    // if (postImage) {
    //   formData.append("postImage", postImage); // Append the image file if provided
    // }

    console.log('imgs', postImages)

    postImages.forEach((image) => {
      formData.append("postImages", image);
    });

    console.log('formdata', formData)

    const res = await fetch("/api/addPost", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setMsg('Posted Successfully!')
      setSuccess(true)
      setFailure(false)
      setConfirmation(true);

      setTimeout(() => {
        setConfirmation(false);
      }, 3000);
      setisLoading(false);
      router.push("/admin/posts"); // Navigate to the posts list page
    } else {
      // alert(data.message);
      setMsg(data.message)
      setSuccess(false)
      setFailure(true)
      setConfirmation(true);

      setTimeout(() => {
        setConfirmation(false);
      }, 2000);
      setisLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/getCategories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
        console.log('categories', categories)
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  if (loading) return <Loader />;



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl text-center font-bold mb-4">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
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

          {/* Description */}
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

          {/* Category */}
          <div className="form-group">
            <label className="block font-medium">Category</label>
            <select
              type="text"
              name="category"
              value={post.category}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="form-group">
            <label className="block font-medium">Post Image</label>

            <div class="flex items-center justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-44 mt-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" multiple onChange={handleImageChange} required />
              </label>
            </div>

            {postImages.length > 0 && (
            <div className="mt-4 space-x-4 flex overflow-x-auto">
              {postImages.map((image, index) => (
                <div key={index} className="w-32 h-32 relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPostImages((prevImages) =>
                        prevImages.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full"
          >
            Add Post
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
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

      {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              {/* <div className="bg-green-400  p-6 rounded-full flex items-center justify-center"> */}
              <div className={`p-6 rounded-full flex items-center justify-center ${success ? 'bg-green-400' : 'bg-red-400'}`}>
                {success ? (
                  <FaCheck size={25} color="white" className="" />
                ) : (<AiOutlineClose size={25} color="red" className="" />)}
                {/* {failure ? (
                  <AiOutlineClose size={25} color="red" className="" />
                ):(null)} */}
              </div>
              <div className="flex justify-center gap-3">
                {msg}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
