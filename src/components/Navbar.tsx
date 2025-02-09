import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md relative">
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
            <div 
              className="relative"
              onMouseEnter={() => setIsPoliciesOpen(true)}
              onMouseLeave={() => setIsPoliciesOpen(false)}
            >
              <button
                className={`${
                  ['/terms', '/privacy'].includes(location.pathname)
                    ? 'text-[#06347C] border-b-2 border-[#06347C]'
                    : 'text-gray-600 hover:text-[#06347C]'
                } px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center`}
              >
                Policies
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isPoliciesOpen && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/terms"
                      className={`${
                        location.pathname === '/terms'
                          ? 'bg-gray-100 text-[#06347C]'
                          : 'text-gray-700'
                      } block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200`}
                      role="menuitem"
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      to="/privacy"
                      className={`${
                        location.pathname === '/privacy'
                          ? 'bg-gray-100 text-[#06347C]'
                          : 'text-gray-700'
                      } block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200`}
                      role="menuitem"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;