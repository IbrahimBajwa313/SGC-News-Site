import { useRouter } from 'next/router'; 
import Image from 'next/image'; // Import Next.js Image component

// Hardcoded category and post data
const categories = {
  1: {
    category_name: "Technology",
    posts: [
      {
        post_id: 1,
        title: "The Future of AI",
        description: "AI is transforming the world in various industries, from healthcare to finance. This post explores...",
        post_img: "sample-image.jpg",
        author: 1,
        post_date: "2024-10-12",
        username: "JohnDoe",
        category_name: "Technology",
      },
      {
        post_id: 2,
        title: "Quantum Computing 101",
        description: "Quantum computing is set to revolutionize problem-solving. Learn how it works and what the future holds...",
        post_img: "sample-image.jpg",
        author: 2,
        post_date: "2024-09-25",
        username: "JaneSmith",
        category_name: "Technology",
      },
    ],
  },
  2: {
    category_name: "Health",
    posts: [
      {
        post_id: 3,
        title: "Benefits of a Balanced Diet",
        description: "A balanced diet is essential for maintaining optimal health. Learn about key nutrients and meal planning...",
        post_img: "sample-image.jpg",
        author: 3,
        post_date: "2024-09-15",
        username: "AliceWonder",
        category_name: "Health",
      },
    ],
  },
};

export default function CategoryPage() {
  const router = useRouter();
  const { cid } = router.query;
  const category = categories[cid];

  // If the category doesn't exist, show a fallback
  if (!category) {
    return <p>Category not found</p>;
  }

  const posts = category.posts;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar (assuming sidebar is already a component) */}
        {/* <div className="hidden md:block md:col-span-1"> 
          <Sidebar /> 
        </div> */}

        {/* Main Content */}
        <div className="md:col-span-3">
          <h2 className="page-heading text-2xl font-bold mb-6">{category.category_name}</h2>
          
          {/* Loop through the posts */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.post_id} className="post-container mb-8 p-4 bg-white shadow rounded-lg">
                <div className="post-content flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <a href={`/post/${post.post_id}`}>
                      <Image
                        src={`/admin/upload/${post.post_img}`} // Image path
                        alt={post.title}
                        width={300} // Set width and height for optimization
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </a>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">
                      <a href={`/post/${post.post_id}`} className="hover:underline">{post.title}</a>
                    </h3>
                    <div className="post-information text-gray-500 mb-2">
                      <span>
                        <i className="fa fa-tags mr-1"></i> {post.category_name}
                      </span>
                      <span className="ml-4">
                        <i className="fa fa-user mr-1"></i> {post.username}
                      </span>
                      <span className="ml-4">
                        <i className="fa fa-calendar mr-1"></i> {post.post_date}
                      </span>
                    </div>
                    <p className="description text-gray-700">
                      {post.description.slice(0, 150)}...
                    </p>
                    <a className="text-blue-500 hover:underline" href={`/post/${post.post_id}`}>
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No records found</p>
          )}
        </div>
      </div>
    </div>
  );
}
