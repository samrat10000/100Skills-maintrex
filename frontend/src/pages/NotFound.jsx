import React from 'react';
import { TbError404 } from "react-icons/tb";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center text-center'>
      <TbError404 className='text-9xl  mb-4' />
      <h1 className='text-3xl font-bold mb-2'>Oops! Page Not Found</h1>
      <p className='text-lg text-gray-600 mb-6'>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className='  px-6 py-2 rounded  transition border border-black text-black'>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
