import { useState } from 'react';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [postTitle, setPostTitle] = useState('Sample Post Title');
  const [postDesc, setPostDesc] = useState('Sample description for the post.');
  const [category, setCategory] = useState('Technology');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fileToUpload', file);
    formData.append('post_title', postTitle);
    formData.append('postdesc', postDesc);
    formData.append('category', category);

    const res = await fetch('/api/uploadPost', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert('Post created successfully');
    } else {
      alert('Failed to create post');
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
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows="4"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
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
