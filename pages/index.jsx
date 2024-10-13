import { useState } from "react";
import Sidebar from "../components/Sidebar"; // Make sure the path to Sidebar.js is correct

export default function HomePage() {
  // Hardcoded posts data (replace this with dynamic content later)
  const posts = [
    {
      id: 1,
      title: 'Breaking News: Major Event Happens',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      post_img: '/hajj1.jpg',
      category: 'World',
      author: 'John Doe',
      post_date: '2024-10-13',
    },
    {
      id: 2,
      title: 'Tech Giants Release New Products',
      description:
        'Suspendisse potenti. Etiam ullamcorper, mi ac consequat placerat, felis nibh lacinia.',
      post_img: '/hajj1.jpg',
      category: 'Tech',
      author: 'Jane Smith',
      post_date: '2024-10-12',
    },
    {
      id: 3,
      title: 'Economy Surges Amidst New Policies',
      description:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
      post_img: '/hajj1.jpg',
      category: 'Business',
      author: 'Alice Johnson',
      post_date: '2024-10-11',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2; // Posts per page
  const totalPage = Math.ceil(posts.length / limit);

  const displayedPosts = posts.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Latest News</h1>
  
    {/* Main Content and Sidebar Grid */}
    <div className="md:flex space-x-6">
      {/* Main Content */}
      <div className="w-full md:w-2/3">
        {/* Display posts */}
        <div className="grid grid-cols-1 gap-6">
          {displayedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img className="h-48 w-full object-cover md:w-48" src={post.post_img} alt={post.title} />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-500 transition">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-semibold">{post.category}</span> | <span>{post.author}</span> |{' '}
                    <span>{post.post_date}</span>
                  </p>
                  <p className="text-gray-700 mb-4">{post.description.slice(0, 100)}...</p>
                  <a href={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Pagination */}
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
  
      {/* Sidebar */}
      <div className="w-full md:w-1/3 mt-8 md:mt-0">
        <Sidebar />
      </div>
    </div>
  </div>
  
  );
}
