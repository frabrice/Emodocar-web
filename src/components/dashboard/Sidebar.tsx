import { NavLink } from 'react-router-dom';
import { Wallet, Car, Calendar } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-white shadow-md w-64 min-h-screen flex-shrink-0">
      <nav className="mt-8">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              isActive ? 'bg-[#06347C]/10 text-[#06347C] font-medium' : ''
            }`
          }
        >
          <Wallet className="w-5 h-5 mr-3" />
          <span>Wallet Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/vehicles"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              isActive ? 'bg-[#06347C]/10 text-[#06347C] font-medium' : ''
            }`
          }
        >
          <Car className="w-5 h-5 mr-3" />
          <span>Manage Vehicles</span>
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              isActive ? 'bg-[#06347C]/10 text-[#06347C] font-medium' : ''
            }`
          }
        >
          <Calendar className="w-5 h-5 mr-3" />
          <span>Bookings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar