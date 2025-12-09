import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHomeModern, HiMiniMagnifyingGlass, HiOutlineMapPin, HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

const MobileNavbar = ({ mobileToggle, setMobileToggle }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Search Bar Popup */}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full h-[8vh] bg-white z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-200 rounded-t-2xl backdrop-blur-md">
        <div className="flex items-center justify-around h-full px-6 text-gray-700 text-3xl">
          <button onClick={() => {navigate("/") 
            setMobileToggle(false);
          }} className="hover:text-blue-600 transition-all duration-200">
            <HiOutlineHomeModern />
          </button>
          <button onClick={() => {setMobileToggle(!mobileToggle)}} className="hover:text-blue-600 transition-all duration-200">
            <HiMiniMagnifyingGlass />
          </button>
          <button onClick={()=>{setMobileToggle(false)}} className="hover:text-blue-600 transition-all duration-200">
            <HiOutlineMapPin />
          </button>
          <button onClick={()=>{setMobileToggle(false)}} className="hover:text-blue-600 transition-all duration-200">
            <HiMiniAdjustmentsHorizontal />
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
