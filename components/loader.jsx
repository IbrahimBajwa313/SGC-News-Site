// components/Loader.js
export default function Loader() {
    return (
      <div className="fixed inset-0 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  