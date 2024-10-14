import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UpdatePost({ postId }) {
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch post details
        fetch(`/api/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.category);
            });

        // Fetch categories
        fetch('/api/categories')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, [postId]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        if (image) formData.append('image', image);

        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            alert('Post updated successfully!');
        } else {
            alert('Failed to update the post.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Post</h1>
            {post ? (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="post_id" value={post._id} />

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Post Image</label>
                        <img
                            src={`/uploads/${post.image}`}
                            alt="Post Image"
                            className="mb-4 h-32"
                        />
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                    >
                        Update Post
                    </button>
                </form>
            ) : (
                <p>Loading post details...</p>
            )}
        </div>
    );
}
