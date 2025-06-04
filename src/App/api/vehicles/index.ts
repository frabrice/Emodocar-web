import { apiSlice } from "../apiEntry";

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listVehicles: builder.query({
      query: ({ page, limit }) => ({
        url: `/vehicle/search?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    // Search by plate number
    searchByVehiclesByPlateNumber: builder.query({
      query: (plate) => ({
        url: `/vehicles/${plate}`,
        method: "GET",
      }),
    }),
    // Delete car
    deleteVehicle: builder.mutation({
      query: (plate) => ({
        url: `/vehicle/${plate}`,
        method: "DELETE",
      }),
    }),

    // List of Bookings
    listBookings: builder.mutation({
      query: (data) => ({
        url: `/admin/bookings`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
    useLazyListVehiclesQuery,
    useLazySearchByVehiclesByPlateNumberQuery,
    useDeleteVehicleMutation,
    useListBookingsMutation,
} = api;
