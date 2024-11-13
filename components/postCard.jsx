// components/PostCard.js
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden">
      <Link href={`/postDescription/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
        <div className="relative">
          <img className="h-72 w-full object-cover" src={`/uploads/${post.post_img}`} alt={post.title} />
          <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-br-lg">
            {post.category}
          </div>
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/postDescription/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-500 transition-colors duration-300">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mb-4">
          By <span className="font-semibold">{post.author}</span> | <span>{new Date(post.post_date).toLocaleDateString()}</span>
        </p>
        <Link href={`/postDescription/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
          <p className="text-gray-700 leading-relaxed mb-4">{post.description.slice(0, 120)}...</p>
          Read more →
        </Link>
      </div>
    </div>
  );
}
