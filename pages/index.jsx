// pages/index.js
import Wrapper from "../components/Wrapper";
import PostCard from "../components/Postcard";

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800">Save Gaza News</h1>
        <Wrapper>
          <PostCard />
        </Wrapper>
      </div>
    </div>
  );
}
