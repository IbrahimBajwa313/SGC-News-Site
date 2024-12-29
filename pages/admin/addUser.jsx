import { useState } from "react";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { AiOutlineClose } from "react-icons/ai";

export default function AddUser() {
  const { showPopup, updatePopup, logout } = useUser();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const [postImage, setPostImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      role,
      post_img: postImage ? postImage : "/uploads/defaultPic.jpg",
    };

    const res = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (data.success) {
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
        router.push("/admin/users");
      }, 3000);
    } else {
      alert("Please fill all the details");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto sm:p-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add New User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="0">Normal User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#22C55E] hover:bg-[#D0312D] font-bold text-white py-2 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          Add User
        </button>
      </form>

      {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-green-400 p-4 rounded-full">
                <FaCheck size={24} color="white" />
              </div>
              <p className="text-lg font-medium">User Added Successfully!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
