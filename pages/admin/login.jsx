// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const hardcodedUsername = "admin";
  const hardcodedPassword = "123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === hardcodedUsername && password === hardcodedPassword) {
      router.push("/admin/users");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <img
          src="/save-gaza-logo.png"
          alt="News Logo"
          className="mb-6 w-28 sm:w-40 mx-auto"
        />
        <h3 className="text-xl sm:text-2xl text-center font-semibold mb-4 sm:mb-6">
          Admin Login
        </h3>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#22C55E] text-white py-2 rounded-lg hover:bg-[#D0312D] transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
