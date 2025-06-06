import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import WalletOverview from "@/components/dashboard/WalletOverview";
import DepositFunds from "@/components/dashboard/DepositFunds";
import TransferFunds from "@/components/dashboard/TransferFunds";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import { useWallet } from "@/context/WalletContext";
import { useLazyVerifyTransactionQuery } from "@/App/api/company";
import { useNotification } from "@/context/NotificationContext";

const Dashboard = () => {
  const { walletState, refreshWallet } = useWallet();
  const { addNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();

  // Use ref to track if verification is already in progress
  const verificationInProgress = useRef(false);
  const hasVerified = useRef(false);
  const notificationShown = useRef(false);

  // RTK Query hook for transaction verification
  const [verifyTransaction, { isLoading: isVerifying }] =
    useLazyVerifyTransactionQuery();

  // Helper function to determine if verification was successful
  const isVerificationSuccessful = (response: any, urlStatus: string) => {
    // Check multiple possible success indicators
    const responseSuccess =
      response?.success === true ||
      response?.status === "success" ||
      response?.status === "successful" ||
      response?.verified === true ||
      response?.message?.toLowerCase().includes("success");

    const urlSuccess = urlStatus === "successful" || urlStatus === "success";

    return responseSuccess || urlSuccess;
  };

  // Helper function to show notification only once
  const showNotificationOnce = (type: string, message: string) => {
    if (!notificationShown.current) {
      addNotification(type as any, message);
      notificationShown.current = true;
    }
  };

  useEffect(() => {
    const handlePaymentReturn = async () => {
      // Check if URL contains payment status parameters
      const status = searchParams.get("status");
      const tx_ref = searchParams.get("tx_ref");
      const transaction_id = searchParams.get("transaction_id");

      // Prevent multiple executions
      if (
        !status ||
        !tx_ref ||
        !transaction_id ||
        verificationInProgress.current ||
        hasVerified.current
      ) {
        return;
      }

      // Set flags to prevent multiple executions
      verificationInProgress.current = true;
      hasVerified.current = true;
      notificationShown.current = false; // Reset notification flag

      // Clean up URL parameters first to prevent re-triggers
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("status");
      newSearchParams.delete("tx_ref");
      newSearchParams.delete("transaction_id");
      setSearchParams(newSearchParams, { replace: true });

      try {
        // Show loading notification
        showNotificationOnce("info", "Verifying payment...");

        // If URL status indicates success, we might not need to call the API
        if (status === "successful") {
          // Still call API for verification but handle it differently
          try {
            const verificationResult = await verifyTransaction({
              tx_ref,
              status,
              transaction_id,
            }).unwrap();

            // Check if verification is successful
            if (isVerificationSuccessful(verificationResult, status)) {
              showNotificationOnce(
                "success",
                "Payment verified successfully! Your wallet has been updated."
              );
              refreshWallet();
            } else {
              // If API says it failed but URL says successful, trust the URL but warn
              showNotificationOnce(
                "success",
                "Payment completed successfully! Your wallet will be updated shortly."
              );
              refreshWallet();
            }
          } catch (apiError) {
            // If API call fails but URL indicates success, assume success
            console.warn(
              "API verification failed but URL indicates success:",
              apiError
            );
            showNotificationOnce(
              "success",
              "Payment completed successfully! Your wallet will be updated shortly."
            );
            refreshWallet();
          }
        } else {
          // For non-successful URL status, call API and handle accordingly
          const verificationResult = await verifyTransaction({
            tx_ref,
            status,
            transaction_id,
          }).unwrap();

          if (isVerificationSuccessful(verificationResult, status)) {
            showNotificationOnce(
              "success",
              "Payment verified successfully! Your wallet has been updated."
            );
            refreshWallet();
          } else {
            showNotificationOnce(
              "error",
              "Payment verification failed. Please contact support if you believe this is an error."
            );
          }
        }
      } catch (error: any) {
        console.error("Payment verification error:", error);

        // Only show error if we haven't already shown a success message
        if (!notificationShown.current) {
          let errorMessage = "Failed to verify payment";
          if (error?.data?.message) {
            errorMessage = error.data.message;
          } else if (error?.message) {
            errorMessage = error.message;
          }

          showNotificationOnce("error", errorMessage);
        }
      } finally {
        // Reset the flags after a delay
        setTimeout(() => {
          verificationInProgress.current = false;
          notificationShown.current = false;
        }, 2000);
      }
    };

    handlePaymentReturn();
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>

      {/* Show verification loading state */}
      {isVerifying && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="animate-spin h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Verifying your payment, please wait...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletOverview balance={walletState.balance} />
        <DepositFunds />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TransferFunds />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;
