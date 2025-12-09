import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { FaTrophy } from "react-icons/fa";

import axios from "axios";
import HomeLoader from "../components/Loaders/HomeLoader";
import { useOutletContext, useNavigate } from "react-router-dom";
import SearchBoxTop from '../components/SearchBoxTop';
import api from "../api/axios"


const Competitions = () => {
  const navigate = useNavigate();
  const { search } = useOutletContext();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
     useEffect(() => {
      window.scrollTo(0, 0); // 👈 this forces scroll to top when component loads
    }, []);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/events/allevents`);
        setEvents(response.data);
      } catch (error) {
        alert("Error fetching events");
      } finally {
        setLoading(false);
      }
    };
    getAllEvents();
  }, []);

  // Filter only hackathon events
  const competitionEvents = events.filter(
    (event) => event.eventType?.toLowerCase() === "competition"
  );

  // Further filter based on search
  const filteredCompetitions = competitionEvents.filter((event) =>
    (event?.eventName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full px-4 sm:px-10 md:px-16 lg:px-20 py-6 font-mono transition-all duration-300">
      <SearchBoxTop />

      {/* Hackathon Section */}
      <section className="w-full flex flex-col gap-5">
        <div className="flex items-center gap-2 text-2xl font-semibold px-4 md:p-0">
          <span className='font-bold'>Competitions</span>
          <FaTrophy className="text-4xl text-yellow-400" />
        </div>

        {loading ? (
          <div className='flex items-center'>
            <HomeLoader />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start animate-fadeInSlow">
            {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((event) => (
                <EventCard className="h-20" key={event._id} event={event}  ClubId={event.club}/>
              ))
            ) : (
              <div className="text-center text-gray-600 font-medium">No Competitions available.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Competitions;
