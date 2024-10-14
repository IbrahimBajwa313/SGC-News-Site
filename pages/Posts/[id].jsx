// pages/post/[id].js

import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function PostPage() {
  // For now, we're hardcoding the data.
  const post = {
    id: 1,
    title: "Sample Post Title",
    description:
      "This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.This is a sample post description.",
    category_name: "Technology",
    username: "JohnDoe",
    post_date: "2024-10-12",
    post_img: "sample-image.jpg", // Placeholder image
    category: 2,
    author: 1,
  };

  return (
    <div className="pb-48">
      <div id="main-content" className="container mx-auto p-4">
        <div className="row flex">
          <div className="col-md-8 w-full">
            <div className="post-container">
              <div className="post-content single-post bg-white shadow-md p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <div className="post-information mb-4">
                  <span className="text-gray-600 mr-4">
                    <i className="fa fa-tags"></i>
                    <a
                      href={`/category/${post.category}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.category_name}
                    </a>
                  </span>
                  <span className="text-gray-600 mr-4">
                    <i className="fa fa-user"></i>
                    <a
                      href={`/author/${post.author}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.username}
                    </a>
                  </span>
                  <span className="text-gray-600">
                    <i className="fa fa-calendar"></i>
                    {post.post_date}
                  </span>
                </div>
                <div className="w-full h-64 mb-4 relative">
                  <Image
                    src={`/admin/upload/${post.post_img}`}
                    alt={post.title}
                    layout="responsive"
                    width={700} // you can adjust the width
                    height={400} // and adjust the height
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <p className="description py-10  text-gray-700">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <Sidebar />
          </div>

          {/* Sidebar can be added here */}
        </div>
      </div>
    </div>
  );
}
