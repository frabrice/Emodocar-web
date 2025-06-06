export interface Vehicle {
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

export interface ApiResponse {
  vehicles: Vehicle[];
  pagination: {
    page: number;
    items: number;
    totalItems: number;
    totalPages: number;
  };
}