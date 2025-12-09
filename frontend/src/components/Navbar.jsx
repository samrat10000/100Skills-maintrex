import React, {useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const Navbar = ({search , setSearch}) => {

 

  const handelChange = (e)=>{
      setSearch(e.target.value);
  }

  const navegate = useNavigate();

  return (
    <div className='h-[10vh] flex items-center justify-between px-6 bg-white w-full'>
     <div className='text-2xl '><a href="/">1OOSkills</a></div> 
     {/* <input onChange={handelChange} type="text" value={search} placeholder='Latest Events' className='border px-4 w-[20%] py-1 rounded-2xl'/> */}

     <button onClick={()=> navegate("/clublogin")} className='border px-2 py-1 rounded-2xl flex items-center gap-1'>HOST <span className='text-2xl'><CiCirclePlus/></span></button>
    </div>
  )
}

export default Navbar
