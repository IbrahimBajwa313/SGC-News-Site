import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router'; 

// Hardcoded author and post data
const authors = {
  1: {
    username: "JohnDoe",
    posts: [
      {
        post_id: 1,
        title: "The Future of AI",
        description: "AI is transforming the world in various industries, from healthcare to finance. This post explores...",
        post_img: "sample-image.jpg",
        post_date: "2024-10-12",
        category_name: "Technology",
        category_id: 1,
      },
      {
        post_id: 2,
        title: "Quantum Computing 101",
        description: "Quantum computing is set to revolutionize problem-solving. Learn how it works and what the future holds...",
        post_img: "sample-image.jpg",
        post_date: "2024-09-25",
        category_name: "Technology",
        category_id: 1,
      },
    ],
  },
  2: {
    username: "JaneSmith",
    posts: [
      {
        post_id: 3,
        title: "The Importance of Sleep",
        description: "Sleep is crucial for physical and mental well-being. Learn how to improve your sleep hygiene...",
        post_img: "sample-image.jpg",
        post_date: "2024-09-10",
        category_name: "Health",
        category_id: 2,
      },
    ],
  },
};

export default function AuthorPage() {
  const router = useRouter();
  const { aid, page = 1 } = router.query;
  const limit = 3;
  const offset = (page - 1) * limit;
  
  // Get the author data based on aid
  const author = authors[aid];

  // If the author doesn't exist, show a fallback message
  if (!author) {
    return <p>Author not found</p>;
  }

  const posts = author.posts.slice(offset, offset + limit);
  const totalPosts = author.posts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <div> 
      <div className="container mx-auto p-4">
        <div className="row flex">
          <div className="col-md-8 w-full">
            <h2 className="page-heading">Author Name: {author.username}</h2>

            {/* Post List */}
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.post_id} className="post-container">
                  <div className="post-content flex mb-6">
                    <div className="col-md-4">
                      <a href={`/post/${post.post_id}`}>
                        <img
                          src={`/admin/upload/${post.post_img}`}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </a>
                    </div>
                    <div className="col-md-8 px-4">
                      <h3 className="text-xl font-semibold">
                        <a href={`/post/${post.post_id}`}>{post.title}</a>
                      </h3>
                      <div className="post-information text-gray-500 my-2">
                        <span>
                          <i className="fa fa-tags"></i> {post.category_name}
                        </span>
                        <span className="ml-4">
                          <i className="fa fa-calendar"></i> {post.post_date}
                        </span>
                      </div>
                      <p className="description">
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

            {/* Pagination */}
            {totalPosts > limit && (
              <ul className="pagination admin-pagination">
                {page > 1 && (
                  <li>
                    <a href={`/author/${aid}?page=${Number(page) - 1}`}>Prev</a>
                  </li>
                )}
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={i + 1 === Number(page) ? "active" : ""}>
                    <a href={`/author/${aid}?page=${i + 1}`}>{i + 1}</a>
                  </li>
                ))}
                {page < totalPages && (
                  <li>
                    <a href={`/author/${aid}?page=${Number(page) + 1}`}>Next</a>
                  </li>
                )}
              </ul>
            )}
          </div>
  
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
        <Sidebar />
      </div>
        </div>
      </div> 
    </div>
  );
}
