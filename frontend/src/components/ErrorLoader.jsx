import React from 'react'
import { MdNearbyError } from "react-icons/md";
import { IoReloadCircle } from "react-icons/io5";
const ErrorLoader = () => {
  return (
    <div className='h-[10vh] w-[50vw] border border-black'>
      <div className='flex gap-3 text-2xl items-center'><MdNearbyError className='text-6xl text-red-500'/> <a href="/"><span>SOME ERROR OCCUred Please Reload </span><IoReloadCircle className='text-blue-400 text-4xl'/></a></div>
    </div>
  )
}

export default ErrorLoader
