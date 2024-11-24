import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UpdateCategory() {
  const router = useRouter();
  const { cid } = router.query; // Get the category ID from the query params

  const [category, setCategory] = useState({
    category_id: '',
    category_name: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the category information based on the category ID
  useEffect(() => {
    if (cid) {
      // Replace with actual fetch from MongoDB
      // For now, we simulate fetching data
      setLoading(true);
      setTimeout(() => {
        setCategory({
          category_id: cid,
          category_name: 'Technology', // This is hardcoded for now
        });
        setLoading(false);
      }, 500); // Simulate API delay
    }
  }, [cid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category_id, category_name } = category;

    // Validate data before submitting
    if (!category_name) {
      setErrorMessage('Category Name is required.');
      return;
    }

    setErrorMessage('');

    // Simulate a PATCH request to update the category in MongoDB
    try {
      const res = await fetch(`/api/categories/${category_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_name,
        }),
      });

      if (res.ok) {
        router.push('/admin/categories'); // Redirect to the categories list
      } else {
        throw new Error('Failed to update category');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (loading) {
    return <p>Loading category...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Category</h1>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="cat_id"
            value={category.category_id}
          />
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              name="cat_name"
              value={category.category_name}
              onChange={(e) =>
                setCategory({ ...category, category_name: e.target.value })
              }
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Category
          </button>
        </form>
      </div>

      <div className="mt-4">
        <button
          onClick={() => router.push('/admin/categories')}
          className="text-gray-600 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
