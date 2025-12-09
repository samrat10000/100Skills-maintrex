import React from 'react';
import { VscCode } from "react-icons/vsc";
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 px-4 border-t font-mono text-gray-800 mb-12 md:mb-0">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 max-w-5xl mx-auto text-center sm:text-left">

        {/* Brand */}
        <div className="flex items-center gap-2 text-lg font-bold tracking-wide">

          <span>100Skills</span>
        </div>

        {/* Creator Info */}
        <div className='flex items-center flex-col'>
          <p className="text-sm font-medium"> Created by Samrat Dutta</p>
          <p className="text-xs text-gray-600">Made to help students find opportunities</p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://freestyledev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Portfolio"
            className="hover:text-blue-600 transition"
          >
            <FaGlobe size={18} />
          </a>
          <a
            href="https://github.com/samrat10000"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="hover:text-blue-600 transition"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/samrat-dutta-6a017524a/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500 mt-4">
        © {new Date().getFullYear()} Samrat Dutta. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
