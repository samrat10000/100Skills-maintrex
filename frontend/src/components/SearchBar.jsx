import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { TiArrowBack } from "react-icons/ti";
import { FaCode } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import api from "../api/axios"
const SearchBar = ({closeSearch}) => {


  const [searchInput, setSearchInput] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [ClubId, setClubId] = useState("")
  const [clubImages, setClubImages] = useState({});

      const navigate = useNavigate();

     const eventDetails = (id) => {
    navigate(`/event/${id}`);
  };

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.get(`/events/allevents`);
  //       setEvents(response.data);
  //       setClubId(response.data);
        
  //     } catch (error) {
  //       alert("Failed to fetch events");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

//   useEffect(() => {
//   const fetchEvents = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/events/allevents`);
//       const events = response.data;
//       setEvents(events);
//       console.log(events)

//       // Assuming each event has a clubId and you want the first one's club image
//       if (events.length > 0 && events[0].clubId) {
//         setClubId(events[0].clubId);  // This will trigger the second useEffect
//       }

//     } catch (error) {
//       alert("Failed to fetch events");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchEvents();
// }, []);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/allevents`);
      const events = response.data;
      setEvents(events);
      console.log("Fetched Events:", events);

      // Fetch images for all events
      const imagePromises = events.map(async (event) => {
        try {
          const res = await api.get(`/getClubImageById/${event.club}`);
          return { clubId: event.club, imageUrl: res.data.clubProfileImg };
        } catch (err) {
          return { clubId: event.club, imageUrl: null };
        }
      });

      const images = await Promise.all(imagePromises);

      const imageMap = {};
      images.forEach(({ clubId, imageUrl }) => {
        imageMap[clubId] = imageUrl;
      });

      setClubImages(imageMap);

    } catch (error) {
      alert("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
  const intervalId = setInterval(fetchEvents, 90000);
  return () => clearInterval(intervalId);
}, []);



// useEffect(() => {
//   const fetchClubImage = async () => {
//     try {
//       const response = await api.get(`/getClubImageById/${ClubId}`);
//       setImageUrl(response.data.clubProfileImg);
//       console.log(response.data);
//     } catch (err) {
//       setError("Failed to fetch club image");
//     }
//   };

//   if (ClubId) {
//     fetchClubImage();
//   }
// }, [ClubId]);


    //   useEffect(() => {
    // const fetchClubImage = async () => {
    //   try {
    //     const response = await api.get(`/getClubImageById/${ClubId}`);
    //     setImageUrl(response.data.clubProfileImg);
    //     console.log(response.data.clubProfileImg);
        
        
    //   } catch (err) {
    //     setError('Failed to fetch club image');
       
    //   }
    // };

    // if (ClubId) {
    //   fetchClubImage();
    // }
  // }, [ClubId]);

  const filteredEvents = events.filter(event =>
    event?.eventName?.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen px-6 py-4 shadow-md mx-auto font-mono">
      {/* Back Button */}
      <div onClick={()=>{closeSearch()}} className='flex items-center gap-1 mb-4 font-semibold cursor-pointer'>
        <TiArrowBack />
        Back
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-3 border border-blue-600 px-4 py-2 rounded-2xl shadow-sm mb-6 md:w-[40vw] w-full">
        <FiSearch className="text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search for events..."
          className="w-full outline-none text-base rounded-2xl"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : searchInput === '' ? (
        <>
          {/* Categories */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
          <div className="text-gray-700 flex gap-3 flex-wrap">
            <Category icon="💻" label="Hackathons" path ='/hackathon' navigate = {navigate} closeSearch = {closeSearch}/>
            <Category icon="💡" label="Ideathons" path ='/ideathons' navigate = {navigate} closeSearch = {closeSearch} />
            <Category icon="🏆" label="Competitions" path ='/competitions' navigate = {navigate} closeSearch = {closeSearch} />
            <Category icon="🧑‍🏫" label="Workshops" path ='/workshops' navigate = {navigate} closeSearch = {closeSearch} />
            <Category icon="📦" label="Others" />
            <Category icon="📦" label="All" />
          </div>
        </>
      ) : (
        <>
          {/* Search Results */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h2>
          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <div
                onClick={()=>{eventDetails(event._id) 
                  closeSearch()
                }}
                  key={event._id}
                  className="bg-white border w-full rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center gap-4"
                >
                  {/* Placeholder for Image */}
                  <div className="h-20 w-20 bg-yellow-400/15 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-500 text-sm">
                     {clubImages[event.club] ? (
        <img
          src={clubImages[event.club]}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <FaCode className="text-2xl" />
      )}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{event.eventName}</h3>
                    <p className="text-sm text-gray-500">📍 {event.location || 'Unknown Location'}</p>
                  </div>

                  {/* Live Badge */}
                  {event.status?.toLowerCase() === 'live' && (
                    <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow">
                      LIVE
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center">No matching events found.</p>
          )}
        </>
      )}
    </div>
  );
};

// Category Component
const Category = ({ icon, label , path ,navigate , closeSearch }) => (
  <div onClick={()=>{navigate(path) , closeSearch()}} className="flex items-center gap-2 hover:text-blue-600 cursor-pointer border rounded-full px-3 py-2">
    <div className="bg-blue-400 rounded-full px-2 py-2 text-white">{icon}</div>
    <span>{label}</span>
  </div>
);

export default SearchBar;
