import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { TbWorldSearch } from "react-icons/tb";

const SearchBoxTop = () => {
    const {mobileToggle , setMobileToggle} = useOutletContext();
  return (
        <div 
            onClick={()=>{setMobileToggle(true)}}
        className="flex items-center gap-2 bg-white rounded-xl shadow px-4 py-2 mb-6">
           <TbWorldSearch className="text-xl text-gray-500" />
           <span className='text-black/40'>Search...</span>
           {/* <input
             type="text"
             placeholder="Search for events..."
             className="w-full border-none outline-none text-base"
            onClick={()=>{setMobileToggle(true)}}
           /> */}
         </div>
  )
}

export default SearchBoxTop
