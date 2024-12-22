import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

export default function Settings() {
  const { showPopup, updatePopup, logout } = useUser();

  const [websiteName, setWebsiteName] = useState("");
  const [footerDesc, setFooterDesc] = useState("");
  const [logo, setLogo] = useState(null);
  const [currentLogo, setCurrentLogo] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setWebsiteName(data.websitename);
        setFooterDesc(data.footerdesc);
        setCurrentLogo(data.logo);
      });
  }, []);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("websitename", websiteName);
    formData.append("footerdesc", footerDesc);
    if (logo) formData.append("logo", logo);

    const response = await fetch("/api/settings", {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("Settings updated successfully!");
    } else {
      alert("Failed to update the settings.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Website Settings
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Website Name */}
          <div>
            <label
              htmlFor="websitename"
              className="block text-sm font-medium text-gray-700"
            >
              Website Name
            </label>
            <input
              type="text"
              id="websitename"
              name="websitename"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base px-4 py-2"
            />
          </div>

          {/* Footer Description */}
          <div>
            <label
              htmlFor="footerdesc"
              className="block text-sm font-medium text-gray-700"
            >
              Footer Description
            </label>
            <textarea
              id="footerdesc"
              name="footerdesc"
              value={footerDesc}
              onChange={(e) => setFooterDesc(e.target.value)}
              rows="5"
              className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base px-4 py-2"
            />
          </div>

          {/* Logo Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Logo Image
            </label>
            {currentLogo && (
              <div className="mb-4 flex justify-center">
                <img
                  src={`/uploads/${currentLogo}`}
                  alt="Current Logo"
                  className="h-32 object-contain border border-gray-300 rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              name="logo"
              onChange={handleLogoChange}
              className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base px-4 py-2 transition duration-300 ease-in-out hover:border-indigo-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#22C55E] text-white font-semibold rounded-md hover:bg-[#D0312D] transition duration-300 ease-in-out"
          >
            Update Settings
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-md shadow-lg text-center space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-red-100 p-4 rounded-full">
                <FaSignOutAlt size={28} color="red" />
              </div>
              <p className="text-lg font-medium text-gray-800">
                Are you sure you want to logout?
              </p>
            </div>
            <div className="flex justify-center gap-4">
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
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { FaSignOutAlt } from "react-icons/fa";
// import { useUser } from '../../context/UserContext';

// export default function Settings() {
//   const { showPopup, updatePopup, logout } = useUser();

//     const [websiteName, setWebsiteName] = useState('');
//     const [footerDesc, setFooterDesc] = useState('');
//     const [logo, setLogo] = useState(null);
//     const [currentLogo, setCurrentLogo] = useState('');

//     useEffect(() => {
//         // Fetch settings data
//         fetch('/api/settings')
//             .then((res) => res.json())
//             .then((data) => {
//                 setWebsiteName(data.websitename);
//                 setFooterDesc(data.footerdesc);
//                 setCurrentLogo(data.logo);
//             });
//     }, []);

//     const handleLogoChange = (e) => {
//         setLogo(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('websitename', websiteName);
//         formData.append('footerdesc', footerDesc);
//         if (logo) formData.append('logo', logo);

//         const response = await fetch('/api/settings', {
//             method: 'PUT',
//             body: formData,
//         });

//         if (response.ok) {
//             alert('Settings updated successfully!');
//         } else {
//             alert('Failed to update the settings.');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
//                 <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Website Settings</h1>
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     {/* Website Name */}
//                     <div className="mb-6">
//                         <label htmlFor="websitename" className="block text-sm font-medium text-gray-700">
//                             Website Name
//                         </label>
//                         <input
//                             type="text"
//                             id="websitename"
//                             name="websitename"
//                             value={websiteName}
//                             onChange={(e) => setWebsiteName(e.target.value)}
//                             className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
//                         />
//                     </div>

//                     {/* Footer Description */}
//                     <div className="mb-6">
//                         <label htmlFor="footerdesc" className="block text-sm font-medium text-gray-700">
//                             Footer Description
//                         </label>
//                         <textarea
//                             id="footerdesc"
//                             name="footerdesc"
//                             value={footerDesc}
//                             onChange={(e) => setFooterDesc(e.target.value)}
//                             rows="5"
//                             className="mt-1 block w-full border-2 border-gray-300   rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
//                         />
//                     </div>

//                     {/* Logo Image */}
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium text-gray-700">Logo Image</label>
//                         {currentLogo && (
//                             <div className="mb-4 flex justify-center">
//                                 <img
//                                     src={`/uploads/${currentLogo}`}
//                                     alt="Current Logo"
//                                     className="h-32 object-contain"
//                                 />
//                             </div>
//                         )}
//                         <input
//                             type="file"
//                             name="logo"
//                             onChange={handleLogoChange}
//                             className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:ring-2 focus:border-indigo-600 sm:text-sm px-4 py-2 transition duration-300 ease-in-out hover:border-indigo-400 focus:outline-none"
//                                 />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
//                     >
//                         Update Settings
//                     </button>
//                 </form>
//             </div>

//             {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg text-center">
//             <div className="flex flex-col justify-center items-center gap-5">
//               <div className="bg-red-200  p-6 rounded-full flex items-center justify-center">
//                 <FaSignOutAlt size={25} color="red" className="ml-1" />
//               </div>
//               <p className="mb-4 text-lg">Are you sure you want to logout?</p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => {
//                     logout();
//                     updatePopup(false);
//                   }}
//                   className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={() => updatePopup(false)}
//                   className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//         </div>
//     );
// }
