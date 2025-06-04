import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Transaction, WalletState } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";
import { useLazyWalletBalanceQuery } from "@/App/api/company";

interface WalletContextType {
  walletState: WalletState;
  depositFunds: (amount: number) => void;
  transferFunds: (userEmail: string, amount: number, note: string) => boolean;
  getTransactionHistory: () => Transaction[];
  isLoading: boolean;
  error: string | null;
  refreshWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

// Helper function to transform API history to Transaction format
const transformApiHistoryToTransactions = (
  apiHistory: any[]
): Transaction[] => {
  return apiHistory.map((item) => ({
    // Generate unique ID since API doesn't provide one
    date: new Date(item.createdAt),
    userEmail: "N/A",
    amount: item.amount,
    note: item.remarks || "No remarks",
    type:
      item.action === "deposit"
        ? "deposit"
        : item.action === "init"
        ? "deposit"
        : "transfer",
    status: item.status || "pending",
  }));
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();

  // RTK Query hook
  const [walletBalance, { data: walletData, isLoading, error }] =
    useLazyWalletBalanceQuery();

  // Local state
  const [walletState, setWalletState] = useState<WalletState>({
    balance: 0,
    transactions: [],
  });

  const [apiError, setApiError] = useState<string | null>(null);

  // Load wallet data on mount
  useEffect(() => {
    refreshWallet();
  }, []);

  // Update local state when API data changes
  useEffect(() => {
    if (walletData?.wallet) {
      const transformedTransactions = transformApiHistoryToTransactions(
        walletData.wallet.history || []
      );

      setWalletState({
        balance: walletData.wallet.balance || 0,
        transactions: transformedTransactions,
      });
      setApiError(null);
    }
  }, [walletData]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      const errorMessage =
        "status" in error
          ? `API Error: ${error.status}`
          : "Network error occurred";
      setApiError(errorMessage);
      addNotification("error", errorMessage);
    }
  }, [error, addNotification]);

  const refreshWallet = () => {
    walletBalance(undefined);
  };

  const depositFunds = (amount: number) => {
    if (amount <= 0) {
      addNotification("error", "Amount must be greater than zero");
      return;
    }

    // TODO: Replace with actual API call for deposit
    // For now, this will add to local state but won't persist
    const newTransaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      userEmail: "admin@emodocar.com",
      amount,
      note: "Admin wallet deposit",
      adminId: user?.user?.id || "1",
      type: "deposit",
    };

    setWalletState((prev) => ({
      balance: prev.balance + amount,
      transactions: [newTransaction, ...prev.transactions],
    }));

    addNotification("success", `Successfully deposited $${amount.toFixed(2)}`);

    // Refresh from API to get updated data
    setTimeout(() => refreshWallet(), 1000);
  };

  const transferFunds = (
    userEmail: string,
    amount: number,
    note: string
  ): boolean => {
    if (amount <= 0) {
      addNotification("error", "Amount must be greater than zero");
      return false;
    }

    if (amount > walletState.balance) {
      addNotification("error", "Insufficient funds in admin wallet");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      addNotification("error", "Invalid email format");
      return false;
    }

    // TODO: Replace with actual API call for transfer
    // For now, this will update local state but won't persist
    const newTransaction: Transaction = {
      id: uuidv4(),
      date: new Date(),
      userEmail,
      amount,
      note: note || "Transfer to user",
      adminId: user?.user?.id || "1",
      type: "transfer",
    };

    setWalletState((prev) => ({
      balance: prev.balance - amount,
      transactions: [newTransaction, ...prev.transactions],
    }));

    addNotification(
      "success",
      `Successfully transferred $${amount.toFixed(2)} to ${userEmail}`
    );

    // Refresh from API to get updated data
    setTimeout(() => refreshWallet(), 1000);
    return true;
  };

  const getTransactionHistory = () => {
    return walletState.transactions;
  };

  return (
    <WalletContext.Provider
      value={{
        walletState,
        depositFunds,
        transferFunds,
        getTransactionHistory,
        isLoading,
        error: apiError,
        refreshWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
