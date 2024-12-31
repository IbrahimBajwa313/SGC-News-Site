// pages/index.js
import Wrapper from "../components/Wrapper";
import PostCard from "../components/PostCard";
import HeroSection from "@/components/HeroSection";
import { FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../context/UserContext";

export default function HomePage() {
  const { showPopup, updatePopup, logout } = useUser();

  return (
    <div>
      <HeroSection />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800">
            Save Gaza Blogs
          </h1>
          <Wrapper>
            <PostCard />
          </Wrapper>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
                <FaSignOutAlt size={25} color="red" className="ml-1" />
              </div>
              <p className="mb-4 text-lg">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    logout();
                    updatePopup(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => updatePopup(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
