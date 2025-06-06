import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Transaction, WalletState } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";
import {
  useLazyWalletBalanceQuery,
  useMakeDepositMutation,
  useLazyVerifyTransactionQuery,
  useTransferFundsMutation,
} from "@/App/api/company";

interface PaginationInfo {
  items: number;
  total: number;
  page: number;
  totalPages: number;
}

interface WalletContextType {
  walletState: WalletState;
  depositFunds: (amount: number, currency?: string) => Promise<void>;
  transferFunds: (
    userEmail: string,
    amount: number,
    note: string
  ) => Promise<boolean>;
  getTransactionHistory: () => Transaction[];
  verifyPayment: (
    tx_ref: string,
    status: string,
    transaction_id: string
  ) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  refreshWallet: (page?: number, limit?: number) => void;
  isDepositLoading: boolean;
  isVerifyingPayment: boolean;
  isTransferLoading: boolean;
  pagination: PaginationInfo | null;
  loadPage: (page: number, limit?: number) => void;
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
    id: uuidv4(),
    date: new Date(item.createdAt),
    userEmail: "N/A",
    amount: item.amount,
    note: item.remarks || "No remarks",
    adminId: "system",
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

  // RTK Query hooks
  const [walletBalance, { data: walletData, isLoading, error }] =
    useLazyWalletBalanceQuery();
  const [makeDeposit, { isLoading: isDepositLoading }] =
    useMakeDepositMutation();
  const [verifyTransaction, { isLoading: isVerifyingPayment }] =
    useLazyVerifyTransactionQuery();
  const [transferFundsApi, { isLoading: isTransferLoading }] =
    useTransferFundsMutation();

  // Local state
  const [walletState, setWalletState] = useState<WalletState>({
    balance: 0,
    transactions: [],
  });

  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load page function
  const loadPage = useCallback(
    (page: number, limit: number = 5) => {
      if (user?.token) {
        setCurrentPage(page);
        setCurrentLimit(limit);
        walletBalance({ page, limit });
      }
    },
    [walletBalance, user?.token]
  );

  // Memoize refreshWallet to prevent infinite re-renders
  const refreshWallet = useCallback(
    (page: number = currentPage, limit: number = currentLimit) => {
      // Only call API if user and token exist
      if (user?.token) {
        walletBalance({ page, limit });
      }
    },
    [walletBalance, user?.token, currentPage, currentLimit]
  );

  // Load wallet data only when user with token is available
  useEffect(() => {
    if (user?.token) {
      refreshWallet(0, 5); // Start with first page, 10 items
    }
  }, [user?.token]);

  // Update local state when API data changes
  useEffect(() => {
    if (walletData?.wallet && walletData?.pagination) {
      const transformedTransactions = transformApiHistoryToTransactions(
        walletData.wallet.history || []
      );

      setWalletState({
        balance: walletData.wallet.balance || 0,
        transactions: transformedTransactions,
      });

      // Update pagination info
      setPagination(walletData.pagination);
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

  const verifyPayment = useCallback(
    async (
      tx_ref: string,
      status: string,
      transaction_id: string
    ): Promise<boolean> => {
      if (!user?.token) {
        addNotification("error", "User authentication required");
        return false;
      }

      try {
        const verificationResult = await verifyTransaction({
          tx_ref,
          status,
          transaction_id,
        }).unwrap();

        if (verificationResult.success || status === "successful") {
          addNotification(
            "success",
            "Payment verified successfully! Your wallet has been updated."
          );

          // Update local transaction status if we can find it
          setWalletState((prev) => ({
            ...prev,
            transactions: prev.transactions.map((tx) =>
              tx.note.includes(tx_ref) || tx.id === tx_ref
                ? { ...tx, status: "completed" }
                : tx
            ),
          }));

          // Refresh wallet data to get updated balance
          setTimeout(() => refreshWallet(), 1000);
          return true;
        } else {
          addNotification(
            "error",
            "Payment verification failed. Please contact support if you believe this is an error."
          );
          return false;
        }
      } catch (error: any) {
        console.error("Payment verification error:", error);

        let errorMessage = "Failed to verify payment";
        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        addNotification("error", errorMessage);
        return false;
      }
    },
    [verifyTransaction, addNotification, refreshWallet, user?.token]
  );

  const depositFunds = useCallback(
    async (amount: number, currency: string = "RWF") => {
      if (!user?.token) {
        addNotification("error", "User authentication required");
        return;
      }

      if (amount <= 0) {
        addNotification("error", "Amount must be greater than zero");
        return;
      }

      try {
        // Get current domain for redirect URL
        const baseUrl = window.location.origin;
        const redirectUrl = `${baseUrl}/dashboard`;

        const depositData = {
          amount,
          currency,
          redirectUrl,
        };

        const response = await makeDeposit(depositData).unwrap();

        // Check if response contains a payment link
        if (response.link || response.paymentUrl || response.url) {
          const paymentLink =
            response.link || response.paymentUrl || response.url;

          // Open payment link in new tab
          window.open(paymentLink, "_blank", "noopener,noreferrer");

          addNotification(
            "success",
            "Payment link opened. Complete your deposit in the new tab."
          );

          // Add pending transaction to local state if we're on the first page
          if (currentPage === 0) {
            const newTransaction: Transaction = {
              id: uuidv4(),
              date: new Date(),
              userEmail: user?.user?.email?.value || "admin@emodocar.com",
              amount,
              note: `Deposit of ${amount} ${currency}`,
              adminId: user?.user?.id || "1",
              type: "deposit",
              status: "pending",
            };

            setWalletState((prev) => ({
              ...prev, // Keep current balance since deposit is pending
              transactions: [
                newTransaction,
                ...prev.transactions.slice(0, currentLimit - 1),
              ],
            }));
          }

          // Refresh wallet data after a delay to check for updates
          setTimeout(() => {
            refreshWallet();
          }, 2000);
        } else {
          addNotification("error", "Payment link not received from server");
        }
      } catch (error: any) {
        console.error("Deposit error:", error);

        let errorMessage = "Failed to initiate deposit";

        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        addNotification("error", errorMessage);
      }
    },
    [
      makeDeposit,
      addNotification,
      user,
      refreshWallet,
      currentPage,
      currentLimit,
    ]
  );

  const transferFunds = useCallback(
    async (
      userEmail: string,
      amount: number,
      note: string
    ): Promise<boolean> => {
      if (!user?.token) {
        addNotification("error", "User authentication required");
        return false;
      }

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

      try {
        // Call the actual API to transfer funds
        const transferData = {
          userEmail,
          amount,
          note: note || "Transfer to user",
        };

        await transferFundsApi(transferData).unwrap();

        // Create transaction record for local state if we're on the first page
        if (currentPage === 0) {
          const newTransaction: Transaction = {
            id: uuidv4(),
            date: new Date(),
            userEmail,
            amount,
            note: note || "Transfer to user",
            adminId: user?.user?.id || "1",
            type: "transfer",
            status: "completed",
          };

          // Update local state
          setWalletState((prev) => ({
            balance: prev.balance - amount,
            transactions: [
              newTransaction,
              ...prev.transactions.slice(0, currentLimit - 1),
            ],
          }));
        }

        addNotification(
          "success",
          `Successfully transferred ${amount.toFixed(2)} to ${userEmail}`
        );

        // Refresh wallet data to get updated balance from server
        setTimeout(() => refreshWallet(), 1000);

        return true;
      } catch (error: any) {
        console.error("Transfer error:", error);

        let errorMessage = "Failed to transfer funds";
        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        addNotification("error", errorMessage);
        return false;
      }
    },
    [
      walletState.balance,
      addNotification,
      user,
      refreshWallet,
      transferFundsApi,
      currentPage,
      currentLimit,
    ]
  );

  const getTransactionHistory = useCallback(() => {
    return walletState.transactions;
  }, [walletState.transactions]);

  return (
    <WalletContext.Provider
      value={{
        walletState,
        depositFunds,
        transferFunds,
        getTransactionHistory,
        verifyPayment,
        isLoading,
        error: apiError,
        refreshWallet,
        isDepositLoading,
        isVerifyingPayment,
        isTransferLoading,
        pagination,
        loadPage,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletContext;