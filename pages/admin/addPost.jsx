import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState(""); // Store author ObjectId
  const [postDate, setPostDate] = useState("");
  const [imageName, setImageName] = useState(""); // Store the image name

  useEffect(() => {
    // Hardcoded user object with an ObjectId and name
    const loggedInUser = { _id: "642c5f88397c2f1a7d8e9a63", name: "Ibrahim Bajwa" }; // Example ObjectId
    setAuthor(loggedInUser._id); // Store the ObjectId
    setPostDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name); // Save only the image name
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      category,
      author, // Now this is the ObjectId
      postDate,
      imageName, // Only send the image name
    };

    const res = await fetch("/api/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await res.json();
    if (data.success) {
      alert("Post created successfully");
      router.push("/admin/posts");
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

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
