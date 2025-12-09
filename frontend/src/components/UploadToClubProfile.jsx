// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadToClubProfile = () => {
//   const [image, setImage] = useState(null);

//   const handleUpload = async () => {
//     if (!image) return alert("Please select an image.");

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "Events_images");

//     try {
//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/dkhgb2u6f/image/upload",
//         formData
//       );
//       console.log("Upload success:", res.data);
//       alert("Image uploaded successfully!");
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed. Check console for details.");
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={e => setImage(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload Image</button>
//     </div>
//   );
// };

// export default UploadToClubProfile;


import React, { useState } from 'react';
import axios from 'axios';
import api from "../api/axios"
import { FaCloudUploadAlt } from 'react-icons/fa';


const UploadToClubProfile = ({ onUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Events_images");

    try {
      // Step 1: Upload to Cloudinary
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhgb2u6f/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;
      console.log("✅ Cloudinary upload success:", imageUrl);

      // Step 2: Send URL to backend to update club profile
      await api.put(
        "/updateClubProfileImage",
        { clubProfileImg: imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Club profile image updated successfully!");
      setImage(null);
      onUploadComplete(); // refresh profile in parent
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed.");
    }
  };

  return (
 

  <div className=" z-50 flex items-center   transition-all w-full">
      <div className="max-w-md w-full ">
       

        <label className="block w-fulltransition border-2 border-dashed rounded-md p-6 text-center cursor-pointer">
          <span className="text-gray-600">Click to select an image</span>
          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          onClick={() => handleUpload(image)}
          disabled={!image}
          className={`mt-5 w-full py-2 px-4 rounded-md text-white font-semibold transition-all shadow-sm ${
            image
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default UploadToClubProfile;
