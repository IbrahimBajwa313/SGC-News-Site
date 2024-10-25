import { useState, useEffect } from "react";  

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2; // Posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log("Fetched Posts:", data);

        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
          console.log("Posts state updated:", data.data); // Log the posts state
        } else {
          console.error('Expected an array of posts but received:', data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const displayedPosts = Array.isArray(posts) 
    ? posts.slice((currentPage - 1) * limit, currentPage * limit) 
    : [];
  console.log("Displayed Posts:", displayedPosts); // Check the displayed posts

  const totalPage = Math.ceil(posts.length / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Latest News</h1>
    
      <div className="md:flex space-x-6">
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 gap-6">
            {displayedPosts.length === 0 ? (
              <p className="text-center text-gray-500">No posts available.</p>
            ) : (
              displayedPosts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img className="h-48 w-full object-cover md:w-48" src={`/uploads/${post.postImg}`} alt={post.title} />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-500 transition">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-semibold">{post.category}</span> | <span>{post.author}</span> |{' '}
                        <span>{new Date(post.post_date).toLocaleDateString()}</span>
                      </p>
                      <p className="text-gray-700 mb-4">{post.description.slice(0, 100)}...</p>
                      <a href={`/post/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
            >
              Prev
            </button>
            {[...Array(totalPage).keys()].map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 mx-1 rounded ${i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPage}
              className={`px-4 py-2 mx-1 bg-gray-200 rounded ${currentPage === totalPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
