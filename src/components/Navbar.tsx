import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl text-[#06347C] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                Emodo<span className="text-[#052960]">Car</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                location.pathname === '/'
                  ? 'text-[#06347C] border-b-2 border-[#06347C]'
                  : 'text-gray-600 hover:text-[#06347C]'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname === '/about'
                  ? 'text-[#06347C] border-b-2 border-[#06347C]'
                  : 'text-gray-600 hover:text-[#06347C]'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname === '/contact'
                  ? 'text-[#06347C] border-b-2 border-[#06347C]'
                  : 'text-gray-600 hover:text-[#06347C]'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar