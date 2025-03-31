import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span
                className="text-2xl md:text-3xl text-[#06347C] tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Emodo<span className="text-[#052960]">Car</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation - hidden on small screens */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "text-[#06347C] border-b-2 border-[#06347C]"
                  : "text-gray-600 hover:text-[#06347C]"
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname === "/about"
                  ? "text-[#06347C] border-b-2 border-[#06347C]"
                  : "text-gray-600 hover:text-[#06347C]"
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname === "/contact"
                  ? "text-[#06347C] border-b-2 border-[#06347C]"
                  : "text-gray-600 hover:text-[#06347C]"
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
                  ["/terms", "/privacy"].includes(location.pathname)
                    ? "text-[#06347C] border-b-2 border-[#06347C]"
                    : "text-gray-600 hover:text-[#06347C]"
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
                        location.pathname === "/terms"
                          ? "bg-gray-100 text-[#06347C]"
                          : "text-gray-700"
                      } block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200`}
                      role="menuitem"
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      to="/privacy"
                      className={`${
                        location.pathname === "/privacy"
                          ? "bg-gray-100 text-[#06347C]"
                          : "text-gray-700"
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

          {/* Mobile menu button - visible only on small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-[#06347C] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - shown only when menu is open and on small screens */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "bg-[#06347C] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#06347C]"
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname === "/about"
                  ? "bg-[#06347C] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#06347C]"
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname === "/contact"
                  ? "bg-[#06347C] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#06347C]"
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {/* Mobile policies dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
                className={`${
                  ["/terms", "/privacy"].includes(location.pathname)
                    ? "bg-[#06347C] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#06347C]"
                } w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-base font-medium`}
              >
                Policies
                <ChevronDown
                  className={`h-4 w-4 transform ${
                    isPoliciesOpen ? "rotate-180" : ""
                  } transition-transform duration-200`}
                />
              </button>

              {isPoliciesOpen && (
                <div className="mt-1 block bg-gray-50 rounded-md px-3 py-2">
                  <Link
                    to="/terms"
                    className={`${
                      location.pathname === "/terms"
                        ? "text-[#06347C] font-medium"
                        : "text-gray-600"
                    } block py-2 text-sm hover:text-[#06347C]`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    to="/privacy"
                    className={`${
                      location.pathname === "/privacy"
                        ? "text-[#06347C] font-medium"
                        : "text-gray-600"
                    } block py-2 text-sm hover:text-[#06347C]`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
