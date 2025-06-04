import React, { useState } from "react";
import { Send, User, CircleDollarSign, FileText, Loader } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

const TransferFunds = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const { transferFunds, walletState, isTransferLoading } = useWallet();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const transferAmount = parseFloat(amount);

    if (isNaN(transferAmount) || transferAmount <= 0) {
      return;
    }

    const success = await transferFunds(userEmail, transferAmount, note);

    if (success) {
      // Clear form fields on successful transfer
      setUserEmail("");
      setAmount("");
      setNote("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Transfer to User
          </h2>
          <div className="h-10 w-10 rounded-full bg-[#06347C]/10 flex items-center justify-center text-[#06347C]">
            <Send size={20} />
          </div>
        </div>

        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                className="focus:ring-[#06347C] focus:border-[#06347C] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="user@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                disabled={isTransferLoading}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="transferAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (USD)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CircleDollarSign size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="transferAmount"
                id="transferAmount"
                className="focus:ring-[#06347C] focus:border-[#06347C] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isTransferLoading}
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Available: ${walletState.balance.toFixed(2)}
            </p>
          </div>

          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Note (Optional)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="note"
                id="note"
                className="focus:ring-[#06347C] focus:border-[#06347C] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="Reason for transfer"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={isTransferLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isTransferLoading}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#06347C] hover:bg-[#052a63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06347C] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTransferLoading ? (
              <>
                <Loader size={16} className="mr-2 animate-spin" />
                Processing Transfer...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Transfer Funds
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferFunds;
