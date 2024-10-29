import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreatePost() {
  const router = useRouter(); // Initialize the router

  // State variables for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState(""); // To store the logged-in user's name
  const [postDate, setPostDate] = useState(""); // Automatically set the date
  const [image, setImage] = useState(null);

  // Mock function to fetch logged-in user details (replace with actual authentication logic)
  useEffect(() => {
    // Assuming you fetch the logged-in user's details from a context or API
    const loggedInUser = { name: "Ibrahim Bajwa" }; // Example name, replace with actual user name
    setAuthor(loggedInUser.name);

    // Set the current date as the post date
    setPostDate(new Date().toISOString().split("T")[0]); // Format: YYYY-MM-DD
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("postDate", postDate);
    if (image) {
      formData.append("image", image);
    }

    // Make a POST request to your API to create a new post
    const res = await fetch("/api/addPost", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Post created successfully");
      router.push("/admin/posts"); // Navigate to /admin/posts page
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Gaza Crisis">Gaza Crisis</option>
            <option value="Save Gaza Fsd Activities">Save Gaza Fsd Activities</option>
            <option value="Save Gaza Lhr Activities">Save Gaza Lhr Activities</option>
            <option value="Save Gaza Isb Activities">Save Gaza Isb Activities</option>
            <option value="Save Gaza Khi Activities">Save Gaza Khi Activities</option>
            <option value="Save Gaza Other City Activities">Save Gaza Other City Activities</option>
            <option value="Israel's genocidal assault">Israel's genocidal assault</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
}
