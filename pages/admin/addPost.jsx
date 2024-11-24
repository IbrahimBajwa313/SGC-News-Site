import { useState } from "react";
import { useRouter } from "next/router";

const AddPost = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [postImage, setPostImage] = useState(null); // For the image file

  // Handle input changes
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("category", post.category);

    if (postImage) {
      formData.append("postImage", postImage); // Append the image file if provided
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Post added successfully!");
      router.push("/admin/posts"); // Navigate to the posts list page
    } else {
      alert("Failed to add post. Check the form inputs.");
    }
  };

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
            <input
              type="text"
              name="category"
              value={post.category}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Image */}
          <div className="form-group">
            <label className="block font-medium">Post Image</label>
            <input
              type="file"
              name="postImage"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
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
    </div>
  );
};

export default AddPost;
