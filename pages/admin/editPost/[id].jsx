import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
    post_img: ""
  });
  const [newImage, setNewImage] = useState(null); // Store the new image file

  // Fetch post data when 'id' changes
  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setPost(data.data);
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
    setNewImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to include both text fields and image
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("category", post.category);

    if (newImage) {
      formData.append("newImage", newImage); // Append new image file if provided
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Post updated successfully");
      router.push("/admin/posts"); // Redirect after successful update
    } else {
      alert("Failed to update post");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl text-center font-bold mb-4">Modify Post Details</h1>
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
            <label className="block font-medium">Change Image</label>
            <input
              type="file"
              name="post_img"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
