import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(/[._-]/)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="https://raw.githubusercontent.com/frabrice/emodocar/refs/heads/main/modocar%20LOGO.jpg"
              alt="EmodoCar Logo"
              className="h-10 w-auto object-contain"
            />
            <h1 className="ml-3 text-xl font-semibold text-gray-900">
              EmodoCar
            </h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#06347C] to-[#0747a6] flex items-center justify-center text-white font-medium shadow-lg ring-2 ring-white">
                  {currentUser && getInitials(currentUser.email)}
                </div>
                <ChevronDown
                  size={18}
                  className={`ml-2 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transform transition-all duration-200 origin-top-right">
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      Signed in as
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {currentUser?.email}
                    </p>
                  </div>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center group transition-colors duration-150">
                    <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-500" />
                    Settings
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center group transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-500" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
