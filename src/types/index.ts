export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Transaction {
  id: string;
  date: Date;
  userEmail: string;
  amount: number;
  note: string;
  adminId: string;
  type: 'deposit' | 'transfer';
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
}

export interface NotificationType {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  hostName: string;
  hostPhone: string;
}

export interface Booking {
  id: string;
  userId: string;
  userEmail: string;
  userPhone: string;
  userName: string;
  hostId: string;
  hostName: string;
  hostPhone: string;
  startDate: Date;
  endDate: Date;
  pricePerDay: number;
  totalPrice: number;
  status: 'active' | 'completed' | 'cancelled';
  vehiclePlateNumber: string;
}