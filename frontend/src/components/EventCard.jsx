import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMoneyOff, MdOutlineAttachMoney } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Countdown from "./Countdown";
import { LuAlarmClock } from "react-icons/lu";
import { FaRegCircleDot } from "react-icons/fa6";
import { HiAcademicCap } from "react-icons/hi";
import api from "../api/axios";
const EventCard = ({ event, ClubId }) => {
  const navigate = useNavigate();

  const eventDetails = () => {
    navigate(`/event/${event._id}`);
  };

  const [ImageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchClubImage = async () => {
      try {
        const response = await api.get(`/getClubImageById/${ClubId}`);
        setImageUrl(response.data.clubProfileImg);
        
      } catch (err) {
        setError("Failed to fetch club image");
      }
    };

    if (ClubId) {
      fetchClubImage();
    }
  }, [ClubId]);

  return (
    <div className="w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[28vw] xl:w-[20vw] max-h-[70vh] bg-white rounded-2xl font-mono shadow-2xl overflow-hidden flex flex-col">
      {/* Event Image */}
      <div className="h-[25vh] w-full overflow-hidden px-0.5 py-0.5">
        <img
          src={event.eventImage.url}
          alt="Event"
          className="object-cover h-full w-full rounded-t-2xl"
        />
      </div>

      {/* Labels */}
      <div className="flex text-xs sm:text-sm px-2 py-1 gap-2 items-center">
        <span className="border border-gray-600 rounded-full w-[42px] h-[42px] sm:w-[3vw] sm:h-[3vw] overflow-hidden flex items-center justify-center">
          {ImageUrl ? (
            <img
              src={ImageUrl}
              alt="Organizer"
              className="object-cover w-full h-full"
            />
          ) : (
            <HiAcademicCap className="text-xl" />
          )}
        </span>

        {event.paymentType === "Free" ? (
          <span className="px-2 rounded-2xl border border-gray-600 flex items-center gap-1 h-6">
            Free <MdOutlineMoneyOff className="text-red-400" />
          </span>
        ) : (
          <span className="px-2 rounded-2xl border border-gray-600 flex items-center gap-1 h-6">
            Paid <MdOutlineAttachMoney className="text-green-400" />
          </span>
        )}

        {event.mode === "online" ? (
          <span className="px-2 rounded-2xl border border-gray-600 h-6 text-blue-500 flex items-center">
            Online
          </span>
        ) : (
          <span className="px-2 rounded-2xl border border-gray-600 h-6 flex items-center">
            Offline
          </span>
        )}
        {Date.now() < new Date(event.registrationEndDate).getTime() ? (
          <span className="px-2 py-1 rounded-full text-[10px] border border-red-500 text-red-500 flex items-center gap-1 whitespace-nowrap ml-auto">
            <FaRegCircleDot className="animate-pulse text-[10px]" />
            Live
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500 text-white flex items-center whitespace-nowrap ml-auto">
            Ended
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="px-2 py-1 space-y-3 flex flex-col flex-1">
        {/* Title */}
        <div className="text-black font-bold text-sm sm:text-base md:text-lg truncate">
          {event.eventName}
        </div>

        <div className="flex items-center gap-2">
          <LuAlarmClock className="text-xl" />{" "}
          <Countdown
            startDate={event.registrationStartDate}
            endDate={event.registrationEndDate}
          />
        </div>
        <div className="flex items-center gap-2">
          <CiLocationOn className="text-xl" />{" "}
          <div className="truncate text-xs sm:text-sm">
            {event.location || "Online"}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-2 text-white font-medium text-sm sm:text-base">
          <a
            href={event.registerLink}
            className="w-1/2 bg-[#270165] h-10 rounded-xl flex items-center justify-center"
          >
            Register Now
          </a>
          <button
            onClick={eventDetails}
            className="w-1/2 h-10 rounded-xl flex items-center justify-center text-black border border-[#270165]"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
