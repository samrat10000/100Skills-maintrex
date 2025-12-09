import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdGroups, MdLibraryAdd, MdFileDownloadDone } from "react-icons/md";
import Loader from "../components/Loader";
import api from "../api/axios"

const HeadAdminDashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clubName: "",
    userId: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch All Clubs
  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const res = await api.get("/getAllClubs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClubs(res.data || []);
      } catch (err) {
       
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [token]);

  // ✅ Register New Club
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(
        "/registerNewClub",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Club registered successfully!");
      setFormData({ clubName: "", userId: "", password: "" });
      setClubs((prev) => [...prev, res.data]); // push full club object
    } catch (err) {
      
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 font-mono bg-gray-100 flex flex-col lg:flex-row gap-6">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Club List */}
      <div className="bg-white flex-[2] rounded-2xl p-6 shadow-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <MdGroups className="text-blue-500" /> Registered Clubs
        </h2>

        {clubs.length === 0 ? (
          <p className="text-gray-600">No clubs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clubs.map((club) => (
              <div
                key={club._id}
                className="border rounded-xl p-4 bg-gray-50 hover:shadow transition"
              >
                <h3 className="font-semibold text-xl text-blue-600">
                  {club.clubName}
                </h3>
                <p className="text-sm mt-1 text-gray-700">
                  ID: {club.userId}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Register New Club Form */}
      <form
        onSubmit={handleRegister}
        className="bg-white flex-1 rounded-2xl p-6 shadow-md flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MdLibraryAdd className="text-green-500" /> Register New Club
        </h2>

        <div className="flex flex-col gap-4">
          {/* Club Name */}
          <div>
            <label className="font-semibold">Club Name</label>
            <input
              type="text"
              name="clubName"
              required
              value={formData.clubName}
              onChange={(e) =>
                setFormData({ ...formData, clubName: e.target.value })
              }
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="e.g., Robotics Club"
            />
          </div>

          {/* User ID */}
          <div>
            <label className="font-semibold">User ID</label>
            <input
              type="text"
              name="userId"
              required
              value={formData.userId}
              onChange={(e) =>
                setFormData({ ...formData, userId: e.target.value })
              }
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="e.g., robotics_admin"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Choose a secure password"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 mt-2 border text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 text-lg justify-center"
          >
            Register <MdFileDownloadDone className="text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeadAdminDashboard;
