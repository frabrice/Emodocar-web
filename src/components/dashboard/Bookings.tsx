import { useState, useMemo } from 'react';
import { Calendar, ChevronDown, ChevronUp, X, User, Phone, Mail, Car, Clock, CreditCard, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Booking } from '@/types';
import { v4 as uuidv4 } from 'uuid';

type TimeFilter = 'today' | 'week' | 'month' | 'past';

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [sortField, setSortField] = useState<keyof Booking>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const bookings: Booking[] = [
    {
      id: uuidv4(),
      userId: '1',
      userEmail: 'john@example.com',
      userPhone: '+1 (555) 123-4567',
      userName: 'John Doe',
      hostId: 'h1',
      hostName: 'Sarah Host',
      hostPhone: '+1 (555) 987-6543',
      startDate: new Date('2024-02-20'),
      endDate: new Date('2024-02-25'),
      pricePerDay: 50,
      totalPrice: 250,
      status: 'active',
      vehiclePlateNumber: 'ABC123'
    },
    {
      id: uuidv4(),
      userId: '2',
      userEmail: 'alice@example.com',
      userPhone: '+1 (555) 234-5678',
      userName: 'Alice Smith',
      hostId: 'h2',
      hostName: 'Mike Host',
      hostPhone: '+1 (555) 876-5432',
      startDate: new Date('2024-02-25'),
      endDate: new Date('2024-02-28'),
      pricePerDay: 45,
      totalPrice: 135,
      status: 'active',
      vehiclePlateNumber: 'XYZ789'
    },
    ...Array.from({ length: 8 }, (_, i) => ({
      id: uuidv4(),
      userId: `${i + 3}`,
      userEmail: `user${i + 3}@example.com`,
      userPhone: `+1 (555) ${Math.random().toString().slice(2, 5)}-${Math.random().toString().slice(2, 6)}`,
      userName: `User ${i + 3}`,
      hostId: `h${i + 3}`,
      hostName: `Host ${i + 3}`,
      hostPhone: `+1 (555) ${Math.random().toString().slice(2, 5)}-${Math.random().toString().slice(2, 6)}`,
      startDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      pricePerDay: 40 + Math.floor(Math.random() * 30),
      totalPrice: 200 + Math.floor(Math.random() * 300),
      status: (Math.random() > 0.5 ? 'active' : 'completed') as 'active' | 'completed' | 'cancelled',
      vehiclePlateNumber: `PLT${Math.random().toString(36).slice(2, 5).toUpperCase()}`
    }))
  ];

  const calculateDays = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSort = (field: keyof Booking) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredBookings = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return bookings.filter(booking => {
      const bookingDate = new Date(booking.startDate);
      
      switch (timeFilter) {
        case 'today':
          return bookingDate >= startOfToday && bookingDate < new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
        case 'week':
          return bookingDate >= startOfWeek && bookingDate < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
        case 'month':
          return bookingDate >= startOfMonth && bookingDate < new Date(now.getFullYear(), now.getMonth() + 1, 1);
        case 'past':
          return bookingDate < startOfToday;
        default:
          return true;
      }
    });
  }, [bookings, timeFilter]);

  const sortedAndFilteredBookings = useMemo(() => {
    return [...filteredBookings].sort((a, b) => {
      if (sortField === 'startDate' || sortField === 'endDate') {
        return sortDirection === 'asc'
          ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
          : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
      }

      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();
      
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredBookings, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedAndFilteredBookings.length / itemsPerPage);
  const paginatedBookings = sortedAndFilteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ field }: { field: keyof Booking }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp size={14} className="ml-1" />
    ) : (
      <ChevronDown size={14} className="ml-1" />
    );
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'completed':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'cancelled':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  const TimeFilterButton = ({ filter, label }: { filter: TimeFilter; label: string }) => (
    <button
      onClick={() => {
        setTimeFilter(filter);
        setCurrentPage(1);
      }}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        timeFilter === filter
          ? 'bg-[#06347C] text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06347C]`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Current Bookings</h2>
            <div className="h-10 w-10 rounded-full bg-[#06347C]/10 flex items-center justify-center text-[#06347C]">
              <Calendar size={20} />
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <TimeFilterButton filter="today" label="Today" />
            <TimeFilterButton filter="week" label="This Week" />
            <TimeFilterButton filter="month" label="This Month" />
            <TimeFilterButton filter="past" label="Past Bookings" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('userName')}
                  >
                    <div className="flex items-center">
                      User <SortIcon field="userName" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('startDate')}
                  >
                    <div className="flex items-center">
                      From <SortIcon field="startDate" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('endDate')}
                  >
                    <div className="flex items-center">
                      To <SortIcon field="endDate" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('hostName')}
                  >
                    <div className="flex items-center">
                      Host <SortIcon field="hostName" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status <SortIcon field="status" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedBookings.length > 0 ? (
                  paginatedBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateDays(new Date(booking.startDate), new Date(booking.endDate))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.hostName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No bookings found for this period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages || 1, page + 1))}
                disabled={currentPage === (totalPages || 1)}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{sortedAndFilteredBookings.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, sortedAndFilteredBookings.length)}
                  </span>{' '}
                  of <span className="font-medium">{sortedAndFilteredBookings.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages || 1)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
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
                    onClick={() => setCurrentPage(page => Math.min(totalPages || 1, page + 1))}
                    disabled={currentPage === (totalPages || 1)}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-8 w-full max-w-3xl bg-white shadow-xl rounded-xl">
            <div className="absolute right-4 top-4">
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Booking Details</h3>
              <div className="mt-2">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${getStatusColor(selectedBooking.status)}`}>
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                    <User size={16} className="mr-2" />
                    User Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <User size={14} className="text-gray-400 mr-2" />
                      <span className="text-gray-900">{selectedBooking.userName}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail size={14} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">{selectedBooking.userEmail}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone size={14} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">{selectedBooking.userPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                    <MapPin size={16} className="mr-2" />
                    Host Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <User size={14} className="text-gray-400 mr-2" />
                      <span className="text-gray-900">{selectedBooking.hostName}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone size={14} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">{selectedBooking.hostPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                    <Clock size={16} className="mr-2" />
                    Booking Period
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Start Date</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(selectedBooking.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">End Date</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(selectedBooking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="text-gray-900 font-medium">
                        {calculateDays(new Date(selectedBooking.startDate), new Date(selectedBooking.endDate))} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                    <Car size={16} className="mr-2" />
                    Vehicle Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500">Plate Number:</span>
                      <span className="ml-2 text-gray-900 font-medium">{selectedBooking.vehiclePlateNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                    <CreditCard size={16} className="mr-2" />
                    Payment Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price per day</span>
                      <span className="text-gray-900">${selectedBooking.pricePerDay}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-900">Total Amount</span>
                      <span className="text-[#06347C]">${selectedBooking.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;