import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCheck, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useUser } from "../../context/UserContext";
import Loader from "@/components/Loader";

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
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPostImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("category", post.category);
    formData.append("author", localStorage.getItem("userId"));

    postImages.forEach((image) => {
      formData.append("postImages", image);
    });

    const res = await fetch("/api/addPost", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Posted Successfully!");
      setSuccess(true);
      setFailure(false);
      setConfirmation(true);

      setTimeout(() => {
        setConfirmation(false);
      }, 3000);
      setisLoading(false);
      router.push("/admin/posts");
    } else {
      setMsg(data.message);
      setSuccess(false);
      setFailure(true);
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
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl text-center font-bold mb-4">
          Create a New Post
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
            <select
              name="category"
              value={post.category}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block font-medium">Post Image</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-44 mt-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
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

            {postImages.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
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

          <button
            type="submit"
            className="bg-[#22C55E] hover:bg-[#D0312D] font-bold text-white p-2 rounded-lg w-full"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
