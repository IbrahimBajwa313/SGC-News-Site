import React, { useState } from 'react';

const Sidebar = () => {
  // Hardcoded recent posts data (replace this with dynamic content later)
  const recentPosts = [
    {
      id: 1,
      title: 'Breaking News: Major Event Happens',
      post_img: '/hajj1.jpg',
      category: 'World',
      post_date: '2024-10-13',
    },
    {
      id: 2,
      title: 'Tech Giants Release New Products',
      post_img: '/hajj1.jpg',
      category: 'Tech',
      post_date: '2024-10-12',
    },
    {
      id: 3,
      title: 'Economy Surges Amidst New Policies',
      post_img: '/hajj1.jpg',
      category: 'Business',
      post_date: '2024-10-11',
    },
    {
      id: 4,
      title: 'Climate Change Conference Highlights',
      post_img: '/hajj1.jpg',
      category: 'Environment',
      post_date: '2024-10-10',
    },
    {
      id: 5,
      title: 'Local Sports Team Wins Championship',
      post_img: '/hajj1.jpg',
      category: 'Sports',
      post_date: '2024-10-09',
    },
  ];

  // For handling the search input (this will eventually submit to the backend)
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add logic to handle search here, like navigating to a search results page
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full   p-6 bg-gray-50 rounded-lg shadow-lg">
    {/* Search Box */}
    <div className="mb-8">
      <h4 className="text-xl font-bold mb-4 text-gray-900">Search</h4>
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-l-md focus:ring focus:ring-blue-500 focus:outline-none"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600 transition"
        >
          Search
        </button>
      </form>
    </div>
  
    {/* Recent Posts */}
    <div>
      <h4 className="text-xl font-bold mb-4 text-gray-900">Recent Posts</h4>
      {recentPosts.map((post) => (
        <div key={post.id} className="flex items-start mb-4">
          <a href={`/post/${post.id}`} className="block w-16 h-16 overflow-hidden rounded-md shadow-lg">
            <img
              src={post.post_img}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </a>
          <div className="ml-4">
            <h5 className="text-md font-semibold text-gray-800 hover:text-blue-600 transition">
              <a href={`/post/${post.id}`}>{post.title}</a>
            </h5>
            <div className="text-sm text-gray-500">
              <span className="mr-2">
                <i className="fa fa-tags"></i>{' '}
                <a href={`/category/${post.category.toLowerCase()}`} className="hover:underline">
                  {post.category}
                </a>
              </span>
              <span>
                <i className="fa fa-calendar"></i> {post.post_date}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Sidebar;
