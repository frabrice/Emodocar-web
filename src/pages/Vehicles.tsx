import React, { useState } from 'react';
import { Search, Trash2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Vehicle } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useNotification } from '../context/NotificationContext';

const Vehicles = () => {
  const { addNotification } = useNotification();
  const [search, setSearch] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Mock data for vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: uuidv4(),
      plateNumber: 'ABC123',
      hostName: 'John Smith',
      hostPhone: '+1 (555) 123-4567'
    },
    {
      id: uuidv4(),
      plateNumber: 'XYZ789',
      hostName: 'Jane Doe',
      hostPhone: '+1 (555) 987-6543'
    },
    {
      id: uuidv4(),
      plateNumber: 'DEF456',
      hostName: 'Robert Johnson',
      hostPhone: '+1 (555) 456-7890'
    },
    {
      id: uuidv4(),
      plateNumber: 'GHI789',
      hostName: 'Sarah Williams',
      hostPhone: '+1 (555) 234-5678'
    },
    {
      id: uuidv4(),
      plateNumber: 'JKL012',
      hostName: 'Michael Brown',
      hostPhone: '+1 (555) 345-6789'
    },
    {
      id: uuidv4(),
      plateNumber: 'MNO345',
      hostName: 'Emily Davis',
      hostPhone: '+1 (555) 456-7890'
    },
    {
      id: uuidv4(),
      plateNumber: 'PQR678',
      hostName: 'David Wilson',
      hostPhone: '+1 (555) 567-8901'
    }
  ]);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plateNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setConfirmationMessage(`Are you sure you want to remove vehicle with plate number ${vehicle.plateNumber}?`);
  };

  const confirmDelete = () => {
    if (selectedVehicle) {
      setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
      addNotification('success', `Vehicle ${selectedVehicle.plateNumber} has been successfully removed`);
      setConfirmationMessage(null);
      setSelectedVehicle(null);

      // Adjust current page if necessary after deletion
      const newTotalPages = Math.ceil((filteredVehicles.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(Math.max(1, newTotalPages));
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {confirmationMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{confirmationMessage}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setConfirmationMessage(null)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Vehicles</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#06347C] focus:border-[#06347C] sm:text-sm"
              placeholder="Search by plate number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plate Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Host Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vehicle.plateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.hostName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.hostPhone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDelete(vehicle)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(startIndex + itemsPerPage, filteredVehicles.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredVehicles.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? 'z-10 bg-[#06347C] border-[#06347C] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;