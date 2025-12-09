import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import api from "../api/axios";
import UploadToClubProfile from "../components/UploadToClubProfile";
import { FaEdit } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
const AdminPannel = () => {
  const [clubData, setClubData] = useState([]);
  const [Profile, setProfile] = useState("");
  const [clubName, setClubName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [ProfileEdit, setProfileEdit] = useState(false);

  // Fetch events
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get(`/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClubData(res.data);
      } catch (err) {
        alert("Error fetching your events.");
      }
    };

    fetchMyEvents();
  }, []);

  // Fetch profile info
  const fetchProfile = async () => {
    try {
      const response = await api.get("/getProfileData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
      setClubName(response.data.club?.clubName || "");
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Delete event
  const deleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/delete/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Deleted");
      setClubData((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      alert("Error deleting event");
    }
  };

  // Save edited club name
  const handleSaveClubName = async () => {
    try {
      const res = await api.put(
        "/editProfileData",
        { clubName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Club name updated!");
      setEditMode(false);
      fetchProfile(); // Refresh the profile
    } catch (err) {
      alert("Failed to update club name.");
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-4 bg-gray-100 font-mono">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 flex  sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden border">
              <img
                src={Profile.club?.clubProfileImg || ""}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              onClick={() => {
                setProfileEdit(true);
              }}
            >
              <FaEdit className="absolute -bottom-2 left-4/5 transform -translate-x-1/2 bg-white p-1 rounded-full shadow text-xl text-black" />
            </span>
          </div>

          {ProfileEdit && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-4">
              <div className="bg-white  rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-200 dark:border-zinc-700 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 flex-col">
                  <div className="flex items-center gap-3 mb-3 ">
                    <VscAccount className="text-4xl text-blue-400" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Update Profile Image
                    </h2>
                    <button className="text-gray-500 hover:text-red-500 text-xl font-bold">
                      <VscChromeClose
                        onClick={() => {
                          setProfileEdit(false);
                        }}
                      />
                    </button>
                  </div>
                  <UploadToClubProfile onUploadComplete={fetchProfile} mb-10 />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full max-w-md mt-4">
                    <div className="font-bold">UPDATE CLUB NAME</div>
                    <input
                      type="text"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      placeholder="Enter club name"
                      className="flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-2 rounded-md text-sm shadow-sm"
                    />
                    <button
                      onClick={handleSaveClubName}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md text-sm shadow transition duration-200"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-xl font-bold text-blue-600 cursor-pointer hover:underline">
            {Profile.club?.clubName || "CLUB NAME"}
            <div className="text-black/40 text-lg">{Profile.club?.userId}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/createvent")}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Create New <CiCirclePlus size={20} />
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Your Current Events
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Event Image</th>
                <th className="px-4 py-3 border">Event Name</th>
                <th className="px-4 py-3 border">Event Date</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubData.length > 0 ? (
                clubData.map((event, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 border w-[30%]">
                      <img
                        src={event.eventImage.url}
                        alt="event"
                        className="h-28 w-full object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border">{event.eventName}</td>
                    <td className="px-4 py-3 border">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border">
                      <button
                        onClick={() =>
                          navigate(`/edit/${event._id}`, { state: { event } })
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {clubData.length > 0 ? (
            clubData.map((event, index) => (
              <div key={index} className="border rounded-lg p-3 shadow-sm">
                <img
                  src={event.eventImage.url}
                  alt="event"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-blue-600">
                  {event.eventName}
                </h3>
                <p className="text-gray-700 mb-2">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/edit/${event._id}`, { state: { event } })
                    }
                    className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;
