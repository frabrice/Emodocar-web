import { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import {
  useListVehiclesMutation,
  useLazySearchByVehiclesByPlateNumberQuery,
  useDeleteVehicleMutation,
} from "@/App/api/vehicles"

// Updated Vehicle type to match API response
interface Vehicle {
  plate: string;
  brand: string;
  model: string;
  seats: number;
  vehicleType: string;
  transmission: string;
  guaranteeFee: number;
  price: number;
  currency: string;
  status: string;
  images: Array<{
    key: string;
    isMain: boolean;
    url: string;
  }>;
  location: {
    province: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
      provinceId: number;
    };
    lat: number;
    lon: number;
    mainArea: string;
  };
  reviews: {
    count?: number;
    avg?: number;
  };
  client: {
    globalId?: string;
    firstName?: string;
    lastName?: string;
  };
}

interface ApiResponse {
  vehicles: Vehicle[];
  pagination: {
    page: number;
    items: number;
    totalItems: number;
    totalPages: number;
  };
}

const Vehicles = () => {
  const { addNotification } = useNotification();
  const [search, setSearch] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    items: 0,
    totalItems: 0,
    totalPages: 1,
  });

  const itemsPerPage = 5;

  // RTK Query hooks
  const [listVehicles, { isLoading: isLoadingVehicles }] =
    useListVehiclesMutation();
  const [searchByPlate, { isLoading: isSearching }] =
    useLazySearchByVehiclesByPlateNumberQuery();
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();

  // Fetch vehicles on component mount and page change
  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (search.trim()) {
        handleSearch();
      } else {
        fetchVehicles(currentPage);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [search]);

  const fetchVehicles = async (page: number) => {
    try {
      const response = (await listVehicles({
        page,
        limit: itemsPerPage,
      }).unwrap()) as ApiResponse;

      setVehicles(response.vehicles);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      addNotification("error", "Failed to fetch vehicles");
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await searchByPlate(search.trim()).unwrap();
      // Assuming the search endpoint returns a single vehicle or array
      const searchResults = Array.isArray(response) ? response : [response];
      setVehicles(searchResults);
      setPagination({
        page: 1,
        items: searchResults.length,
        totalItems: searchResults.length,
        totalPages: 1,
      });
    } catch (error) {
      console.error("Error searching vehicles:", error);
      addNotification("error", "Failed to search vehicles");
      setVehicles([]);
      setPagination({
        page: 1,
        items: 0,
        totalItems: 0,
        totalPages: 1,
      });
    }
  };

  const handleDelete = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setConfirmationMessage(
      `Are you sure you want to remove vehicle with plate number ${vehicle.plate}?`
    );
  };

  const confirmDelete = async () => {
    if (selectedVehicle) {
      try {
        await deleteVehicle(selectedVehicle.plate).unwrap();
        addNotification(
          "success",
          `Vehicle ${selectedVehicle.plate} has been successfully removed`
        );

        // Refresh the current page after deletion
        fetchVehicles(currentPage);

        setConfirmationMessage(null);
        setSelectedVehicle(null);
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        addNotification("error", "Failed to delete vehicle");
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  const isLoading = isLoadingVehicles || isSearching || isDeleting;

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
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Vehicles
        </h1>
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
              disabled={isLoading}
            />
          </div>

          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06347C]"></div>
            </div>
          )}

          {!isLoading && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Plate Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Vehicle Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Owner
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No vehicles found
                      </td>
                    </tr>
                  ) : (
                    vehicles?.map((vehicle) => (
                      <tr key={vehicle.plate} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {vehicle.plate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div className="font-medium">
                              {vehicle.brand} {vehicle.model}
                            </div>
                            <div className="text-xs text-gray-400">
                              {vehicle.seats} seats • {vehicle.vehicleType} •{" "}
                              {vehicle.transmission}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle?.client?.firstName} {vehicle?.client?.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div>{vehicle?.location?.district?.name}</div>
                            <div className="text-xs text-gray-400">
                              {vehicle?.location?.mainArea}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              vehicle.status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleDelete(vehicle)}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 disabled:opacity-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === pagination.totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(pagination.page - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        pagination.page * itemsPerPage,
                        pagination.totalItems
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{pagination.totalItems}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {[...Array(pagination.totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? "z-10 bg-[#06347C] border-[#06347C] text-white"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === pagination.totalPages
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
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
